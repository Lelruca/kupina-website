import type { PhotoCategory } from '../data/trips';
import PlaceholderPhoto from './PlaceholderPhoto';
import './Photo.css';

interface PhotoProps {
  src?: string;
  category: PhotoCategory;
  alt: string;
  className?: string;
}

export default function Photo({ src, category, alt, className }: PhotoProps) {
  if (!src) {
    return <PlaceholderPhoto category={category} alt={alt} className={className} />;
  }

  // Данные в trips.ts/content.ts используют пути вида "/photos/…", как от корня сайта.
  // На GitHub Pages сайт живёт в подпапке (base из vite.config.ts), поэтому подставляем
  // её сюда — иначе картинки на проде ищутся не там.
  const resolvedSrc = src.startsWith('/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src;

  return <img src={resolvedSrc} alt={alt} loading="lazy" className={`real-photo${className ? ` ${className}` : ''}`} />;
}
