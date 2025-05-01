"use client";
import { Input } from "@heroui/input";
import { useState } from "react";

interface InputProps {
  name?: string;
  width: string;
  id: string;
  disabled?: boolean;
  fixedValue?: string;
  type?: string;
  noBorder?: boolean;
}
export default function OrderInput({
  name,
  width,
  id,
  disabled,
  fixedValue,
  type,
  noBorder,
}: InputProps) {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const fullDate = `${day}/${month}/${year}`;

  const initialValue = name === "DATE" ? fullDate : fixedValue || "";
  const [inputValue, setInputValue] = useState(initialValue);

  return (
    <>
      {type === "select" && (
        <div
          className={`border-2 rounded-xl border-gray-600 relative h-[47px] ${width}`}
        >
          <p className="absolute -top-2 bg-white px-2 left-3 text-[12px] z-10">
            {name}
          </p>
          <select id={id} className="w-full h-[38px] border-none rounded-xl">
            <option>Type 1</option>
            <option>Type 2</option>
          </select>
        </div>
      )}
      {!type && (
        <div className={`relative ${width}`}>
          {name && (
            <p className="absolute -top-[6px] rounded-xl h-[12px] left-3 z-10 px-2 bg-white text-black text-[12px]">
              {name}
            </p>
          )}
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
