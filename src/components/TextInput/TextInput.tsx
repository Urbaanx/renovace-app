interface TextInputProps {
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: any) => void;
}

export default function TextInput({
  className,
  value,
  defaultValue,
  onChange,
  ...props
}: TextInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      value={value}
      className={className}
      onChange={onChange}
      defaultValue={defaultValue}
      {...props}
    />
  );
}
