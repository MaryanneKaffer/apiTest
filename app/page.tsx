import { Input } from "@heroui/input";
import OrderInput from "./components/inputComponent";

export default function Home() {
  return (
    <section className="w-[100dvw] h-[100dvh] p-10 ">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-[700px] h-[100px] flex gap-1">
          <div className="border-3 rounded-xl border-pink-200 w-[50%]"></div>
          <div className="grid grid-cols-2  gap-2 w-[50%]">
            <OrderInput name="DATA" width="w-[100%]" id="data" />
            <OrderInput name="" width="w-[100%]" id="type" type={"select"} />
            <OrderInput name="CONTATO" width="w-[100%]" id="contat" disabled={true} fixedValue="Eliane Käffer" />
            <div className="w-full h-[45px] border-3 border-pink-200 rounded-xl text-center text-sm flex flex-col justify-center leading-[14px]">
              <span>Confirmar pedido</span>
              <span>47 98822-4259</span>
            </div>
          </div>
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="RAZÃO SOCIAL" width="w-[68%]" id="social" />
          <OrderInput name="FONE" width="w-[32%]" id="phone" />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="ENDEREÇO<" width="w-[60%]" id="address" />
          <OrderInput name="CIDADE" width="w-[30%]" id="city" />
          <OrderInput name="UF" width="w-[10%]" id="state" />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="CEP" width="w-[30%]" id="cep" />
          <OrderInput name="CPF/CNPJ" width="w-[40%]" id="cpf/cnpj" />
          <OrderInput name="INSCRIÇÃO ESTADUAL" width="w-[30%]" id="ie" />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="BAIRRO" width="w-[28%]" id="district" />
          <OrderInput name="COND. PAGAMENTO" width="w-[28%]" id="payment" />
          <OrderInput name="E-MAIL" width="w-[44%]" id="email" />
        </div>
        <div className="w-[700px] h-[50px] flex gap-1">
          <OrderInput name="ENDEREÇO DE ENTREGA" width="w-full" id="deliveryAdress" />
        </div>
      </div>
    </section>
  );
}