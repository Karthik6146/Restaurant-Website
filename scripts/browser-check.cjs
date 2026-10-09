const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const http = require("node:http");
const { spawn } = require("node:child_process");

const build = path.resolve("dist");
assert.ok(
  fs.existsSync(path.join(build, "index.html")),
  "Run npm run build first.",
);
const chromePath =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
assert.ok(
  fs.existsSync(chromePath),
  "Set CHROME_PATH to your Chrome or Chromium executable.",
);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "arevei-browser-"));
const output = path.resolve("artifacts");
fs.mkdirSync(output, { recursive: true });
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
};
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(
    new URL(req.url, "http://localhost").pathname,
  );
  let file = path.resolve(build, "." + pathname);
  if (file !== build && !file.startsWith(build + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    if (path.extname(pathname)) {
      res.writeHead(404).end();
      return;
    }
    file = path.join(build, "index.html");
  }
  res.setHeader(
    "Content-Type",
    mime[path.extname(file)] || "application/octet-stream",
  );
  fs.createReadStream(file).pipe(res);
});
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let chrome, socket, sessionId;
let nextId = 0;
const pending = new Map();
const errors = [];
function command(method, params = {}, session = sessionId) {
  const id = ++nextId;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error("CDP timeout: " + method));
    }, 15000);
    pending.set(id, {
      resolve: (result) => {
        clearTimeout(timer);
        resolve(result);
      },
      reject,
    });
    socket.send(
      JSON.stringify({
        id,
        method,
        params,
        ...(session ? { sessionId: session } : {}),
      }),
    );
  });
}
async function evaluate(expression) {
  const result = await command("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function waitFor(expression) {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate(expression)) return;
    await delay(100);
  }
  throw new Error("Browser condition did not become true: " + expression);
}
async function navigate(url) {
  url = new URL(url).href;
  await command("Page.navigate", { url });
  await waitFor(
    `location.href === ${JSON.stringify(url)} && document.readyState === 'complete' && !!document.querySelector('h1')`,
  );
}
async function screenshot(name) {
  await evaluate("document.fonts.ready");
  await evaluate(
    "Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})))",
  );
  const result = await command("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  fs.writeFileSync(path.join(output, name), Buffer.from(result.data, "base64"));
}
(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = "http://127.0.0.1:" + server.address().port;
  chrome = spawn(
    chromePath,
    [
      "--headless=new",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-background-networking",
      "--remote-debugging-port=0",
      "--user-data-dir=" + profile,
      "about:blank",
    ],
    { windowsHide: true, stdio: "ignore" },
  );
  const portFile = path.join(profile, "DevToolsActivePort");
  for (let i = 0; !fs.existsSync(portFile) && i < 100; i++) await delay(100);
  assert.ok(fs.existsSync(portFile), "Chrome did not start.");
  const [port, endpoint] = fs
    .readFileSync(portFile, "utf8")
    .trim()
    .split(/\r?\n/);
  socket = new WebSocket("ws://127.0.0.1:" + port + endpoint);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id) {
      const callback = pending.get(data.id);
      if (callback) {
        pending.delete(data.id);
        data.error
          ? callback.reject(new Error(JSON.stringify(data.error)))
          : callback.resolve(data.result);
      }
    } else if (data.method === "Runtime.exceptionThrown")
      errors.push(data.params.exceptionDetails.text);
    else if (
      data.method === "Runtime.consoleAPICalled" &&
      data.params.type === "error"
    )
      errors.push(JSON.stringify(data.params.args));
    else if (
      data.method === "Network.responseReceived" &&
      data.params.response.status >= 400
    )
      errors.push(
        data.params.response.url + ": " + data.params.response.status,
      );
  };
  const target = await command(
    "Target.createTarget",
    { url: "about:blank" },
    null,
  );
  sessionId = (
    await command(
      "Target.attachToTarget",
      { targetId: target.targetId, flatten: true },
      null,
    )
  ).sessionId;
  await command("Page.enable");
  await command("Runtime.enable");
  await command("Network.enable");

  const routes = [
    "/",
    "/menu",
    "/about",
    "/specials",
    "/reservation",
    "/giftcards",
    "/careers",
    "/group-dining",
    "/missing",
  ];
  for (const width of [320, 768, 1024, 1440]) {
    await command("Emulation.setDeviceMetricsOverride", {
      width,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: width < 850,
    });
    for (const route of routes) {
      await navigate(base + route);
      assert.equal(
        await evaluate("document.querySelectorAll('h1').length"),
        1,
        route + ": one page heading",
      );
      assert.equal(
        await evaluate("document.querySelectorAll('footer').length"),
        1,
        route + ": one footer",
      );
      assert.ok(
        await evaluate(
          "document.documentElement.scrollWidth <= innerWidth + 1",
        ),
        route + ": horizontal overflow at " + width,
      );
      const images = await evaluate(
        "Array.from(document.images).filter(i => i.complete && !i.naturalWidth).map(i => i.src)",
      );
      assert.deepEqual(images, [], route + ": broken images");
      if (route === "/menu") {
        if (width === 1440) await screenshot("menu.png");
        assert.equal(
          await evaluate("document.querySelectorAll('.dish-card').length"),
          6,
        );
        await evaluate("document.querySelectorAll('.filter-chip')[3].click()");
        await waitFor("document.querySelectorAll('.dish-card').length === 1");
        await evaluate(
          `const input = document.querySelector('#menu-search'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, 'basil'); input.dispatchEvent(new Event('input', { bubbles: true }));`,
        );
        await waitFor("document.querySelectorAll('.dish-card').length === 0");
        assert.ok(
          await evaluate(
            "document.body.textContent.includes('No dishes found')",
          ),
        );
      }
      if (route === "/reservation")
        assert.ok(
          await evaluate(
            "document.querySelector('button[type=submit]').disabled",
          ),
        );
      if (route === "/") {
        await evaluate(
          "document.querySelector('[aria-label=\"Previous photo\"]').click()",
        );
        await waitFor(
          "document.querySelectorAll('.slider-dots button')[2].getAttribute('aria-pressed') === 'true'",
        );
        await evaluate(
          "document.querySelector('[aria-label=\"Next photo\"]').click()",
        );
        await waitFor(
          "document.querySelectorAll('.slider-dots button')[0].getAttribute('aria-pressed') === 'true'",
        );
        assert.equal(
          await evaluate(
            "document.querySelectorAll('.slider-slide[aria-hidden=false]').length",
          ),
          1,
        );
        assert.ok(
          await evaluate(
            "document.querySelector('video').paused && !document.querySelector('video').autoplay && document.querySelector('video').preload === 'none'",
          ),
        );
      }
      if (route === "/missing")
        assert.ok(await evaluate("document.title.includes('Page not found')"));
    }
    await navigate(base);
    if (width === 1440) await screenshot("desktop.png");
    if (width === 320) {
      await screenshot("mobile.png");
      await evaluate("document.querySelector('.menu-toggle').click()");
      await waitFor(
        "document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true'",
      );
      await evaluate(
        "document.querySelector('.menu-toggle').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))",
      );
      await waitFor(
        "document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'false'",
      );
      assert.ok(
        await evaluate(
          "document.activeElement === document.querySelector('.menu-toggle')",
        ),
      );
      await evaluate(
        "document.querySelector('.menu-toggle').click(); document.querySelector('.primary-nav a').click()",
      );
      await waitFor("location.pathname === '/menu'");
      assert.ok(
        await evaluate(
          "document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'false'",
        ),
      );
      assert.ok(await evaluate("document.activeElement.id === 'main-content'"));
    }
    await evaluate("document.querySelector('.theme-toggle').click()");
    await waitFor("document.documentElement.classList.contains('dark')");
    await waitFor(
      "getComputedStyle(document.body).backgroundColor === 'rgb(18, 18, 18)'",
    );
    await command("Page.reload");
    await waitFor(
      "document.documentElement.classList.contains('dark') && !!document.querySelector('h1')",
    );
    for (const route of routes) {
      await navigate(base + route);
      if (route === "/menu" && width === 1440)
        await screenshot("menu-dark.png");
      assert.ok(
        await evaluate("document.documentElement.classList.contains('dark')"),
      );
      assert.ok(
        await evaluate(
          "document.documentElement.scrollWidth <= innerWidth + 1",
        ),
        route + ": dark overflow at " + width,
      );
    }
    if (width === 1440) {
      await navigate(base);
      await screenshot("desktop-dark.png");
    }
    await evaluate("document.querySelector('.theme-toggle').click()");
    await waitFor("!document.documentElement.classList.contains('dark')");
  }
  await navigate(base);
  await evaluate(
    "document.querySelector('video').scrollIntoView({ behavior: 'instant', block: 'center' })",
  );
  await waitFor(
    "!document.querySelector('video').paused && document.querySelector('video').currentTime > 0",
  );
  assert.ok(
    await evaluate(
      "document.querySelector('video').muted && document.querySelector('video').loop && document.querySelector('video').controls",
    ),
  );
  await evaluate(
    "document.querySelector('video').pause(); window.scrollTo({ top: 0, behavior: 'instant' })",
  );
  await delay(100);
  await evaluate(
    "document.querySelector('video').scrollIntoView({ behavior: 'instant', block: 'center' })",
  );
  await delay(250);
  assert.ok(
    await evaluate("document.querySelector('video').paused"),
    "Scrolling must not override a visitor's pause.",
  );
  await command("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  assert.equal(
    await evaluate("getComputedStyle(document.documentElement).scrollBehavior"),
    "auto",
  );
  await navigate(base);
  await evaluate(
    "document.querySelector('video').scrollIntoView({ behavior: 'instant', block: 'center' })",
  );
  await delay(250);
  assert.ok(
    await evaluate("document.querySelector('video').paused"),
    "Reduced motion prevents autoplay.",
  );
  assert.equal(
    await evaluate(
      "getComputedStyle(document.querySelector('#main-content')).animationName",
    ),
    "none",
  );
  assert.ok(
    await evaluate(
      "parseFloat(getComputedStyle(document.querySelector('.slider-track')).transitionDuration) < 0.001",
    ),
  );
  await evaluate("document.querySelector('video').play()");
  await waitFor("document.querySelector('video').currentTime > 0");
  await command("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "no-preference" }],
  });
  await waitFor("!matchMedia('(prefers-reduced-motion: reduce)').matches");
  await delay(100);
  await command("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await waitFor("document.querySelector('video').paused");
  await evaluate("document.querySelector('video').pause()");
  assert.ok(
    await evaluate(
      "document.querySelector('video').paused && !document.querySelector('video').error",
    ),
  );
  await navigate(base + "/reservation");
  assert.deepEqual(
    await evaluate(
      "Array.from(document.querySelectorAll('input, select, textarea')).filter(input => !input.labels?.length).map(input => input.id)",
    ),
    [],
    "Every reservation field has a label.",
  );
  assert.deepEqual(errors, [], "Browser errors");
  console.log(
    "PASS: 9 routes at 320, 768, 1024, and 1440px in light/dark; slider wrapping, viewport autoplay, persistent pause, live reduced-motion changes, search/filter, mobile navigation/Escape, route focus, theme persistence, labels, unavailable forms, no broken loaded images or browser errors.",
  );
  console.log(
    "Screenshots: artifacts/desktop.png, artifacts/mobile.png, artifacts/desktop-dark.png",
  );
})()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (socket?.readyState === WebSocket.OPEN) {
      try {
        await command("Browser.close", {}, null);
      } catch {}
      socket.close();
    }
    chrome?.kill();
    server.close();
    // Chrome may still hold its profile files briefly on Windows.
    assert.ok(
      path.dirname(profile) === path.resolve(os.tmpdir()) &&
        path.basename(profile).startsWith("arevei-browser-"),
    );
    try {
      fs.rmSync(profile, { recursive: true, force: true });
    } catch {}
  });
