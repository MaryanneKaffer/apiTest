import { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { IoBagHandleOutline } from "react-icons/io5";
import { Button } from "@heroui/button";
import { LuCopy } from "react-icons/lu";
import { GrFormView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import InfoModal from "./infoModal";

export default function OrdersList({
    onCopy,
}: {
    onCopy: (order: any) => void;
}) {
    const [orders, setOrders] = useState<any[]>([]);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    const openInfoModal = (order: any) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    useEffect(() => {
        async function fetchOrders() {
            const res = await fetch("/api/orders");
            const data = await res.json();
            setOrders(data);
        }
        fetchOrders();
    }, []);

    return (
        <>
            <div className="w-[100%] h-[100%] flex flex-col gap-2">
                {orders.map((order, index) => (
                    <Card
                        key={order.id}
                        className="mx-2 w-[500px] hover:scale-105"
                        onMouseEnter={() => setHoverIndex(index as any)}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        <CardBody>
                            <div className="flex gap-2 place-items-center">
                                <IoBagHandleOutline size={42} />
                                <div className="flex flex-col">
                                    <p>{order.corporateName}</p>
                                    <p className="text-gray-500 text-sm">
                                        {order.size} - {order.qnt} - R${order.total}
                                    </p>
                                </div>
                                {hoverIndex === index && (
                                    <>
                                        <Button
                                            className="w-[40px] min-w-2 h-[40px] ml-auto p-0"
                                            radius="full"
                                            onPress={() => openInfoModal(order)}
                                        >
                                            <GrFormView color="white" size={30} />
                                        </Button>
                                        <Button
                                            className="w-[40px] min-w-2 h-[40px] p-0"
                                            radius="full"
                                            onPress={() => onCopy(order)}
                                        >
                                            <LuCopy color="white" size={20} />
                                        </Button>
                                        <Button
                                            className="w-[40px] min-w-2 h-[40px] bg-red-300 p-0"
                                            variant="flat"
                                            radius="full"
                                        >
                                            <MdDeleteOutline color="white" size={20} />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
            <InfoModal
                order={selectedOrder}
                isOpen={modalOpen}
                onOpenChange={setModalOpen}
            />
        </>
    );
}
