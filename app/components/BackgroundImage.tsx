import classNames from "classnames";
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
  /**
   * Which theme to show this image for
   */
  theme: "dark" | "light";
};

export const BackgroundImage = ({
  alt = "",
  "aria-hidden": ariaHidden = true,
  height,
  innerClassName = "",
  outerClassName = "",
  isVisible,
  theme,
  width,
  ...imageProps
}: BackgroundImageProps) => {
  return (
    <div
      className={classNames(
        `absolute w-full overflow-hidden pointer-events-none -z-10 print:hidden ${
          isVisible ? "transition-in" : "transition-out"
        } ${outerClassName}`,
        {
          "invisible dark:visible": theme === "dark",
          "dark:visible": theme === "light",
        }
      )}
      style={{ height }}
    >
      <div
        className={`absolute top-0 ${innerClassName}`}
        style={{ height, width }}
      >
        <Image
          className="border-0 bg-transparent"
          alt={alt}
          aria-hidden={ariaHidden}
          height={height}
          width={width}
          style={{ height, width }}
          {...imageProps}
        />
      </div>
    </div>
  );
};
