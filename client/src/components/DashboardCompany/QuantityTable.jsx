import Image from "../Image";
import flatIconPost from "../../assets/Flaticons/post.png";
import usersIconPost from "../../assets/Flaticons/teamwork.png";
import calendarIconPost from "../../assets/Flaticons/timetable.png";
const QuantityTable = (props) => {
  const { applyQuantity, postQuantity, scheduledApplyQuantity } = props;
  return (
    <div className="w-full flex flex-col gap-2 py-3 px-5 bg-white rounded-md drop-shadow-md">
      <div className="flex gap-7 items-center">
        <Image src={flatIconPost} alt="post" className="w-10 h-10" />
        <div className="flex flex-col">
          <p className="font-medium">Số bài đăng</p>
          <p className="font-bold text-orange-500 text-xl">{postQuantity}</p>
        </div>
      </div>
      <div className="flex gap-7 items-center">
        <Image src={usersIconPost} alt="post" className="w-10 h-10" />
        <div className="flex flex-col">
          <p className="font-medium">Số lượng ứng tuyển</p>
          <p className="font-bold text-orange-500 text-xl">{applyQuantity}</p>
        </div>
      </div>
      <div className="flex gap-7 items-center">
        <Image src={calendarIconPost} alt="post" className="w-10 h-10" />
        <div className="flex flex-col">
          <p className="font-medium">Đã đặt lịch hẹn</p>
          <p className="font-bold text-orange-500 text-xl">
            {scheduledApplyQuantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuantityTable;
