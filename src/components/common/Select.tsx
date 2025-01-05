import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearchParams } from "react-router-dom";

const SelectComp = ({
  options,
  placeholder,
}: {
  options: string[];
  placeholder: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("type") || options[0]);
  return (
    <div className="w-full ">
      <Select
        value={value}
        onValueChange={(value) => {
          setValue(value);
          setSearchParams({ type: value });
        }}
      >
        <SelectTrigger className="bg-white/10 backdrop-blur-lg border-none rounded-xl w-full px-8 py-8 text-xl">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-black/60 backdrop-blur-xl text-gray-200 border-none rounded-xl w-full">
          {options.map((option) => (
            <SelectItem key={option} className="p-4 text-lg" value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComp;
