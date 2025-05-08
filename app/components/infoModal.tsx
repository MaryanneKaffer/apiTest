import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

export default function InfoModal({
  order,
  isOpen,
  onOpenChange,
}: {
  order: any;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const labels: Record<string, string> = {
    date: "Date",
    id: "Id",
    corporateName: "Corporation",
    total: "Total Value",
    contact: "Contact",
    phone: "Phone",
    address: "Address",
    city: "City",
    state: "State",
    cep: "CEP",
    cpfCnpj: "CPF/CNPJ",
    ie: "IE",
    district: "District",
    payment: "Payment",
    email: "Email",
    deliveryAddress: "Delivery Address",
    type: "Type",
    code: "Code",
    qnt: "Quantity",
    size: "Size",
    cost: "Cost",
    code2: "Code",
    qnt2: "Quantity",
    size2: "Size",
    cost2: "Cost",
    code3: "Code",
    qnt3: "Quantity",
    size3: "Size",
    cost3: "Cost",
    code4: "Code",
    qnt4: "Quantity",
    size4: "Size",
    cost4: "Cost",
    description: "Description",
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="h-[580px]">
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="mt-2 self-center text-xl">
              Order Details
            </ModalHeader>
            <ModalBody className="text-black overflow-y-auto scrollbar-hide">
              {Object.entries(order).map(([key, value]) => {
                if (key === "cost" || key === "createdAt") {
                  return null;
                }
                return (
                  <p className="text-md" key={key}>
                    {labels[key] || key}: {String(value)}
                  </p>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button variant="flat" onPress={onClose} className="bg-gray-300">
                Copy
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
