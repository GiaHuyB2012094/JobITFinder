import { useSelector } from "react-redux";
import { useGetAppliesCompanyIDQuery } from "../../slices/applyApiSlice";
import Image from "../Image";
import { convertDateFormat } from "../../constants/convertData";
import { useGetUserItemQuery } from "../../slices/usersApiSlice";

const Card = ({ apply }) => {
  const { data: dataUser } = useGetUserItemQuery(apply.userID, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div className="flex-between gap-2 px-5 pt-1 pb-2 border-b ">
      <div className="flex items-center gap-2 w-28">
        <div className="bg-white relative shadow-md rounded-full flex-center w-10 h-10 p-[2px] border">
          <Image
            src={dataUser?.avatar}
            alt="avatar"
            className="rounded-full h-8 object-contain object-center "
          />
        </div>
        <p className="">{apply.name}</p>
      </div>
      <p className="w-28">{apply.post.level[0]}</p>
      <p className="w-32">{convertDateFormat(apply.post.deadline)}</p>
      <p className="w-64 truncate">{apply.post.name}</p>
      <p className="w-28">{apply.phone}</p>
    </div>
  );
};

const InterviewProcess = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: dataApply } = useGetAppliesCompanyIDQuery(userInfo?._id);

  return (
    <div className="bg-white rounded drop-shadow px-4">
      <p className="text-lg font-medium text-orange-500 py-3 ">
        Quá trình tuyển dụng
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex-between font-medium gap-2 px-5 border-b pb-2">
          <p className="w-28">Tên</p>
          <p className="w-28">Vị trí</p>
          <p className="w-32">Ngày Phỏng Vấn</p>
          <p className="w-64">Công việc</p>
          <p className="w-28">Số điện thoại</p>
        </div>

        {/* candidate */}
        {dataApply?.map((apply, idx) => (
          <Card key={idx} apply={apply} />
        ))}
      </div>
    </div>
  );
};

export default InterviewProcess;
