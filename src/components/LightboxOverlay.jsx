import { useEffect } from 'react';

export default function LightboxOverlay({ isOpen, src, cap, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="overlay"
      className="open show-image"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.id === 'overlay' || e.target.closest('.ov-close')) {
          onClose();
        }
      }}
    >
      <button className="ov-close" aria-label="Close" onClick={onClose}>×</button>
      <figure className="ov-media">
        <img className="ov-img" src={src} alt="" />
        <figcaption className="ov-cap">{cap}</figcaption>
      </figure>
    </div>
  );
}
