import { Input } from "@heroui/input";

interface InputProps {
    name: string;
    width: string;
    id: string;
    disabled?: boolean;
    fixedValue?: string;
    type?: string;
}
export default function OrderInput({ name, width, id, disabled, fixedValue, type }: InputProps) {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const fullDate = `${day}/${month}/${year}`;

    return (
        <>
            {type === "select" ? (
                <div className={`border-3 rounded-xl border-pink-200 relative h-[45px] ${width}`}>
                    <p className="absolute -top-2 bg-white px-2 left-3 text-[12px] z-10">{name}</p>
                    <select id={id} className="w-full h-[40px] border-none rounded-xl">
                        <option>Pedido</option>
                        <option>Orçamento</option>
                    </select>
                </div >
            ) : (
                <div className={`border-3 rounded-xl border-pink-200 relative h-[45px] ${width}`}>
                    <p className="absolute -top-2 bg-white px-2 left-3 text-[12px] z-10">{name}</p>
                    <Input disabled={disabled} id={id} value={name === "DATA" ? fullDate : fixedValue || ""} className="w-full h-[45px] border-none rounded-xl" />
                </div>
            )
            }
        </>
    );
}