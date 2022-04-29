import Image, { ImageProps } from "next/image";

type BackgroundImageProps = ImageProps & {
  /**
   * Classes that adjust horizontal position should go here
   */
  innerClassName?: string;
  isVisible: boolean;
  /**
   * Classes that adjust vertical position should go here
   */
  outerClassName?: string;
};

export const BackgroundImage = ({
  alt = "",
  "aria-hidden": ariaHidden = true,
  height,
  innerClassName = "",
  outerClassName = "",
  isVisible,
  width,
  ...imageProps
}: BackgroundImageProps) => {
  return (
    <div
      className={`absolute w-full overflow-hidden pointer-events-none -z-10 ${
        isVisible ? "transition-in" : "transition-out"
      } ${outerClassName}`}
      style={{ height }}
    >
      <div
        className={`absolute top-0 ${innerClassName}`}
        style={{ height, width }}
      >
        <Image
          alt={alt}
          aria-hidden={ariaHidden}
          height={height}
          width={width}
          {...imageProps}
        />
      </div>
    </div>
  );
};
