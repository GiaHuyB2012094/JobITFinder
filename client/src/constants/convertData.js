export function convertData(dataName, value) {
    let result;
    if (dataName) {
        result = dataName.find(el => el?.value === value) 
    return result?.label;
    } else return;
}
// export function convertProvincesData(dataName, value) {
//     let result;
//     if (dataName) {
//         result = dataName.find(el => el?.codename === value) 
//     return result?.name;
//     } else return;
// }
// New Date => dd-mm-yyyy
export function convertDateFormat(data) {
        let date = new Date(data);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        return formattedDate;
}
// New Date => yyyy-mm-dd
export function formatDateYYYYMMDD(date = new Date()) {
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {
      month: '2-digit',
    });
    const day = date.toLocaleString('default', {day: '2-digit'});
    return [year, month, day].join('-');
}

// tinh luong
export const salaryScale = (minSalary, maxSalary) => {
    let result = "";
    if (minSalary === 100000 && maxSalary === 100000) {
        result = "Lương thỏa thuận" 
    } else if (minSalary >= 10000000 && maxSalary <= 14000000) {
        result = "10 - 12 triệu" 
    } else if (minSalary >= 15000000 && maxSalary <= 20000000) {
        result = "15 - 20 triệu" 
    } else if (minSalary >= 17000000 && maxSalary <= 23000000) {
        result = "17 - 23 triệu" 
    } else if (minSalary >= 20000000 && maxSalary <= 25000000) {
        result = "20 - 25 triệu" 
    } else if (minSalary >= 25500000 && maxSalary <= 30000000) {
        result = "25 - 30 triệu" 
    } else if (minSalary >= 30000000 && maxSalary <= 35000000) {
        result = "Tới 35 triệu" 
    } else if (minSalary >= 35500000 && maxSalary <= 40000000) {
        result = "Tới 40 triệu" 
    } else if (minSalary >= 50000000 && maxSalary <= 55000000) {
        result = "Tới 5s0 triệu" 
    } else if (minSalary >= 60000000 && maxSalary <= 65000000) {
        result = "Tới 60 triệu" 
    } else {
        result = "Lương thỏa thuận"
    }
    return result
}

export const quantityOfEmployee = (quantity)=>{
    let result = ""
    if (quantity < 50 && quantity > 0) result = "25-50 nhân viên" 
    if (quantity > 50 && quantity < 100) result = "50-99 nhân viên"
    if (quantity > 100 && quantity < 500) result = "100-499 nhân viên"
    if (quantity > 500 && quantity < 1000) result = "500-999 nhân viên"
    if (quantity > 1000 && quantity < 3000) result = "Hơn 1000 nhân viên"
    if (quantity > 3000) result = "Hơn 3000 nhân viên"
    return result
}

export const currencyFormat = (money) => {
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9}
    const formated = new Intl.NumberFormat('vi-VN', config).format(money);
    return formated;
} 