import { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { IoBagHandleOutline } from "react-icons/io5";
import { Button } from "@heroui/button";
import { LuCopy } from "react-icons/lu";
import { GrFormView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import InfoModal from "./infoModal";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Input } from "@heroui/input";
import SearchIcon from "./searchIcon";

export default function OrdersList({ onCopy, onDelete }: { onCopy: (order: any) => void; onDelete: (order: any) => void; }) {
    const [orders, setOrders] = useState<any[]>([]);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [confirmation, setConfirmation] = useState(false);
    const [orderId, setOrderId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const openInfoModal = (order: any) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    useEffect(() => {
        async function fetchOrders() {
            const res = await fetch("/api/orders");
            const data = await res.json();
            setOrders(Array.isArray(data) ? data : []);
        }
        fetchOrders();
    }, []);


    return (
        <>
            <Input
                className="w-[500px] mx-3 fixed top-10 z-10"
                isClearable
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-xl",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focus=true]:bg-default-200/50",
                        "dark:group-data-[focus=true]:bg-default/60",
                        "!cursor-text",
                    ],
                }}
                placeholder="Type to search..."
                radius="lg"
                startContent={
                    <SearchIcon />
                }
                onChange={(e) => setSearchTerm(e.target.value)}
                onClear={() => setSearchTerm("")}
            />
            <div className="w-[80%] flex flex-col gap-2 mt-12">
                {(searchTerm ? orders.filter((order: { corporateName?: string, cpfCnpj: string, id: number }) => (order.corporateName + order.cpfCnpj + order.id.toString()).toLowerCase().includes(searchTerm.toLowerCase())) : orders).map((order, index) => (<Card
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
                                        onPress={() => { setConfirmation(true); setSelectedOrder(order); setOrderId(order.id); }}
                                    >
                                        <MdDeleteOutline color="white" size={20} />
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardBody>
                </Card>
                ))}            </div >
            <Modal hideCloseButton isOpen={confirmation} onOpenChange={() => setConfirmation(false)} backdrop="blur" size="lg">
                <ModalContent>
                    {(onClose: any) => (
                        <><ModalHeader className="mt-2 text-center self-center text-xl flex flex-col gap-2">
                            <p>Are you sure you want to delete this order?</p>
                            <p>Order Id: {orderId}</p>
                        </ModalHeader>
                            <ModalBody className="text-black text-center">
                                <p>This action cannot be undone.</p>
                            </ModalBody>
                            <ModalFooter className="flex justify-center gap-2">
                                <Button variant="flat" onPress={onClose} className="bg-gray-300">
                                    Cancel
                                </Button>
                                <Button color="danger" variant="flat" onPress={() => onDelete(selectedOrder)}>
                                    Delete
                                </Button>
                            </ModalFooter></>
                    )}
                </ModalContent>
            </Modal>
            <InfoModal order={selectedOrder} isOpen={modalOpen} onOpenChange={setModalOpen} />
        </>
    );
}
