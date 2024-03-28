export function convertData(dataName, value) {
  let result;
  if (dataName) {
    result = dataName.find((el) => el?.value === value);
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
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return formattedDate;
}
// New Date => yyyy-mm-dd
export function formatDateYYYYMMDD(date = new Date()) {
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", {
    month: "2-digit",
  });
  const day = date.toLocaleString("default", { day: "2-digit" });
  return [year, month, day].join("-");
}
// New Date => hh:mm dd-mm-yyyy
export function formatDateTime(data) {
  let date = new Date(data);

  const formatDateTime = `${date.getHours() + 1} giờ ${
    date.getMinutes() + 1
  } phút - ${convertDateFormat(date)}`;
  return formatDateTime;
}
export const convertCurrencyVND = (x) => {
  if (x)
    return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  return 0;
};

export const convertCurrency = (x) => {
  if (x) return new Intl.NumberFormat().format(x);
  return 0;
};

export const convertVNDToUSD = (val) => {
  return Math.floor(val / 24500);
};

// tinh luong
export const salaryScale = (minSalary, maxSalary) => {
  let result = "";
  if (minSalary === 100000 && maxSalary === 100000) {
    result = "Lương thỏa thuận";
  } else if (minSalary >= 10000000 && maxSalary <= 14000000) {
    result = "10 - 12 triệu";
  } else if (minSalary >= 15000000 && maxSalary <= 20000000) {
    result = "15 - 20 triệu";
  } else if (minSalary >= 17000000 && maxSalary <= 23000000) {
    result = "17 - 23 triệu";
  } else if (minSalary >= 20000000 && maxSalary <= 25000000) {
    result = "20 - 25 triệu";
  } else if (minSalary >= 25500000 && maxSalary <= 30000000) {
    result = "25 - 30 triệu";
  } else if (minSalary >= 30000000 && maxSalary <= 35000000) {
    result = "Tới 35 triệu";
  } else if (minSalary >= 35500000 && maxSalary <= 40000000) {
    result = "Tới 40 triệu";
  } else if (minSalary >= 50000000 && maxSalary <= 55000000) {
    result = "Tới 5s0 triệu";
  } else if (minSalary >= 60000000 && maxSalary <= 65000000) {
    result = "Tới 60 triệu";
  } else {
    result = "Lương thỏa thuận";
  }
  return result;
};

export const quantityOfEmployee = (quantity) => {
  let result = "";
  if (quantity < 50 && quantity > 0) result = "25-50 nhân viên";
  if (quantity > 50 && quantity < 100) result = "50-99 nhân viên";
  if (quantity > 100 && quantity < 500) result = "100-499 nhân viên";
  if (quantity > 500 && quantity < 1000) result = "500-999 nhân viên";
  if (quantity > 1000 && quantity < 3000) result = "Hơn 1000 nhân viên";
  if (quantity > 3000) result = "Hơn 3000 nhân viên";
  return result;
};

export const currencyFormat = (money) => {
  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };
  const formated = new Intl.NumberFormat("vi-VN", config).format(money);
  return formated;
};

export const getDayToTime = (d1, d2) => {
  d1 = new Date(d1);
  d2 = new Date(d2);
  let ms1 = d1.getTime();
  let ms2 = d2.getTime();
  return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
};

export const handleTextSearch = (message) => {
  let messageTemp = message.toLowerCase();
  let wsRegex = /\s+/g;
  messageTemp = messageTemp.trim();
  return messageTemp.replace(wsRegex, " ");
};

export const isEmpty = (st) => {
  let result = [...st].map((char) => char.replace(" ", "")).join("");
  if (result.length <= 0) return true;
  return false;
};

export const splitLocation = (str) => {
  let result = str.split(",");
  return result[result.length - 1]?.trim();
};
