import { Input } from "./input";
import SearchIcon from "../Icons/SearchIcon";

function InputTopBar() {
  return (
    <div className="relative">
      <Input
        className="lg:w-[244px] h-10 bg-[#F7F6F9] rounded-lg placeholder:text-[#A49F9F] peer"
        placeholder="     Search for stocks and more"
      />
      <span className="absolute lg:h-4 top-0 bottom-0 my-auto lg:left-3 invisible peer-placeholder-shown:visible">
        <SearchIcon />
      </span>
    </div>
  );
}

export default InputTopBar;
