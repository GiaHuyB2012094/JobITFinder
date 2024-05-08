import Image from "../Image";

const NotificationDashboard = (props) => {
  const { applyQuantity } = props;
  return (
    <div className="flex-between gap-3 w-full rounded-md py-3 px-6 bg-orange-400 text-white">
      <div className="font-medium flex flex-col gap-3">
        <p className="text-sm">Hello KMS</p>
        <p className="text-2xl">
          Bạn có <span className="text-3xl">{applyQuantity}</span> đơn ứng tuyển
          mới trong ngày hôm nay !
        </p>
        <p className="text-lg">Cùng xem nào</p>
      </div>
      <div className="">
        <Image
          src="https://img.freepik.com/free-vector/smart-spaces-abstract-concept-illustration-spaced-learning-school-ai-education-learning-management-system-teaching-resources-academic-progress-collaboration_335657-3470.jpg?w=740&t=st=1708092941~exp=1708093541~hmac=0262716f32224d30246aa415a94561b571d1fba29f28de40db1f1da0cd346848"
          alt="candide"
          className="w-36"
        />
      </div>
    </div>
  );
};

export default NotificationDashboard;
