import { filterMenu, menuItems, normalizeMenuItem } from "./menu";

test("search is case insensitive, trims whitespace and combines with category", () => {
  expect(filterMenu(menuItems, "all", " BASIL ")).toHaveLength(1);
  expect(filterMenu(menuItems, "dessert", "basil")).toHaveLength(0);
  expect(filterMenu(menuItems, "dessert")).toHaveLength(1);
  expect(filterMenu(menuItems, "all", "nothing matches")).toHaveLength(0);
});
test("rejects malformed remote dishes rather than crashing rendering", () => {
  const dish = menuItems[0];
  expect(normalizeMenuItem(dish, "remote").id).toBe("remote");
  for (const data of [
    null,
    {},
    { ...dish, category: null },
    { ...dish, name: 4 },
    { ...dish, price: "32" },
    { ...dish, price: -1 },
    { ...dish, price: Infinity },
  ]) {
    expect(normalizeMenuItem(data, "remote")).toBeNull();
  }
  expect(
    normalizeMenuItem({ ...dish, image: "javascript:alert(1)" }, "remote")
      .image,
  ).toBe("");
});
