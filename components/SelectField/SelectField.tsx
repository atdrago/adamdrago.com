type SelectFieldProps = JSX.IntrinsicElements["select"] & {
  label?: string;
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
      className={`block text-3xl relative whitespace-nowrap text-black dark:text-slate-400 flex items-center justify-center overflow-hidden ${className}`}
    >
      <select
        className="appearance-none bg-transparent border-0 bottom-0 text-transparent left-0 m-auto absolute right-0 text-center top-0 w-full focus:ring-transparent focus:outline-none"
        value={value}
        {...props}
      >
        {children}
      </select>
      {label ?? value}
    </label>
  );
};
