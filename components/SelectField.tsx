import type { ReactNode } from "react";

type SelectFieldProps = JSX.IntrinsicElements["select"] & {
  label?: ReactNode;
};

export const SelectField = ({
  children,
  className,
  label,
  value,
  ...props
}: SelectFieldProps) => {
  return (
    <label
      className={`
        text-2xl lg:text-3xl relative whitespace-nowrap
        text-stone-600 dark:text-yellow-100
        flex items-center justify-center overflow-hidden pt-1
        select-none focus-within:ring ${className}
      `}
    >
      <select
        className="appearance-none bg-transparent border-0 bottom-0 text-transparent left-0 m-auto absolute right-0 text-center top-0 w-full"
        value={value}
        {...props}
      >
        {children}
      </select>
      {label ?? value}
    </label>
  );
};
