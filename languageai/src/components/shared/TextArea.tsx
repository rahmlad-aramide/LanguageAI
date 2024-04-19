import { RefObject } from "react";

interface TextAreaProps {
  ref?: any;
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  ref,
  value,
  onChange,
  placeholder = "Select the language pair and type or paste the text for translation...",
}) => {
  return (
    <textarea
      className="w-full h-full rounded-lg bg-transparent outline-none focus:border-none resize-none p-5 m-0.5"
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
