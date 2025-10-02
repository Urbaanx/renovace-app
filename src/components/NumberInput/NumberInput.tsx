interface NumberInputProps {
  className: string;
  value?: number;
  onChange?: (e: any) => void;
  min?: number;
}

export default function NumberInput({
  className,
  value,
  onChange,
  min,
  ...props
}: NumberInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input
        className={className}
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        {...props}
      />
    </>
  );
}
