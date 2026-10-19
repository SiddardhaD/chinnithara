import type { ProductImage } from '../../types/product';
import { cn } from '../../utils/format';

type Props = {
  image: ProductImage;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Image with intrinsic dimensions (prevents layout shift) and lazy loading by default. */
export function ResponsiveImage({ image, sizes, priority = false, className }: Props) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={cn('block', className)}
    />
  );
}
