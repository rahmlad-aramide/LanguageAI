import { HTMLInputTypeAttribute, RefObject } from "react";

interface InputProps {
  refProp?: RefObject<HTMLInputElement> | undefined;
  // value: string;
  // onChange: (e: any) => void;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  name?: string;
  id?: string;
}

export const Input: React.FC<InputProps> = ({
  refProp,
  // value,
  // onChange,
  placeholder = "Enter value",
  type = "text",
  name,
  id,
}) => {
  return (
    <input
      className="w-full h-full rounded-lg bg-white shadow border border-primary outline-none ring-1 ring-transparent focus:ring-primary px-4 py-3"
      ref={refProp}
      // value={value}
      // onChange={onChange}
      placeholder={placeholder}
      type={type}
      name={name}
      id={id}
    />
  );
};
