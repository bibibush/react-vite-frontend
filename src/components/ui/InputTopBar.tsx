import { Input } from "./input";
import SearchIcon from "../Icons/SearchIcon";
import { useForm } from "react-hook-form";
import { useFoxStore } from "@/zustand/store";
import { debounce } from "lodash";

interface HookFormParams {
  search: string;
}

function InputTopBar() {
  const { register } = useForm<HookFormParams>({ mode: "onChange" });

  const { onChangeKeyword } = useFoxStore((state) => state);

  return (
    <div className="relative">
      <Input
        className="lg:w-[244px] h-10 bg-[#F7F6F9] rounded-lg placeholder:text-[#A49F9F] peer"
        placeholder="     Search for stocks and more"
        {...register("search", {
          onChange: debounce((e) => onChangeKeyword(e.target.value), 250),
        })}
      />
      <span className="absolute top-0 bottom-0 invisible my-auto lg:h-4 lg:left-3 peer-placeholder-shown:visible">
        <SearchIcon />
      </span>
    </div>
  );
}

export default InputTopBar;
