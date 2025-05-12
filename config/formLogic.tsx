interface orderProps {
    formElements: NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    setFormData: React.Dispatch<React.SetStateAction<any>>
    setCost: React.Dispatch<React.SetStateAction<number[]>>
    setQnt: React.Dispatch<React.SetStateAction<string[]>>
    setDescription: React.Dispatch<React.SetStateAction<string[]>>
    setSize: React.Dispatch<React.SetStateAction<string[]>>
    setActualBag: React.Dispatch<React.SetStateAction<any>>
}

export const Clear = ({ formElements, setFormData, setCost, setQnt, setDescription, setSize, setActualBag }: orderProps) => {
    const clearedData: Record<string, string> = {};

    formElements.forEach((el) => {
        const element = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (element.id !== "date") {
          clearedData[element.id] = "";
          element.value = ""; 
        }
      });
      
    setFormData((prev: any) => ({ ...prev, ...clearedData }));

    setActualBag([]);
    setCost([0, 0, 0, 0]);
    setQnt(["", "", "", ""]);
    setDescription(["", "", "", ""]);
    setSize(["", "", "", ""]);
}

export const updateBagAtIndex = (index: number, value: any, setActualBag: React.Dispatch<React.SetStateAction<any>>) => {
    setActualBag((prev: any) => {
        const newBag = [...prev];
        newBag[index] = value;
        return newBag;
    });
};

export const updateSizeAtIndex = (index: number, value: string, setSize: React.Dispatch<React.SetStateAction<string[]>>) => {
    setSize(prev => {
        const newSize = [...prev];
        newSize[index] = value;
        return newSize;
    });
};

export const updateDescriptionAtIndex = (index: number, value: string, setDescription: React.Dispatch<React.SetStateAction<string[]>>) => {
    setDescription(prev => {
        const newDescription = [...prev];
        newDescription[index] = value;
        return newDescription;
    });
};

export const updateCostAtIndex = (index: number, value: number, setCost: React.Dispatch<React.SetStateAction<number[]>>) => {
    setCost(prev => {
        const newCost = [...prev];
        if (isNaN(value)) {
            newCost[index] = 0;
        } else {
            newCost[index] = value;
        }
        return newCost;
    });
};

export const updateQntAtIndex = (index: number, value: string, setQnt: React.Dispatch<React.SetStateAction<string[]>>) => {
    setQnt(prev => {
        const newQnt = [...prev];
        newQnt[index] = value;
        return newQnt;
    });
};