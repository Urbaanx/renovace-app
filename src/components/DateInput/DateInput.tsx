interface DateInputProps {
  className?: string;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
}

export default function DateInput({
  className,
  value,
  onChange,
  placeholder,
  ...props
}: DateInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={className}
      value={value}
      type="date"
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
}
