import { convertDateFormat } from "../constants/convertData";

// export function formatDateString(dateString) {
//     const options = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     };
  
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleDateString("en-US", options);
  
//     const time = date.toLocaleTimeString([], {
//       hour: "numeric",
//       minute: "2-digit",
//     });
  
//     return `${formattedDate} at ${time}`;
// }
  
export const multiFormatDateString = (timestamp) => {
    const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);

    const date = new Date(timestampNum * 1000);
    const now = new Date();
  
    const diff = now.getTime() - date.getTime();
    const diffInSeconds = diff / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    switch (true) {
      case Math.floor(diffInDays) >= 30:
        return convertDateFormat(timestamp);
      case Math.floor(diffInDays) === 1:
        return `${Math.floor(diffInDays)} ngày trước`;
      case Math.floor(diffInDays) > 1 && diffInDays < 30:
        return `${Math.floor(diffInDays)} ngày trước`;
      case Math.floor(diffInHours) >= 1:
        return `${Math.floor(diffInHours)} giờ trước`;
      case Math.floor(diffInMinutes) >= 1:
        return `${Math.floor(diffInMinutes)} phút trước`;
      default:
        return "bây giờ";
    }
  };
  
export const checkIsLiked = (likeList, userId) => {
    return likeList.includes(userId);
};