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
    description2: "Description",
    description3: "Description",
    description4: "Description",
    observation: "Observation",
    discount: "Discount",
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
                if (key === "createdAt" || value === null) { return null }
                return (
                  <div key={key}>
                    {key.includes("code") && (<p key={"bags"}>Bag {key === "code" ? 1 : key === "code2" ? 2 : key === "code3" ? 3 : key === "code4" && 4}</p>)}
                    <p className="text-md" key={key}>
                      {labels[key] || key}: {key.includes("cost") && "$ "}{String(value)}
                    </p>
                  </div>
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
