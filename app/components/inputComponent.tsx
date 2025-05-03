"use client";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Autocomplete, AutocompleteSection, AutocompleteItem } from "@heroui/autocomplete";
import { input } from "@heroui/theme";

interface InputProps {
  name?: string;
  width: string;
  id: string;
  disabled?: boolean;
  fixedValue?: string;
  type?: string;
  noBorder?: boolean;
  copyValue?: string;
}
export default function OrderInput({ name, width, id, disabled, fixedValue, type, noBorder, copyValue }: InputProps) {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const fullDate = `${day}/${month}/${year}`;
  const selectBox = id === "type" ? ["Order", "Budget"] : ["018", "049", "012"];
  const [inputValue, setInputValue] = useState(name === "DATE" ? fullDate : type === "select" ? selectBox[0] : fixedValue || "");

  useEffect(() => {
    if (copyValue !== undefined && copyValue !== inputValue) {
      setInputValue(copyValue);
    }
  }, [copyValue, fixedValue]);

  return (
    <>
      {type === "autoComplete" && (
        <Autocomplete selectedKey={inputValue} onSelectionChange={(value) => setInputValue(value as string)} className={`h-[38px] ${width}`} radius="none" style={{ padding: '0' }} classNames={{ base: 'border-r-2 border-gray-600', clearButton: 'hidden', selectorButton: 'hidden', popoverContent: 'p-0', }} >
          {selectBox.map((value) => (
            <AutocompleteItem hideSelectedIcon key={value}>{value}</AutocompleteItem>
          ))}
        </Autocomplete>
      )}
      <input type="hidden" id={id} value={inputValue} />
      {type === "select" && (
        <>
          <p className="absolute -top-2 bg-white px-2 left-3 text-[12px] z-10">{name}</p>
          <Select id={id} defaultSelectedKeys={inputValue} selectedKeys={new Set([inputValue])} onSelectionChange={(keys) => setInputValue(Array.from(keys)[0].toString())} className={`w-full place-self-center ${width}`} classNames={{
            innerWrapper: "border-none",
            trigger: `border-2 border-gray-600 rounded-xl h-[47px] ${width}`,
          }}
            variant="bordered"
            radius="lg"
            size="lg">
            {selectBox.map((value) => (
              <SelectItem key={value}>{value}</SelectItem>
            ))}
          </Select>
          <input type="hidden" id={id} value={inputValue} />
        </>
      )}
      {!type && (
        <div className={`relative ${width}`}>
          {name && (<p className="absolute -top-[6px] rounded-xl h-[12px] left-3 z-10 px-2 bg-white text-black text-[12px]">{name}</p>)}
          <Input
            variant="bordered"
            radius="lg"
            size="lg"
            disabled={disabled}
            id={id}
            color="default"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`w-full place-self-center rounded-xl border-gray-500 flex relative h-[45px] `}
            classNames={{
              inputWrapper: "border-gray-600",
              input: "text-black bg-transparent",
            }}
          ></Input>
        </div>
      )}
      {type === "description" && (
        <Input
          size="md"
          id={id}
          placeholder="-"
          disabled={disabled}
          radius="none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`${width} h-[40px] bg-transparent ${noBorder ? "border-none" : "border-r-2 border-gray-600"}`}
          classNames={{
            inputWrapper:
              "bg-transparent p-[5px] data-[hover=true]:bg-transparent",
          }}
        />
      )}
    </>
  );
}