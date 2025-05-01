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
    corporateName: "Corporation",
    size: "Size",
    qnt: "Quantity",
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
    code: "Code",
    type: "Type",
    description: "Description",
    date: "Date",
    id: "Id",
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="mt-2 self-center text-xl">
              Order Details
            </ModalHeader>
            <ModalBody className="text-black">
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
