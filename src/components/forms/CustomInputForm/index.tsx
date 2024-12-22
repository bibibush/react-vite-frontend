import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

interface CustomInputFormProps<T extends FieldValues> {
  control: Control<T>;
  className?: string;
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions<T>;
  placeholder?: string;
  isPassword?: boolean;
}

function CustomInputForm<T extends FieldValues>({
  control,
  className,
  name,
  label,
  rules,
  placeholder,
  isPassword,
}: CustomInputFormProps<T>) {
  const customInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      customInput.current?.blur();
    }, 10);
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              autoComplete="off"
              type={isPassword ? "password" : "text"}
              className={className}
              placeholder={placeholder}
              ref={(e) => {
                field.ref(e);
                customInput.current = e;
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomInputForm;
