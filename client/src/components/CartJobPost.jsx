import { getDayToTime, salaryScale } from "../constants/convertData";
import { useGetCompanyItemQuery } from "../slices/usersApiSlice";
import Image from "./Image";
import { IoLocationSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import Button from "./Button";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { Popover, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { multiFormatDateString } from "../lib/utils";
import {
  useCreateSavePostMutation,
  useDeleteSaveMutation,
  useGetSaveQuery,
} from "../slices/saveApiSlice";
import { toast } from "react-toastify";
import { BsFire } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
const CartJobPost = ({ post }) => {
  const [activeHeart, setActiveHeart] = useState(false);
  const nowDate = new Date();
  // api
  const { userInfo } = useSelector((state) => state.auth);

  const { data: dataCompanyItem } = useGetCompanyItemQuery(post.company);

  const [createSavePost] = useCreateSavePostMutation();
  const [deleteSave] = useDeleteSaveMutation();

  const { data: dataSavedOfUser } = useGetSaveQuery(userInfo?._id, {
    refetchOnMountOrArgChange: true,
  });

  // save
  const savedPostRecord = useMemo(() => {
    return dataSavedOfUser?.find((savePost) => savePost.postID === post._id);
  }, [post, dataSavedOfUser]);

  useEffect(() => {
    setActiveHeart(!!savedPostRecord);
  }, [savedPostRecord]);

  // ---------------------------------
  const contentHeart = useMemo(() => {
    return (
      <div className="">
        <p>Bạn cần phải đăng nhập</p>
        <p>trước khi lưu bài viết này</p>
      </div>
    );
  }, []);

  const saveTooltip = useMemo(() => {
    return <p>Để lưu</p>;
  }, []);

  const namePostTooltip = useMemo(() => {
    return <p>{post.name}</p>;
  }, []);

  const handleSavePost = (e) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setActiveHeart(false);
      toast.success("Đã hủy lưu bài");
      return deleteSave({ idSaved: savedPostRecord._id });
    }

    createSavePost({ userID: userInfo._id, postID: post._id });
    toast.success("Lưu bài thành công");
  };

  const appliedCheck = useMemo(() => {
    return post.userIDList.some((id) => id === userInfo._id);
  }, [post.userIDList, userInfo]);
  return (
    <div
      className="flex w-full min-h-40 gap-x-5 p-3 bg-white rounded-md shadow-md border-2 border-indigo-100
         hover:border-solid hover:border-2 hover:border-indigo-200"
    >
      <div
        className={`w-1/5 flex-center  p-5 border-2 relative border-indigo-100 rounded-lg cursor-pointer *:
        ${
          post.urgentRecruitment
            ? "border-solid border-orange-500 "
            : "border-dashed"
        }`}
      >
        <Link to={`/job-detail/${post._id}/${dataCompanyItem?.nameCompany}`}>
          <Image
            src={dataCompanyItem?.avatar}
            alt="SignInImage"
            className="w-full h-fit"
          />
        </Link>

        {post.urgentRecruitment && (
          <div className="px-2 py-1 bg-red-100 absolute top-0 right-0  rounded-se-lg rounded-es-lg">
            <p className="flex items-center gap-x-1 text-red-600 text-sm ">
              <span>
                <BsFire />
              </span>
              Tuyển gấp
            </p>
          </div>
        )}
      </div>

      <div className="w-[57%] h-full">
        <Link to={`/job-detail/${post._id}/${dataCompanyItem?.nameCompany}`}>
          <Tooltip placement="top" title={namePostTooltip}>
            <div className="w-96">
              <p
                className="text-base font-medium text-indigo-500 cursor-pointer line-clamp-1
                            hover:text-indigo-600 hover:underline"
              >
                {post.name}
              </p>
            </div>
          </Tooltip>
        </Link>

        <p className="">{dataCompanyItem?.nameCompany}</p>
        <p className="text-[12px] font-semibold leading-[140%] text-gray-500">
          Đăng {multiFormatDateString(post?.createdAt)}
        </p>
        <div className="flex my-3 gap-6">
          {post.skills?.slice(0, 5)?.map((skill, idx) => (
            <div
              className="p-1 px-3 cursor-pointer font-medium text-xs rounded-full bg-indigo-100 shadow-sm"
              key={idx}
            >
              {skill}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-6">
            <p className="flex gap-2 items-center text-sm ">
              <span className=" text-indigo-400">
                <IoLocationSharp />
              </span>
              {dataCompanyItem?.address}
            </p>
            <p className="flex gap-2 items-center text-sm ">
              <span className=" text-indigo-400">
                <FaClock />
              </span>
              <span className="">{getDayToTime(nowDate, post?.deadline)}</span>
              ngày ứng tuyển
            </p>
          </div>
        </div>
      </div>

      <div className="w-[23%] flex justify-between flex-col">
        <div className="flex items-end justify-end">
          <p className="text-base font-bold text-indigo-500">
            {" "}
            {salaryScale(post?.minSalary, post?.maxSalary)}{" "}
          </p>
        </div>
        <div className="flex w-full gap-2">
          {userInfo ? (
            <>
              {!appliedCheck ? (
                <Button
                  title="Ứng tuyển"
                  styles="!w-24 !px-1"
                  to={`/job-detail/${post._id}/${dataCompanyItem?.nameCompany}`}
                />
              ) : (
                <Button
                  title="Đã ứng tuyển"
                  styles="!w-40 !px-1 !text-sm !bg-slate-400 !font-normal"
                  // iconLeft={<FaCheck />}
                  to={`/job-detail/${post._id}/${dataCompanyItem?.nameCompany}`}
                />
              )}
              <Tooltip placement="top" title={saveTooltip}>
                <span
                  className={`p-3 rounded-md bg-indigo-100 text-indigo-400 cursor-pointer border-2 border-solid border-indigo-100
                                    active:translate-y-1 ${
                                      activeHeart
                                        ? "!bg-red-100 !text-red-600 !border-red-200"
                                        : ""
                                    }`}
                  onClick={(e) => handleSavePost(e)}
                >
                  {activeHeart ? <FaHeart /> : <FaRegHeart />}
                </span>
              </Tooltip>
            </>
          ) : (
            <>
              <Popover trigger="hover" content="Đăng nhập để ứng tuyển">
                <div>
                  <Button
                    title="Ứng tuyển"
                    styles="!w-24 !px-1"
                    to="/signIn-signUp-User"
                  />
                </div>
              </Popover>
              <Popover content={contentHeart} trigger="hover">
                <span
                  className={`p-3 rounded-md bg-indigo-100 text-indigo-400 cursor-pointer border-2 border-solid border-indigo-100
                                    active:translate-y-1 ${
                                      activeHeart
                                        ? "!bg-red-100 !text-red-600 !border-red-200"
                                        : ""
                                    }`}
                  onClick={(e) => handleSavePost(e)}
                >
                  {activeHeart ? <FaHeart /> : <FaRegHeart />}
                </span>
              </Popover>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartJobPost;
