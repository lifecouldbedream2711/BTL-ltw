import { twMerge } from "tailwind-merge";

export default function TextInput({
  id,
  value,
  placeholder,
  onChange,
  className = "",
  ...props
}) {
  return (
    <input
      type="text"
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={twMerge(
        "border w-[90%] focus:outline-none focus:border-[#0EA4B5] h-11.5 mb-3 border-gray-300 p-1 shadow-md rounded-md px-[2%]",
        className
      )}
      {...props}
    />
  );
}