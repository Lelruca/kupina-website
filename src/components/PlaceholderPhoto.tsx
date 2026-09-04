import type { ReactElement } from 'react';
import type { PhotoCategory } from '../data/trips';
import './PlaceholderPhoto.css';

interface PlaceholderPhotoProps {
  category: PhotoCategory;
  alt: string;
  className?: string;
  showBadge?: boolean;
}

const ICONS: Record<PhotoCategory, ReactElement> = {
  monastery: (
    <path d="M32 6 24 16h4v6h8v-6h4L32 6Zm-14 16v30h6V32h4v20h8V32h4v20h8V32h6V22l-8 6v-6l-4 3v-5l-4 3v-5l-4 3v-5l-4 3v-5l-4 3v-5l-8 6Z" />
  ),
  nature: (
    <path d="M32 6c8 8 14 16 14 24a14 14 0 0 1-11 13.7V56h-6V43.7A14 14 0 0 1 18 30c0-8 6-16 14-24Z" />
  ),
  road: (
    <path d="M20 8h6l-4 48h-6l4-48Zm18 0h6l4 48h-6l-4-48ZM31 14h2v6h-2v-6Zm0 12h2v6h-2v-6Zm0 12h2v6h-2v-6Z" />
  ),
  group: (
    <path d="M20 30a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm24 0a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-12-2a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM8 50c0-8 6-13 12-13s12 5 12 13v4H8v-4Zm24 4v-4c0-3.6-1-6.8-2.7-9.4C31.6 38.4 35.6 37 40 37c6 0 12 5 12 13v4H32Z" />
  ),
  meal: (
    <path d="M14 8v20a6 6 0 0 0 5 5.9V56h6V33.9A6 6 0 0 0 30 28V8h-4v16h-2V8h-4v16h-2V8h-4Zm26 0c-4.4 0-8 4.7-8 12s3.6 12 8 12v24h6V8h-6Z" />
  ),
  care: (
    <path d="M20 30c-6 0-10 4.8-10 11 0 8 8 13 22 19 14-6 22-11 22-19 0-6.2-4-11-10-11-4 0-7.4 2.4-9 6h-6c-1.6-3.6-5-6-9-6Z" />
  ),
  portrait: (
    <path d="M32 8a12 12 0 1 1 0 24 12 12 0 0 1 0-24Zm0 28c11 0 20 6.7 20 15v5H12v-5c0-8.3 9-15 20-15Z" />
  ),
};

const LABELS: Record<PhotoCategory, string> = {
  monastery: 'Монастырь',
  nature: 'Природа',
  road: 'Дорога',
  group: 'Паломники',
  meal: 'Трапеза',
  care: 'Взаимопомощь',
  portrait: 'Портрет',
};

export default function PlaceholderPhoto({ category, alt, className, showBadge = true }: PlaceholderPhotoProps) {
  return (
    <div className={`ph ph--${category}${className ? ` ${className}` : ''}`} role="img" aria-label={alt}>
      <svg className="ph__icon" viewBox="0 0 64 64" aria-hidden="true">
        {ICONS[category]}
      </svg>
      <span className="ph__label">{LABELS[category]}</span>
      {showBadge && <span className="ph__badge">демо-фото</span>}
    </div>
  );
}
