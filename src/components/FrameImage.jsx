import { useState } from 'react';

export default function FrameImage({ src, alt, caption, onImageClick }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="ph" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!hasError && (
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          onError={() => setHasError(true)}
          onClick={(e) => {
            if (onImageClick) {
              onImageClick(e.target.src, caption);
            }
          }}
          style={onImageClick ? { cursor: 'zoom-in' } : {}}
        />
      )}
      <span>{caption}</span>
    </div>
  );
}
