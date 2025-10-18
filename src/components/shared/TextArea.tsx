import { RefObject } from "react";

interface TextAreaProps {
  refProp?: RefObject<HTMLTextAreaElement> | undefined;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  refProp,
  value,
  onChange,
  placeholder = "Select the language pair and type or paste the text for translation...",
  className,
}) => {
  return (
    <textarea
      className={`w-full h-full rounded-lg bg-transparent outline-none focus:border-none resize-none p-5 m-0.5 ${className}`}
      ref={refProp}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
