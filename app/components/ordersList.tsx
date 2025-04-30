import { useEffect, useState } from "react";
import { Card, CardBody} from "@heroui/card";
import { IoBagHandleOutline } from "react-icons/io5";
import { Button } from "@heroui/button";
import { LuCopy } from "react-icons/lu";
import { GrFormView } from "react-icons/gr";

export default function OrdersList() {
    const [orders, setOrders] = useState<any[]>([]);
    const [hoverIndex, setHoverIndex] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            const res = await fetch('/api/orders');
            const data = await res.json();
            setOrders(data);
        }

        fetchOrders();
    }, []);
    return (
        <div className="w-[100%] h-[100%] flex flex-col gap-2">
            {orders.map((order, index) => (
                <Card className="mx-2 w-[500px] hover:scale-105" onMouseEnter={() => setHoverIndex(index as any)} onMouseLeave={() => setHoverIndex(null)}>
                    <CardBody>
                        <div className="flex gap-2 place-items-center">
                            <IoBagHandleOutline size={42} />
                            <div className="flex flex-col">
                                <p>{order.corporateName}</p>
                                <p className="text-gray-500 text-sm">{order.size} - {order.qnt} - R${order.total}</p>
                            </div>
                            {hoverIndex === index &&
                                <><Button className="w-[40px] min-w-2 h-[40px] border-gray-500 ml-auto p-0" radius="full"><GrFormView color="white" size={30} /></Button>
                                <Button className="w-[40px] min-w-2 h-[40px] border-gray-500 p-0" radius="full"><LuCopy color="white" size={20} /></Button></>
                            }
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}