import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

interface CustomFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions<T>;
}

function CustomForm<T extends FieldValues>({
  control,
  name,
  label,
  rules,
}: CustomFormProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomForm;
