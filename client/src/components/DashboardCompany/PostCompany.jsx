import { useSelector } from "react-redux";
import { useGetPostItemWithCompanyQuery } from "../../slices/postApiSlice";
import { Link } from "react-router-dom";
import { Popover } from "antd";
import { FaCalendarAlt } from "react-icons/fa";
import { convertDateFormat } from "../../constants/convertData";

const PostCompany = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: dataPost } = useGetPostItemWithCompanyQuery(userInfo._id, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="w-full flex flex-col gap-2 p-2 bg-white shadow-md rounded-md">
      <div className="font-medium flex-between px-3 py-2 text-lg border-b">
        <p className="text-orange-500">Các bài đăng</p>
        <p className="">2</p>
      </div>

      <div className="flex flex-col gap-1">
        {dataPost?.map((post, idx) => (
          <div key={idx}>
            <Link to="/my-jobs">
              <div className="flex flex-col gap-1 w-full border border-solid border-gray-200  shadow-md p-3 cursor-pointer hover:bg-orange-100">
                <p className="font-medium text-indigo-500  truncate">
                  {post.name}
                </p>
                <div className="flex-between">
                  <div className="flex-between gap-2 ">
                    <p>
                      <FaCalendarAlt />
                    </p>
                    <p>{convertDateFormat(post.deadline)}</p>
                  </div>
                  <div className="">
                    <p>{post.apply} Ứng cử viên</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCompany;
