import React, { useState } from "react";

export default function LazyImage({ src, alt, className = "" }) {
  const [failedSrc, setFailedSrc] = useState(null);
  if (!src || failedSrc === src)
    return (
      <div
        className={`image-fallback ${className}`}
        role="img"
        aria-label={alt}
      >
        <span>Photography coming soon</span>
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(src)}
    />
  );
}
