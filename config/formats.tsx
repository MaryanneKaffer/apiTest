export function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "");
    const match = digits.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

    if (!match) return value;

    const [, ddd, firstPart, secondPart] = match;

    let result = "";
    if (ddd) result += ddd;
    if (firstPart) result += " " + firstPart;
    if (secondPart) result += "-" + secondPart;

    return result.trim();
}

export function formatCPF(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);

    if (!match) return value;

    const [, part1, part2, part3, part4] = match;
    let result = part1;
    if (part2) result += '.' + part2;
    if (part3) result += '.' + part3;
    if (part4) result += '-' + part4;

    return result;
}

export function formatCNPJ(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 14);
    const match = digits.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/);

    if (!match) return value;

    const [, part1, part2, part3, part4, part5] = match;
    let result = part1;
    if (part2) result += '.' + part2;
    if (part3) result += '.' + part3;
    if (part4) result += '/' + part4;
    if (part5) result += '-' + part5;

    return result;
}

export function formatCEP(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    const match = digits.match(/^(\d{0,5})(\d{0,3})$/);

    if (!match) return value;

    const [, part1, part2] = match;
    let result = part1;
    if (part2) result += '-' + part2;

    return result;
}

export function formatIE(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 14);
    return digits
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3.$4")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3.$4-$5");
}

export const formatter = (id: any, val: string, setInputValue: React.Dispatch<React.SetStateAction<string>>) => {
    if (id === "phone") { setInputValue(formatPhone(val)); }
    else if (id === "cpfCnpj") { setInputValue(val.length <= 11 ? formatCPF(val) : formatCNPJ(val)) }
    else if (id === "cep") { setInputValue(formatCEP(val)); }
    else if (id === "ie") { setInputValue(formatIE(val)); }
    else if (id === "state") { setInputValue(val.toUpperCase()); }
    else { setInputValue(val); }
}
