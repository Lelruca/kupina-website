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

  return <img src={src} alt={alt} loading="lazy" className={`real-photo${className ? ` ${className}` : ''}`} />;
}
