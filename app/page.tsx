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
import { Select, SelectItem } from "@heroui/select";
import { Copy, Submit, Delete } from "@/config/apiLogic";
import { Clear, updateBagAtIndex, updateCostAtIndex, updateDescriptionAtIndex, updateQntAtIndex, updateSizeAtIndex } from "@/config/formLogic";

interface bags {
  code: string;
  size: string;
  description: string;
  price500: number;
  price1000: number;
}

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
  discount?: string;
  observation?: string;
  total?: string;
  createdAt?: string;
}

export default function Home() {
  const [formData, setFormData] = useState<OrderFormData>({});
  const [cost, setCost] = useState<number[]>([0, 0, 0, 0])
  const [size, setSize] = useState<string[]>(["", "", "", ""])
  const [description, setDescription] = useState<string[]>(["", "", "", ""])
  const [qnt, setQnt] = useState<string[]>(["", "", "", ""])
  const [obsActive, setObsActive] = useState(false);
  const [discountActive, setDiscountActive] = useState(false);
  const [discount, setDiscount] = useState(0);
  const discountSelect = [{ key: "discount", value: "Discount " }, { key: "paid", value: "Paid $" }];
  const [discountType, setDiscountType] = useState(discountSelect[0].key);
  const [ordersLength, setOrdersLength] = useState(0);
  const [actualBag, setActualBag] = useState<bags[]>([]);
  const [columns, setColumns] = useState(1);

  const handleSubmit = () => { Submit(document.querySelectorAll("input, select, textarea")) }
  const handleCopy = (order: OrderFormData) => { Copy(order, setFormData, setColumns, setDiscountActive, setObsActive, setCost, setSize, setDescription, setQnt) };
  const handleDelete = (order: OrderFormData) => { Delete(order) };

  const handleClear = () => { Clear({ formElements: document.querySelectorAll("input, select, textarea"), setFormData, setCost, setQnt, setDescription, setSize, setActualBag }) };

  useEffect(() => {
    qnt.forEach((q, i) => {
      if (q === "500" && actualBag[i]) { updateCostAtIndex(i, actualBag[i].price500, setCost) }
      else if (q === "1000" && actualBag[i]) { updateCostAtIndex(i, actualBag[i].price1000, setCost) }
    });
  }, [qnt, actualBag]);

  useEffect(() => {
    const sum = cost.reduce((sum, val) => sum + val, 0);
    const discountValue = !Number.isNaN(discount) && discount !== null ? discount : 0;
    const total = String(discountType === "paid" ? sum - discountValue : sum - sum * discountValue);
    setFormData((prev) => ({ ...prev, total, qnt: qnt[0], qnt2: qnt[1], qnt3: qnt[2], qnt4: qnt[3], size: size[0], size2: size[1], size3: size[2], size4: size[3], description: description[0], description2: description[1], description3: description[2], description4: description[3], cost: cost[0].toString(), cost2: cost[1].toString(), cost3: cost[2].toString(), cost4: cost[3].toString() }));
  }, [cost, size, description, discount, qnt]);

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
        <OrdersList onCopy={handleCopy} onDelete={handleDelete} setOrdersLength={setOrdersLength} />
      </div>
      <div className="flex flex-col gap-2 absolute left-[31.7dvw] print:relative print:left-2 print:top-2 print:w-full print:h-full print:overflow-hidden">
        <div className="w-[700px] h-[100px] flex gap-1">
          <div className="border-2 rounded-xl border-gray-600 relative w-[50%] justify-items-center"><p className="my-[10%] italic text-2xl">Logo Sample</p></div>
          <div className="grid grid-cols-2 gap-1 w-[50%]">
            <OrderInput name="DATE" width="w-[100%]" id="date" />
            <OrderInput width="w-[100%]" id="type" type={"select"} value={formData.type} />
            {ordersLength > 0 ? <OrderInput width="w-[100%]" fixedValue={`Order N°${ordersLength + 1}`} /> : <div className="w-full h-[45px] border-2 rounded-xl border-gray-600 relative h-[47px] rounded-xl text-center text-sm flex flex-col justify-center leading-[14px]">...</div>}
            <div className="w-full h-[45px] border-2 rounded-xl border-gray-600 relative h-[47px] rounded-xl text-center text-sm flex flex-col justify-center leading-[14px]">
              <p>Contact</p>
              <p>Sample</p>
            </div>
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
          <OrderInput name="DELIVERY ADDRESS" width="w-full" id="deliveryAddress" value={formData.deliveryAddress} />
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
            <OrderInput name="CODE" width="w-[8%]" id="code" type={"autoComplete"} value={formData.code}
              size={(index, value) => updateSizeAtIndex(index, value, setSize)} description={(index, value) => updateDescriptionAtIndex(index, value, setDescription)}
              quantity={(index, value) => updateQntAtIndex(index, value, setQnt)} setActualBag={(index, value) => updateBagAtIndex(index, value, setActualBag)} index={0} />

            <OrderInput name="QNT" width="w-[10%]" id="qnt" type={"description"} value={formData.qnt} quantity={(index, value) => updateQntAtIndex(index, value, setQnt)} />
            <OrderInput name="SIZE" width="w-[12%]" id="size" type={"description"} value={formData.size} />
            <OrderInput name="DESCRIPTION" width="w-[60%]" id="description" type={"description"} value={formData.description} />
            <OrderInput name="COST" width="w-[10%]" id="cost" type={"description"} noBorder={true} value={Number(formData.cost).toFixed(2)} cost={(index, value) => updateCostAtIndex(index, value, setCost)} index={0} />
          </div>
          {columns > 1 && (
            <div className="w-full h-[40px] border-t-2 border-gray-600 flex place-items-center">
              <OrderInput name="CODE2" width="w-[8%]" id="code2" type={"autoComplete"} value={formData.code2}
                size={(index, value) => updateSizeAtIndex(index, value, setSize)} description={(index, value) => updateDescriptionAtIndex(index, value, setDescription)}
                quantity={(index, value) => updateQntAtIndex(index, value, setQnt)} setActualBag={(index, value) => updateBagAtIndex(index, value, setActualBag)} index={1} />

              <OrderInput name="QNT2" width="w-[10%]" id="qnt2" type={"description"} value={formData.qnt2} quantity={(index, value) => updateQntAtIndex(index, value, setQnt)} />
              <OrderInput name="SIZE2" width="w-[12%]" id="size2" type={"description"} value={formData.size2} />
              <OrderInput name="DESCRIPTION2" width="w-[60%]" id="description2" type={"description"} value={formData.description2} />
              <OrderInput name="COST2" width="w-[10%]" id="cost2" type={"description"} noBorder={true} value={Number(formData.cost2).toFixed(2)} cost={(index, value) => updateCostAtIndex(index, value, setCost)} index={1} />
            </div>)}
          {columns > 2 && (
            <div className="w-full h-[40px] border-t-2 border-gray-600 flex place-items-center">
              <OrderInput name="CODE3" width="w-[8%]" id="code3" type={"autoComplete"} value={formData.code3}
                size={(index, value) => updateSizeAtIndex(index, value, setSize)} description={(index, value) => updateDescriptionAtIndex(index, value, setDescription)}
                quantity={(index, value) => updateQntAtIndex(index, value, setQnt)} setActualBag={(index, value) => updateBagAtIndex(index, value, setActualBag)} index={2} />

              <OrderInput name="QNT3" width="w-[10%]" id="qnt3" type={"description"} value={formData.qnt3} quantity={(index, value) => updateQntAtIndex(index, value, setQnt)} />
              <OrderInput name="SIZE3" width="w-[12%]" id="size3" type={"description"} value={formData.size3} />
              <OrderInput name="DESCRIPTION3" width="w-[60%]" id="description3" type={"description"} value={formData.description3} />
              <OrderInput name="COST3" width="w-[10%]" id="cost3" type={"description"} noBorder={true} value={Number(formData.cost3).toFixed(2)} cost={(index, value) => updateCostAtIndex(index, value, setCost)} index={2} />
            </div>)}
          {columns > 3 && (
            <div className="w-full h-[40px] border-t-2 border-gray-600 flex place-items-center">
              <OrderInput name="CODE4" width="w-[8%]" id="code4" type={"autoComplete"} value={formData.code4}
                size={(index, value) => updateSizeAtIndex(index, value, setSize)} description={(index, value) => updateDescriptionAtIndex(index, value, setDescription)}
                quantity={(index, value) => updateQntAtIndex(index, value, setQnt)} setActualBag={(index, value) => updateBagAtIndex(index, value, setActualBag)} index={3} />

              <OrderInput name="QNT4" width="w-[10%]" id="qnt4" type={"description"} value={formData.qnt4} quantity={(index, value) => updateQntAtIndex(index, value, setQnt)} />
              <OrderInput name="SIZE4" width="w-[12%]" id="size4" type={"description"} value={formData.size4} />
              <OrderInput name="DESCRIPTION4" width="w-[60%]" id="description4" type={"description"} value={formData.description4} />
              <OrderInput name="COST4" width="w-[10%]" id="cost4" type={"description"} noBorder={true} value={Number(formData.cost4).toFixed(2)} cost={(index, value) => updateCostAtIndex(index, value, setCost)} index={3} />
            </div>)}
          {obsActive && <div className="w-full h-[40px] border-t-2 border-gray-600 flex place-items-center">
            <OrderInput name="observation" width="w-[100%]" noBorder id="observation" type={"description"} value={formData.observation} />
          </div>}
          <div className="w-full h-[40px] border-t-2 border-gray-600 relative h-[47px] flex place-items-center text-sm">
            <Input size="md" radius="none" className={`${discountActive ? "w-[50%]" : "w-[70%]"} px-2 flex bg-transparent border-r-2 border-gray-600`} />
            {discountActive &&
              <div className="flex">
                <Select className="w-[140px] ml-6 -mr-16" defaultSelectedKeys={discountType} selectedKeys={new Set([discountType])} onSelectionChange={(keys) => { const key = Array.from(keys)[0]; if (typeof key === "string") setDiscountType(key); }} classNames={{ selectorIcon: "absolute left-[-10%] bottom-3", }}>
                  {discountSelect.map((item) => (
                    <SelectItem key={item.key}>{item.value}</SelectItem>
                  ))}
                </Select>
                <OrderInput name={discountType} width="w-[30%]" id="discount" type={"description"} value={formData.discount} discount={setDiscount} />
              </div>
            }
            <div className={`flex m-auto gap-2 relative ${discountActive ? "absolute w-[17.6%] right-[6.6%]" : "w-[20%]"}`}>
              <span className={`${discountActive ? "w-[11%]" : "w-[10%]"} ml-auto mr-6 flex place-self-center place-items-center bg-transparent border-gray-500`}>TOTAL:</span>
              <OrderInput name="TOTAL" width={discountActive ? "min-w-[90px]" : "w-[63%]"} id="total" type={"description"} noBorder={true} value={`$ ${Number(formData.total)?.toFixed(2)}`} />
            </div>
          </div>
        </div>
        <div className="w-[700px] h-[50px] flex gap-1 justify-center print:hidden">
          <Button className="w-[50px] min-w-2 p-0 h-[50px] bg-gray-400" radius="full" onPress={() => manageColumns()} aria-labelledby="Add column" >
            <IoBagAddOutline color="white" className="w-[25px] h-[25px]" />
          </Button>
          <Button className="w-[50px] min-w-2 h-[50px] bg-gray-400" radius="full" onPress={() => setObsActive(!obsActive)} aria-labelledby="Add observation column" >
            <FaPen color="white" className="w-[30px] h-[30px]" />
          </Button>
          <Button className="w-[100px] h-[50px] bg-gray-400 text-white" radius="full" onPress={() => handleSubmit()} aria-labelledby="Submit order" >
            Submit
          </Button>
          <Button className="w-[50px] min-w-2 h-[50px] bg-gray-400" radius="full" onPress={() => setDiscountActive(!discountActive)} aria-labelledby="Add discount area" >
            <MdDiscount color="white" className="w-[30px] h-[30px]" />
          </Button>
          <Button className="w-[50px] min-w-2 h-[50px] bg-red-400 opacity-70 p-0" onPress={() => handleClear()} radius="full" aria-labelledby="Clear order" >
            <CgClose color="white" className="w-[23px] h-[23px]" />
          </Button>
        </div>
      </div>
    </section>
  );
}