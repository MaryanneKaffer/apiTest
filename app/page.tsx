import OrderInput from "./components/inputComponent";
import { Button } from "@heroui/button"
import { CgClose } from "react-icons/cg";
import { IoAdd } from "react-icons/io5";
import { Input } from "@heroui/input";

export default function Home() {
  return (
    <section className="w-[100dvw] h-[100dvh] p-10 ">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-[700px] h-[100px] flex gap-1">
          <div className="border-2 rounded-xl border-gray-600 relative w-[50%]"></div>
          <div className="grid grid-cols-2 gap-1 w-[50%]">
            <OrderInput name="DATE" width="w-[100%]" id="date" disabled={true} />
            <OrderInput width="w-[100%]" id="type" type={"select"} />
            <OrderInput width="w-[100%]" id="contact" disabled={true} fixedValue="" />
            <div className="w-full h-[45px] border-2 rounded-xl border-gray-600 relative h-[47px] rounded-xl text-center text-sm flex flex-col justify-center leading-[14px]">
            </div>
          </div>
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="CORPORATE NAME" width="w-[68%]" id="corporateName" />
          <OrderInput name="PHONE" width="w-[32%]" id="phone" />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="ADDRESS" width="w-[60%]" id="address" />
          <OrderInput name="CITY" width="w-[30%]" id="city" />
          <OrderInput name="UF" width="w-[10%]" id="state" />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="CEP" width="w-[30%]" id="cep" />
          <OrderInput name="CPF/CNPJ" width="w-[40%]" id="cpf/cnpj" />
          <OrderInput name="IE" width="w-[30%]" id="ie" />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="DISTRICT" width="w-[28%]" id="district" />
          <OrderInput name="PAYMENT" width="w-[28%]" id="payment" />
          <OrderInput name="E-MAIL" width="w-[44%]" id="email" />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="DELIVERY ADDRRESS" width="w-full" id="deliveryAdress" />
        </div>
        <div className="w-[700px] h-auto flex flex-col border-2 border-gray-600 rounded-xl">
          <div className="w-full h-[40px] flex text-sm">
            <span className="w-[8%] px-2 h-[40px] border-r-2 border-gray-600 flex justify-center items-center">CODE</span>
            <span className="w-[10%] px-2 h-[40px] border-r-2 border-gray-600 flex justify-center items-center">QNT</span>
            <span className="w-[12%] px-2 h-[40px] border-r-2 border-gray-600 flex justify-center items-center">SIZE</span>
            <span className="w-[60%] px-2 h-[40px] border-r-2 border-gray-600 flex justify-center items-center">DESCRIPTION</span>
            <span className="w-[10%] px-2 h-[40px] border-gray-500 flex justify-center items-center">COST</span>
          </div>
          <div className="w-full h-[40px] border-t-2 border-gray-600 flex place-items-center">
            <OrderInput name="CODE" width="w-[8%]" id="code" type={"description"} />
            <OrderInput name="QNT" width="w-[10%]" id="qnt" type={"description"} />
            <OrderInput name="SIZE" width="w-[12%]" id="size" type={"description"} />
            <OrderInput name="DESCRIPTION" width="w-[60%]" id="description" type={"description"} />
            <OrderInput name="COST" width="w-[10%]" id="cost" type={"description"} noBorder={true} />
          </div>
          <div className="w-full h-[40px] border-t-2 border-gray-600 relative h-[47px] flex place-items-center gap-2 text-sm">
            <Input disabled={true} size="lg" radius="none" className="w-[75%] px-2 flex place-self-center place-items-center bg-transparent border-r-2 border-gray-600" value={"30 days"} classNames={{ inputWrapper: "bg-transparent data-[hover=true]:bg-transparent", }} />
            <span className="w-[8%] pl-2 flex place-self-center place-items-center bg-transparent border-gray-500">TOTAL:</span>
            <OrderInput name="TOTAL" width="w-[10%]" id="total" type={"description"} noBorder={true} />
          </div>
        </div>
        <div className="w-[700px] h-[50px] flex gap-1 justify-center">
          <Button className="w-[50px] min-w-2 h-[50px] border-gray-500" radius="full"><IoAdd color="white" className="w-[30px] h-[30px]" /></Button>
          <Button className="w-[100px] h-[50px] border-gray-500 text-white" radius="full">Submit</Button>
          <Button className="w-[50px] min-w-2 h-[50px] bg-red-300 opacity-70" radius="full"><CgClose color="white" className="w-[30px] h-[30px]" /></Button>
        </div>
      </div>
    </section>
  );
}