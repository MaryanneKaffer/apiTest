"use client";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

interface InputProps {
  name?: string;
  width: string;
  id?: string;
  disabled?: boolean;
  fixedValue?: string;
  type?: string;
  noBorder?: boolean;
  value?: string;
  cost?: (index: number, value: number) => void;
  size?: (index: number, value: string) => void;
  description?: (index: number, value: string) => void;
  index?: number;
  discount?: React.Dispatch<React.SetStateAction<number>>
}

export default function OrderInput({ name, width, id, disabled, fixedValue, type, noBorder, value, cost, size, description, index, discount }: InputProps) {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const fullDate = `${day}/${month}/${year}`;
  const selectBox = ["Order", "Budget"];
  const bags = [{ code: "018", size: "20x40", description: "paper craft" }, { code: "049", size: "30x40", description: "plastic" }, { code: "012", size: "20x30", description: "plastic" }];
  const [inputValue, setInputValue] = useState(name === "DATE" ? fullDate : type === "select" ? selectBox[0] : type === "autoComplete" ? bags[0].code : fixedValue || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
  }, [value, fixedValue]);

  return (
    <>
      {type === "autoComplete" && (
        <div className={`relative ${width}`}>
          <Autocomplete maxLength={3} onKeyDown={(e) => { if (!/[0-9]|Backspace|Tab|ArrowLeft|ArrowRight/.test(e.key)) { e.preventDefault(); } }}
            onSelectionChange={(value) => { setInputValue(value as string); const selectedBag = bags.find(bag => bag.code === value); if (selectedBag && size) size(index || 0, selectedBag.size); if (selectedBag && description) description(index || 0, selectedBag.description); }} className={`h-[38px]`} radius="none" style={{ padding: '0' }} classNames={{ base: 'border-r-2 border-b-2 border-gray-600', clearButton: 'hidden', selectorButton: 'hidden', popoverContent: 'p-0' }}>
            {bags.map((value) => (
              <AutocompleteItem hideSelectedIcon key={value.code}>{value.code}</AutocompleteItem>
            ))}
          </Autocomplete>
          <div className="h-[5px] border-b-2 border-gray-600 absolute top-[35px] w-full left-0"></div>
          <input type="hidden" id={id} value={inputValue} />
        </div>
      )}
      {type === "select" && (
        <>
          <p className="absolute -top-2 bg-white px-2 left-3 text-[12px] z-10">{name}</p>
          <Select id={id} defaultSelectedKeys={inputValue} selectedKeys={new Set([inputValue])} onSelectionChange={(keys) => setInputValue(Array.from(keys)[0].toString())} className={`w-full place-self-center ${width}`} classNames={{
            innerWrapper: "border-none",
            trigger: `border-2 border-gray-600 rounded-xl h-[47px] ${width}`
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
      {(type === "text" || type === "number" || !type) && (
        <div className={`relative ${width}`}>
          {name && (<p className="absolute -top-[6px] rounded-xl h-[12px] left-3 z-10 px-2 bg-white text-black text-[12px]">{name}</p>)}
          <Input
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (type === "text" && /\d/.test(e.key)) {
                e.preventDefault();
              } else if (type === "number" && !/[0-9]|Backspace|Tab|ArrowLeft|ArrowRight/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onBlur={() => {
              if (inputValue === "" && name) {
                setError(`${(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())} is required`);
              }
            }}
            placeholder={error}
            variant="bordered"
            radius="lg"
            size="lg"
            disabled={disabled}
            id={id}
            color="default"
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); setError(""); }}
            className={`w-full place-self-center rounded-xl border-gray-500 flex relative h-[45px]`}
            classNames={{
              inputWrapper: `border-gray-600 ${error && "data-[hover=true]:bg-red-200"}`,
              input: "text-black bg-transparent"
            }}
          />
        </div>
      )}
      {type === "description" && (
        <Input
          size="md"
          id={id}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if ((!id?.includes("description") && id !== "observation") && !/[0-9]|[,.]|Backspace|Tab|ArrowLeft|ArrowRight/.test(e.key)) {
              e.preventDefault();
            }
          }} onBlur={() => {
            if (inputValue === "" && name && name !== "observation" && id !== "discount") {
              setError(`${(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())} is required`);
            }
            if (id?.includes("cost") && cost) {
              cost(index || 0, parseFloat(inputValue));
            }
            if (id === "discount" && discount) {
              discount(parseFloat(inputValue));
            }
          }}
          maxLength={id?.includes("cost") ? 8 : 100}
          placeholder={id === "observation" ? "Obs..." : id === "discount" ? "Money" : error}
          disabled={disabled}
          radius="none"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) {
              setError("");
            }
          }}
          className={`${width} h-[40px] bg-transparent ${noBorder ? "border-none" : "border-r-2 border-gray-600"}`}
          classNames={{
            inputWrapper: `p-[5px] bg-transparent ${error && "data-[hover=true]:bg-red-200"}`,
            input: `${!id?.includes("description") && id !== "observation" && id !== "discount" && 'text-center'} ${id === "observation" && "px-3"}`
          }}
        />
      )}
    </>
  );
}