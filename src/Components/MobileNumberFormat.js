export const formatMobileNumber = (number) => {
    if (number?.startsWith('0')) {
        return '92' + number.slice(1).replace(/(\d{2})(\d{3})(\d{3})(\d{3})(\d{1})/, '$1 $2 $3 $4 $5');
    } else if (number?.startsWith('92')) {
        return number.replace(/(\d{2})(\d{3})(\d{3})(\d{3})(\d{1})/, '$1 $2 $3 $4 $5');
    } else {
        return number;
    }
};
