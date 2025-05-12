export async function Submit(formElements: NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const validKeys = [
        "type", "corporateName", "date", "phone", "address", "city", "state",
        "cep", "cpfCnpj", "ie", "district", "payment", "email", "deliveryAddress",
        "code", "code2", "code3", "code4",
        "qnt", "qnt2", "qnt3", "qnt4",
        "size", "size2", "size3", "size4",
        "description", "description2", "description3", "description4",
        "cost", "cost2", "cost3", "cost4", "discount",
        "observation", "total"
    ];


    const data: Record<string, string> = {};
    const missingFields: string[] = [];

    Array.from(formElements).forEach((el) => {
        const element = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        const id = element.id;

        if (!validKeys.includes(id)) return;
        if (element.disabled) return;

        if (!element.value) {
            missingFields.push(id);
        } else {
            data[id] = element.value;
        }
    });

    if (missingFields.length > 0) {
        alert(`The following fields are required: ${missingFields.join(", ")}`);
        return;
    }

    try {
        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            alert("Order created successfully!");
            window.location.reload();
        } else {
            alert("Failed: " + res.status);
        }
    } catch (error) {
        alert("Failed: " + error);
    }
}

export function Copy(order: any, setFormData: any, setColumns: (value: number) => void, setDiscountActive: any, setObsActive: any, setCost: React.Dispatch<React.SetStateAction<number[]>>, setSize: any, setDescription: any, setQnt: any): void {
    setFormData(order);

    order.discount ? setDiscountActive(true) : setDiscountActive(false);
    order.observation ? setObsActive(true) : setObsActive(false);

    order.code && setColumns(1);
    order.code2 && setColumns(2);
    order.code3 && setColumns(3);
    order.code4 && setColumns(4);

    setCost([
        Number(order.cost),
        Number(order.cost2),
        Number(order.cost3),
        Number(order.cost4)
    ]);

    setQnt([order.qnt || "", order.qnt2 || "", order.qnt3 || "", order.qnt4 || ""]);
    setSize([order.size || "", order.size2 || "", order.size3 || "", order.size4 || ""]);
    setDescription([order.description || "", order.description2 || "", order.description3 || "", order.description4 || ""]);
}

export async function Delete(order: any) {
    try {
        const res = await fetch(`/api/orders`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: order.id }),
        });

        if (res.ok) {
            alert("Order deleted successfully!");
            window.location.reload();
        } else {
            alert("Failed: " + res.status);
        }
    } catch (error) {
        alert("Failed: " + error);
    }
}