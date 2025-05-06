"use client";
import OrderInput from "./components/inputComponent";
import { Button } from "@heroui/button";
import { CgClose } from "react-icons/cg";
import { IoAdd } from "react-icons/io5";
import { Input } from "@heroui/input";
import OrdersList from "./components/ordersList";
import { useEffect, useState } from "react";

interface OrderFormData {
  id?: number;
  type?: string;
  contact?: string;
  corporateName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  cep?: string;
  cpfCnpj?: string;
  ie?: string;
  district?: string;
  payment?: string;
  email?: string;
  deliveryAddress?: string;
  code?: string;
  qnt?: string;
  size?: string;
  description?: string;
  cost?: string;
  total?: string;
  createdAt?: string;
}

export default function Home() {
  const [formData, setFormData] = useState<OrderFormData>({});
  const [cost, setCost] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCopy = (order: any) => {
    setFormData({});
    setFormData(order);
  };

  async function handleDelete(order: any) {
    try {
      const res = await fetch(`/api/orders`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: order.id }),
      });

      if (res.ok) {
        alert("Order deleted successfully!");
        window.location.reload();
      } else {
        alert("Failed: " + res.status);
      }
    } catch (error) {
      alert("Failed: " + error);
    }
  }

  async function handleSubmit() {
    const validKeys = [
      "type", "contact", "corporateName", "phone", "address", "city", "state",
      "cep", "cpfCnpj", "ie", "district", "payment", "email", "deliveryAddress",
      "code", "qnt", "size", "description", "cost", "total", "createdAt"
    ];
    const formElements = document.querySelectorAll("input, select, textarea");
    const data: Record<string, string> = {};
    const missingFields: string[] = [];
  
    Array.from(formElements).forEach((el) => {
      const element = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const id = element.id;
  
      if (!validKeys.includes(id)) return;
      if (element.disabled) return;
  
      if (!element.value) {
        missingFields.push(id);
      } else {
        data[id] = element.value;
      }
    });
  
    if (missingFields.length > 0) {
      alert(`The following fields are required: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Order created successfully!");
        window.location.reload();
      } else {
        alert("Failed: " + res.status);
      }
    } catch (error) {
      alert("Failed: " + error);
    }
  }

  const clear = () => {
    const formElements = document.querySelectorAll("input, select, textarea");    formElements.forEach((el) => {
      const element = el as HTMLInputElement;
      if (element.id !== "date") {
        setFormData((prev) => ({ ...prev, [element.id]: "" }));
      }
    })
  }

  useEffect(() => {
    setFormData((prev) => ({ ...prev, total: cost, size: size, description: description }));
  }, [cost, size, description]);

  return (
    <section className="w-[100dvw] h-[100dvh] py-10 flex overflow-hidden">
      <div className="w-[28%] max-h-full h-full flex flex-col overflow-y-auto scrollbar-none print:hidden">
        <OrdersList onCopy={handleCopy} onDelete={handleDelete} />
      </div>
      <div className="flex flex-col gap-2 absolute left-[31.7dvw] print:relative print:left-2 print:top-2 print:w-full print:h-full print:overflow-hidden">
        <div className="w-[700px] h-[100px] flex gap-1">
          <div className="border-2 rounded-xl border-gray-600 relative w-[50%]"></div>
          <div className="grid grid-cols-2 gap-1 w-[50%]">
            <OrderInput name="DATE" width="w-[100%]" id="date" disabled={true} />
            <OrderInput width="w-[100%]" id="type" type={"select"} value={formData.type} />
            <OrderInput width="w-[100%]" disabled={true} fixedValue="" value={formData.contact} />
            <div className="w-full h-[45px] border-2 rounded-xl border-gray-600 relative h-[47px] rounded-xl text-center text-sm flex flex-col justify-center leading-[14px]"></div>
          </div>
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="CORPORATE NAME" width="w-[68%]" id="corporateName" value={formData.corporateName} />
          <OrderInput name="PHONE" width="w-[32%]" id="phone" type="number" value={formData.phone} />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="ADDRESS" width="w-[60%]" id="address" value={formData.address} />
          <OrderInput name="CITY" width="w-[30%]" id="city" type="text" value={formData.city} />
          <OrderInput name="UF" width="w-[10%]" id="state" type="text" value={formData.state} />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="CEP" width="w-[30%]" id="cep" type="number" value={formData.cep} />
          <OrderInput name="CPFCNPJ" width="w-[40%]" id="cpfCnpj" type="number" value={formData.cpfCnpj} />
          <OrderInput name="IE" width="w-[30%]" id="ie" type="number" value={formData.ie} />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="DISTRICT" width="w-[28%]" id="district" type="text" value={formData.district} />
          <OrderInput name="PAYMENT" width="w-[28%]" id="payment" value={formData.payment} />
          <OrderInput name="E-MAIL" width="w-[44%]" id="email" value={formData.email} />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="DELIVERY ADDRRESS" width="w-full" id="deliveryAddress" value={formData.deliveryAddress} />
        </div>
        <div className="w-[700px] h-auto flex flex-col border-2 border-gray-600 rounded-xl">
          <div className="w-full h-[40px] flex text-sm">
            <span className="w-[8%] px-2 h-[40px] border-r-2 border-gray-600 flex justify-center items-center"> CODE </span>
            <span className="w-[10%] px-2 h-[40px] border-r-2 border-gray-600 flex justify-center items-center"> QNT </span>
            <span className="w-[12%] px-2 h-[40px] border-r-2 border-gray-600 flex justify-center items-center"> SIZE </span>
            <span className="w-[60%] px-2 h-[40px] border-r-2 border-gray-600 flex justify-center items-center">  DESCRIPTION </span>
            <span className="w-[10%] px-2 h-[40px] border-gray-500 flex justify-center items-center"> COST </span>
          </div>
          <div className="w-full h-[40px] border-t-2 border-gray-600 flex place-items-center">
            <OrderInput name="CODE" width="w-[8%]" id="code" type={"autoComplete"} value={formData.code} size={setSize} description={setDescription} />
            <OrderInput name="QNT" width="w-[10%]" id="qnt" type={"description"} value={formData.qnt} />
            <OrderInput name="SIZE" width="w-[12%]" id="size" type={"description"} value={formData.size} />
            <OrderInput name="DESCRIPTION" width="w-[60%]" id="description" type={"description"} value={formData.description} />
            <OrderInput name="COST" width="w-[10%]" id="cost" type={"description"} noBorder={true} value={formData.cost} total={setCost} />
          </div>
          <div className="w-full h-[40px] border-t-2 border-gray-600 relative h-[47px] flex place-items-center gap-2 text-sm">
            <Input id="deliveryTime" disabled={true} size="lg" radius="none" className="w-[75%] px-2 flex place-self-center place-items-center bg-transparent border-r-2 border-gray-600" value={"30 days"}
              classNames={{ inputWrapper: "bg-transparent data-[hover=true]:bg-transparent", }} />
            <span className="w-[8%] pl-2 flex place-self-center place-items-center bg-transparent border-gray-500">TOTAL:</span>
            <OrderInput name="TOTAL" width="w-[13%]" disabled={true} id="total" type={"description"} noBorder={true} value={`R$ ${formData.total}`} />
          </div>
        </div>
        <div className="w-[700px] h-[50px] flex gap-1 justify-center print:hidden">
          <Button className="w-[50px] min-w-2 h-[50px] border-gray-500" radius="full" >
            <IoAdd color="white" className="w-[30px] h-[30px]" />
          </Button>
          <Button className="w-[100px] h-[50px] border-gray-500 text-white" radius="full" onPress={() => handleSubmit()} >
            Submit
          </Button>
          <Button className="w-[50px] min-w-2 h-[50px] bg-red-300 opacity-70" onPress={() => clear()} radius="full">
            <CgClose color="white" className="w-[30px] h-[30px]" />
          </Button>
        </div>
      </div>
    </section>
  );
}