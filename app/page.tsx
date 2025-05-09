"use client";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { CgClose } from "react-icons/cg";
import { IoBagAddOutline } from "react-icons/io5";
import { Input } from "@heroui/input";
import { FaPen } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import OrdersList from "./components/ordersList";
import OrderInput from "./components/inputComponent";

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
  code2?: string;
  code3?: string;
  code4?: string;
  qnt?: string;
  qnt2?: string;
  qnt3?: string;
  qnt4?: string;
  size?: string;
  size2?: string;
  size3?: string;
  size4?: string;
  description?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  cost?: string;
  cost2?: string;
  cost3?: string;
  cost4?: string;
  total?: number;
  createdAt?: string;
}

export default function Home() {
  const [formData, setFormData] = useState<OrderFormData>({});
  const [cost, setCost] = useState<number[]>([0, 0, 0, 0])
  const [size, setSize] = useState<string[]>(["", "", "", ""])
  const [description, setDescription] = useState<string[]>(["", "", "", ""])
  const [columns, setColumns] = useState(1);

  const updateSizeAtIndex = (index: number, value: string) => {
    setSize(prev => {
      const newSize = [...prev];
      newSize[index] = value;
      return newSize;
    });
  };

  const updateDescriptionAtIndex = (index: number, value: string) => {
    setDescription(prev => {
      const newDescription = [...prev];
      newDescription[index] = value;
      return newDescription;
    });
  };

  const updateCostAtIndex = (index: number, value: number) => {
    setCost(prev => {
      const newCost = [...prev];
      if (isNaN(value)) {
        newCost[index] = 0;
      } else {
        newCost[index] = value;
      }
      return newCost;
    });
  };

  const handleCopy = (order: any) => {
    setFormData(order);

    setCost([
      parseFloat(order.cost) || 0,
      parseFloat(order.cost2) || 0,
      parseFloat(order.cost3) || 0,
      parseFloat(order.cost4) || 0
    ]);
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
      "type", "corporateName", "phone", "address", "city", "state",
      "cep", "cpfCnpj", "ie", "district", "payment", "email", "deliveryAddress",
      "code", "code2", "code3", "code4",
      "qnt", "qnt2", "qnt3", "qnt4",
      "size", "size2", "size3", "size4",
      "description", "description2", "description3", "description4",
      "cost", "cost2", "cost3", "cost4",
      "total"
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
    const formElements = document.querySelectorAll("input, select, textarea"); formElements.forEach((el) => {
      const element = el as HTMLInputElement;
      if (element.id !== "date") {
        setFormData((prev) => ({ ...prev, [element.id]: "" }));
      }
    })
  }

  useEffect(() => {
    setFormData((prev) => ({ ...prev, total: cost.reduce((sum, val) => sum + val, 0), size: size[0], size2: size[1], size3: size[2], size4: size[3], description: description[0], description2: description[1], description3: description[2], description4: description[3] }));
  }, [cost, size, description]);

  const manageColumns = () => {
    if (columns < 4) {
      setColumns(columns + 1)
    } else {
      setColumns(1)
    }
  };

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
            <OrderInput name="CODE" width="w-[8%]" id="code" type={"autoComplete"} value={formData.code} size={updateSizeAtIndex} description={updateDescriptionAtIndex} index={0} />
            <OrderInput name="QNT" width="w-[10%]" id="qnt" type={"description"} value={formData.qnt} />
            <OrderInput name="SIZE" width="w-[12%]" id="size" type={"description"} value={formData.size} />
            <OrderInput name="DESCRIPTION" width="w-[60%]" id="description" type={"description"} value={formData.description} />
            <OrderInput name="COST" width="w-[10%]" id="cost" type={"description"} noBorder={true} value={formData.cost} cost={updateCostAtIndex} index={0} />
          </div>
          {columns > 1 && (
            <div className="w-full h-[40px] border-t-2 border-gray-600 flex place-items-center">
              <OrderInput name="CODE2" width="w-[8%]" id="code2" type={"autoComplete"} value={formData.code2} size={updateSizeAtIndex} description={updateDescriptionAtIndex} index={1} />
              <OrderInput name="QNT2" width="w-[10%]" id="qnt2" type={"description"} value={formData.qnt2} />
              <OrderInput name="SIZE2" width="w-[12%]" id="size2" type={"description"} value={formData.size2} />
              <OrderInput name="DESCRIPTION2" width="w-[60%]" id="description2" type={"description"} value={formData.description2} />
              <OrderInput name="COST2" width="w-[10%]" id="cost2" type={"description"} noBorder={true} value={formData.cost2} cost={updateCostAtIndex} index={1} />
            </div>)}
          {columns > 2 && (
            <div className="w-full h-[40px] border-t-2 border-gray-600 flex place-items-center">
              <OrderInput name="CODE3" width="w-[8%]" id="code3" type={"autoComplete"} value={formData.code3} size={updateSizeAtIndex} description={updateDescriptionAtIndex} index={2} />
              <OrderInput name="QNT3" width="w-[10%]" id="qnt3" type={"description"} value={formData.qnt3} />
              <OrderInput name="SIZE3" width="w-[12%]" id="size3" type={"description"} value={formData.size3} />
              <OrderInput name="DESCRIPTION3" width="w-[60%]" id="description3" type={"description"} value={formData.description3} />
              <OrderInput name="COST3" width="w-[10%]" id="cost3" type={"description"} noBorder={true} value={formData.cost3} cost={updateCostAtIndex} index={2} />
            </div>)}
          {columns > 3 && (
            <div className="w-full h-[40px] border-t-2 border-gray-600 flex place-items-center">
              <OrderInput name="CODE4" width="w-[8%]" id="code4" type={"autoComplete"} value={formData.code4} size={updateSizeAtIndex} description={updateDescriptionAtIndex} index={3} />
              <OrderInput name="QNT4" width="w-[10%]" id="qnt4" type={"description"} value={formData.qnt4} />
              <OrderInput name="SIZE4" width="w-[12%]" id="size4" type={"description"} value={formData.size4} />
              <OrderInput name="DESCRIPTION4" width="w-[60%]" id="description4" type={"description"} value={formData.description4} />
              <OrderInput name="COST4" width="w-[10%]" id="cost4" type={"description"} noBorder={true} value={formData.cost4} cost={updateCostAtIndex} index={3} />
            </div>)}
          <div className="w-full h-[40px] border-t-2 border-gray-600 relative h-[47px] flex place-items-center gap-2 text-sm">
            <Input id="deliveryTime" disabled={true} size="lg" radius="none" className="w-[75%] px-2 flex place-self-center place-items-center bg-transparent border-r-2 border-gray-600" value={"30 days"}
              classNames={{ inputWrapper: "bg-transparent data-[hover=true]:bg-transparent", }} />
            <span className="w-[8%] pl-2 flex place-self-center place-items-center bg-transparent border-gray-500">TOTAL:</span>
            <OrderInput name="TOTAL" width="w-[13%]" disabled={true} id="total" type={"description"} noBorder={true} value={`R$ ${formData.total}`} />
          </div>
        </div>
        <div className="w-[700px] h-[50px] flex gap-1 justify-center print:hidden">
          <Button className="w-[50px] min-w-2 p-0 h-[50px] bg-gray-400" radius="full" onPress={() => manageColumns()}>
            <IoBagAddOutline color="white" className="w-[25px] h-[25px]" />
          </Button>
          <Button className="w-[50px] min-w-2 h-[50px] bg-gray-400" radius="full">
            <FaPen color="white" className="w-[30px] h-[30px]" />
          </Button>
          <Button className="w-[100px] h-[50px] bg-gray-400 text-white" radius="full" onPress={() => handleSubmit()} >
            Submit
          </Button>
          <Button className="w-[50px] min-w-2 h-[50px] bg-gray-400" radius="full">
            <MdDiscount color="white" className="w-[30px] h-[30px]" />
          </Button>
          <Button className="w-[50px] min-w-2 h-[50px] bg-red-400 opacity-70 p-0" onPress={() => clear()} radius="full">
            <CgClose color="white" className="w-[23px] h-[23px]" />
          </Button>
        </div>
      </div>
    </section>
  );
}