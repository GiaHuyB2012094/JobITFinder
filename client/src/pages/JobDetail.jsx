import { Link, useParams } from "react-router-dom";
import {
  Button,
  CartCompanySquare,
  CartGroup,
  CartJobPost,
  Footer,
  FormApply,
  Image,
  Nav,
} from "../components";
import { useGetPostItemQuery, useGetPostsQuery } from "../slices/postApiSlice";
import {
  useGetCompanyItemQuery,
  useGetCompanyListQuery,
} from "../slices/usersApiSlice";
import {
  convertData,
  convertDateFormat,
  quantityOfEmployee,
} from "../constants/convertData";
import { FaClock } from "react-icons/fa6";
import { getProvinces } from "../api/provincesApi";
import { useQuery } from "react-query";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { Modal, Popover } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaUsers,
  FaEdit,
  FaTransgenderAlt,
} from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { SiReverbnation } from "react-icons/si";

import { IoLocationSharp, IoDocumentTextSharp } from "react-icons/io5";
import { SiOpslevel } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import { FaRegHourglassHalf, FaCircleInfo } from "react-icons/fa6";
import { MdOutlineWorkHistory } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import {
  bannerUrl,
  contracts,
  gender,
  levelList,
  typeJobs,
} from "../constants";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useGetSkillsQuery } from "../slices/skillOfCompanyApiSlice";
import { useGetIndustryQuery } from "../slices/industryOfCompanyApiSlice";
// flat-icon
import typeJobIcon from "../assets/Flaticons/clock.png";
import quantityIcon from "../assets/Flaticons/teamwork.png";
import contractIcon from "../assets/Flaticons/contract.png";
import genderEqualityIcon from "../assets/Flaticons/gender-equality.png";
import satisfactionIcon from "../assets/Flaticons/satisfaction.png";
import websiteIcon from "../assets/Flaticons/ux.png";
import performanceIcon from "../assets/Flaticons/performance.png";
import ContentSkeleton from "../components/Shared/Skeleton/ContentSkeleton";
import { IoReloadSharp } from "react-icons/io5";
import {
  CardCompanySkeleton,
  CardGroupSkeleton,
  CardHorizontalSkeleton,
  SkeletonHorizontal,
  SkeletonNormal,
} from "../components/Shared/Skeleton";
import SkeletonHorizontalContent from "../components/Shared/Skeleton/SkeletonHorizontalContent";
import {
  useCreateSavePostMutation,
  useDeleteSaveMutation,
  useGetSaveQuery,
} from "../slices/saveApiSlice";
import { toast } from "react-toastify";
import { ApplySuggest } from "../components/ApplySuggest";

const urlSalary =
  "https://static.vecteezy.com/system/resources/previews/004/691/569/non_2x/money-illustration-free-vector.jpg";
const urlLocation =
  "https://static.vecteezy.com/system/resources/thumbnails/010/068/969/small/map-icon-with-pin-pointer-location-on-the-folded-map-vector.jpg";
const urlHourgass =
  "https://img.freepik.com/premium-vector/hourglass-icon-comic-style-sandglass-cartoon-vector-illustration-white-isolated-background-clock-splash-effect-business-concept_157943-13294.jpg?w=2000";
const JobDetail = () => {
  const { id, name } = useParams();
  const { data: provinces } = useQuery("provinces", getProvinces);
  const [activeHeart, setActiveHeart] = useState(false);
  const [lengthDataJobsPost, setLengthDataJobsPost] = useState(5);
  const [openFormApply, setOpenFormApply] = useState(false);
  const [openApplySuggest, setOpenApplySuggest] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const { data: dataPost, isLoading: isLoadingDataPost } = useGetPostItemQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );

  const { data: dataSavedOfUser } = useGetSaveQuery(userInfo?._id, {
    refetchOnMountOrArgChange: true,
  });
  const { data: dataCompany, isLoading: isLoadingDataCompany } =
    useGetCompanyItemQuery(dataPost?.company, {
      refetchOnMountOrArgChange: true,
    });

  const { data: dataSkills, isLoading: isLoadingDataSkills } =
    useGetSkillsQuery();
  const { data: dataIndustrys, isLoading: isLoadingDataIndustries } =
    useGetIndustryQuery();
  const { data: dataCompanyList, isLoading: isLoadingCompanyList } =
    useGetCompanyListQuery();

  const { data: dataJobsPost, isLoading: isLoadingDataJobPost } =
    useGetPostsQuery();

  const [createSavePost] = useCreateSavePostMutation();
  const [deleteSave] = useDeleteSaveMutation();

  const contentHeart = useMemo(() => {
    return (
      <div className="">
        <p>Bạn cần phải đăng nhập</p>
        <p>trước khi lưu bài viết này</p>
      </div>
    );
  }, []);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  // save
  const savedPostRecord = useMemo(() => {
    return dataSavedOfUser?.find(
      (savePost) => savePost.postID === dataPost?._id
    );
  }, [dataPost, dataSavedOfUser]);

  const handleSavePost = (e) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setActiveHeart(false);
      toast.success("Xóa bài lưu thành công");
      return deleteSave({ idSaved: savedPostRecord._id });
    }

    createSavePost({ userID: userInfo._id, postID: dataPost._id });
    toast.success("Lưu bài thành công");
  };

  const jobsSuggest = useMemo(() => {
    return dataJobsPost?.filter((job) => {
      const check = job.skills.some((skill) =>
        dataPost?.skills.includes(skill)
      );
      return check && job._id !== dataPost._id;
    });
  }, [dataPost, dataJobsPost]);

  useEffect(() => {
    setActiveHeart(!!savedPostRecord);
  }, [savedPostRecord]);

  const appliedCheck = useMemo(() => {
    return dataPost?.userIDList.some((id) => id === userInfo._id);
  }, [dataPost?.userIDList, userInfo]);

  return (
    <main>
      <Nav />
      <section className="py-20 min-h-screen bg-[#F0F2F5] px-48">
        {/* header */}
        <div className="h-10 flex items-center">
          <div className="h-full flex gap-1">
            <Link to="/">
              <p className="text-base cursor-pointer font-medium text-indigo-500 hover:text-indigo-700">
                Trang chủ
              </p>
            </Link>
            <p className="mx-1 font-bold"> &#62;</p>
            <Link to="/">
              <p className="text-base cursor-pointer font-medium text-indigo-500 hover:text-indigo-700">
                Việc làm IT
              </p>
            </Link>
            <p className="mx-1 font-bold"> &#62;</p>
            <Link
              to={`/company-item/${dataCompany?._id}/${dataCompany?.nameCompany}`}
            >
              <p className="text-base cursor-pointer font-medium text-indigo-500 hover:text-indigo-700">
                {dataCompany?.nameCompany}
              </p>
            </Link>
            <p className="mx-1 font-bold"> &#62;</p>
            <p className="text-base cursor-pointer font-medium text-indigo-500 hover:text-indigo-700">
              Tuyển {dataPost?.name}
            </p>
          </div>
        </div>
        {/* body */}
        <div className="min-h-screen flex flex-col gap-5">
          {/* body-1 */}
          <div className="min-h-72 w-full flex gap-5">
            {/* body-1-left */}
            <div className="min-h-72 p-7 w-8/12 rounded-lg bg-white shadow-md">
              {/* name */}
              <p className="text-xl font-medium">{dataPost?.name}</p>
              {/* feature */}
              <div className="flex-center my-2 gap-7">
                <div className="flex-center flex-1">
                  <div>
                    <Image src={urlSalary} alt="salary" className="w-28" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="">Mức lương</p>
                    <p className="font-medium">1 - 2 triệu</p>
                  </div>
                </div>
                <div className="flex-center flex-1">
                  <div>
                    <Image src={urlHourgass} alt="location" className="w-28" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="">Kinh nghiệm</p>
                    <p className="font-medium">{dataPost?.experience} năm</p>
                  </div>
                </div>
                <div className="flex-center flex-1">
                  <div>
                    <Image src={urlLocation} alt="location" className="w-28" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="">Địa chỉ</p>
                    <p className=" text-sm font-medium">
                      {dataCompany?.address}
                    </p>
                  </div>
                </div>
              </div>
              {/* deadline */}
              <div className="w-64  flex items-center gap-3 bg-gray-100 py-1 px-2 text-gray-600 text-xm rounded-md">
                <span className="">
                  <FaClock />
                </span>
                <p className="">
                  Hạn nộp hồ sơ: {convertDateFormat(dataPost?.deadline)}
                </p>
              </div>
              {/* apply */}
              <div className="w-full mt-5 flex-between">
                {!appliedCheck ? (
                  <Button
                    title="Ứng tuyển ngay"
                    styles="w-9/12 py-3"
                    iconLeft={<IoIosSend />}
                    onClick={() => setOpenFormApply(true)}
                  />
                ) : (
                  <Button
                    title="Ứng tuyển lại"
                    styles="w-9/12 py-3 !bg-slate-500"
                    iconLeft={<IoReloadSharp />}
                    onClick={() => setOpenFormApply(true)}
                  />
                )}
                {userInfo ? (
                  <span
                    className={`p-3 flex-center gap-2 rounded-md bg-indigo-100 text-indigo-400 cursor-pointer border-2 border-solid border-indigo-100
                            active:translate-y-1 ${
                              activeHeart
                                ? "!bg-red-100 !text-red-600 !border-red-200"
                                : ""
                            }`}
                    onClick={(e) => handleSavePost(e)}
                  >
                    Lưu bài đăng
                    {activeHeart ? <FaHeart /> : <FaRegHeart />}
                  </span>
                ) : (
                  <Popover content={contentHeart} trigger="hover">
                    <span
                      className={`p-3 flex-center gap-2 rounded-md bg-indigo-100 text-indigo-400 cursor-pointer border-2 border-solid border-indigo-100
                                active:translate-y-1 ${
                                  activeHeart
                                    ? "!bg-red-100 !text-red-600 !border-red-200"
                                    : ""
                                }`}
                      onClick={(e) => handleSavePost(e)}
                    >
                      Lưu bài đăng
                      {activeHeart ? <FaHeart /> : <FaRegHeart />}
                    </span>
                  </Popover>
                )}
              </div>
            </div>
            {/* body-1-right */}
            <div className="min-h-72 space-y-5  p-7 w-4/12 rounded-lg bg-white shadow-md">
              {isLoadingDataPost ? (
                <>
                  <SkeletonNormal />
                  <SkeletonNormal />
                </>
              ) : (
                <>
                  <div className="w-full flex gap-3">
                    <div className="w-40 p-3 border-2 border-dashed border-indigo-100">
                      <Image
                        src={dataCompany?.avatar}
                        alt="avatar-company"
                        className=""
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="text-xl font-medium w-full line-clamp-5">
                        {dataCompany?.nameCompany}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex gap-3">
                    <div className="w-full flex gap-3">
                      <p className="flex-center gap-3 font-medium text-gray-600">
                        <span className="font-medium text-xl">
                          <FaUsers />
                        </span>{" "}
                        Quy mô :
                      </p>
                      <p>{quantityOfEmployee(dataCompany?.sizeCompany)}</p>
                    </div>
                  </div>
                  <div className="w-full flex gap-3">
                    <div className="w-full flex gap-3 flex-wrap">
                      <p className="flex-center gap-3 font-medium text-gray-600">
                        <span className="font-medium text-xl">
                          <IoLocationSharp />
                        </span>{" "}
                        Địa điểm :
                      </p>
                      <p>{dataCompany?.address}</p>
                    </div>
                  </div>
                  <div className="w-full flex gap-3">
                    <div className="w-full flex gap-3 flex-wrap">
                      <p className="flex-center gap-3 font-medium text-gray-600">
                        <span className="font-medium text-xl">
                          <SiReverbnation />
                        </span>{" "}
                        Quốc gia :
                      </p>
                      <p>{dataCompany?.nationality}</p>
                    </div>
                  </div>
                  <div className="w-full flex-center gap-3">
                    <Link
                      to={`/company-item/${dataCompany?._id}/${dataCompany?.nameCompany}`}
                    >
                      <p className="flex-center cursor-pointer gap-3 text-base font-medium text-indigo-500">
                        Xem chi tiết công ty
                        <span>
                          <FaEdit />
                        </span>
                      </p>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* body-2 */}
          <div className="min-h-72 w-full flex gap-5">
            {/* body-2-left */}
            <div className="min-h-72 p-7 w-8/12 rounded-lg bg-white shadow-md flex flex-col gap-2">
              <p className="text-xl font-medium border-l-8 px-2 border-double border-indigo-500">
                Chi tiết tuyển dụng
              </p>
              <div className="space-y-5 py-2">
                {isLoadingDataPost ? (
                  <div className="flex gap-2">
                    {Array.from({ length: 3 }).map((item, idx) => (
                      <SkeletonHorizontal key={idx} width={240} height={240} />
                    ))}
                  </div>
                ) : (
                  dataPost?.imgPost?.map((img, idx) => (
                    <div key={idx} className="flex flex-wrap gap-3">
                      <Image
                        src={img}
                        alt={`img - ${idx}`}
                        className="w-80 h-80 rounded-md"
                      />
                    </div>
                  ))
                )}

                {isLoadingDataPost ? (
                  Array.from({ length: 3 }).map((item, idx) => (
                    <ContentSkeleton key={idx} />
                  ))
                ) : (
                  <>
                    {/* description */}
                    <div className="flex flex-col gap-4 bg-slate-100 my-2 px-5 py-2 rounded-lg ">
                      <p className="text-lg text-indigo-500 font-medium w-full border-b-2 border-solid border-indigo-200 py-1">
                        Mô tả công việc
                      </p>
                      <div
                        className="bg-indigo-50 w-full border-2 border-dashed border-indigo-300 rounded-lg py-3 px-5"
                        dangerouslySetInnerHTML={createMarkup(dataPost?.desc)}
                      ></div>
                    </div>

                    {/* request */}
                    <div className="flex flex-col gap-4 bg-slate-100 my-2 px-5 py-2 rounded-lg ">
                      <p className="text-lg text-indigo-500 font-medium w-full border-b-2 border-solid border-indigo-200 py-1">
                        Yêu cầu
                      </p>

                      <ul className="flex flex-col gap-1">
                        {dataPost?.request?.map((item, idx) => (
                          <li key={idx}>&#8226; {item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* benefit */}
                    <div className="flex flex-col gap-4 bg-slate-100 my-2 px-5 py-2 rounded-lg ">
                      <p className="text-lg text-indigo-500 font-medium w-full border-b-2 border-solid border-indigo-200 py-1">
                        Phúc lợi
                      </p>
                      <ul className="flex flex-col gap-1">
                        {dataPost?.benefit?.map((item, idx) => (
                          <li key={idx}>
                            <span className="">&#10017;</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/*  */}
                  </>
                )}

                {isLoadingDataPost ? (
                  <div className="space-y-5">
                    {Array.from({ length: 4 }).map((item, idx) => (
                      <SkeletonHorizontalContent key={idx} contentNumber={3} />
                    ))}
                  </div>
                ) : (
                  <>
                    {/* locations */}
                    <div className="flex flex-col gap-4 ">
                      <p className="text-lg text-indigo-500 font-medium w-full border-b-2 border-solid border-indigo-200 py-1">
                        Địa điểm
                      </p>
                      <ul className="flex flex-col gap-1">
                        {dataPost?.locations?.map((item, idx) => (
                          <li key={idx}>
                            <span className="">&#10055;</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* hour-work */}
                    <div className="flex flex-col gap-4 ">
                      <p className="text-lg text-indigo-500 font-medium w-full border-b-2 border-solid border-indigo-200 py-1">
                        Thời gian làm việc
                      </p>
                      <p>&#10030;Thứ 2 - Thứ 6 (từ 08:00 đến 17:00)</p>
                    </div>

                    {/* apply */}
                    <div className="flex flex-col gap-4 ">
                      <p className="text-lg text-indigo-500 font-medium w-full border-b-2 border-solid border-indigo-200 py-1">
                        Cách ứng tuyển
                      </p>
                      <p className="">
                        Ứng viên nộp hồ sơ trực tuyến bằng cách bấm{" "}
                        <span className="font-medium">Ứng tuyển</span> ngay dưới
                        đây.
                      </p>
                      <div className="flex gap-3">
                        {!appliedCheck ? (
                          <Button
                            title="Ứng tuyển ngay"
                            styles="w-40"
                            onClick={() => setOpenFormApply(true)}
                          />
                        ) : (
                          <Button
                            title="Ứng tuyển lại"
                            styles="w-48 !bg-slate-500"
                            iconLeft={<IoReloadSharp />}
                            onClick={() => setOpenFormApply(true)}
                          />
                        )}
                        <Button
                          title="Lưu bài"
                          styles={`w-28  ${activeHeart ? "!bg-red-600" : ""}`}
                          // roundPrimary
                          onClick={(e) => handleSavePost(e)}
                        />
                      </div>
                    </div>
                    {/* deadline */}
                    <div className="w-96  flex items-center gap-3  py-1 px-2 my-2 text-gray-600 rounded-md">
                      <span className="">
                        <FaClock />
                      </span>
                      <p className="text-sm">
                        Hạn nộp hồ sơ: {convertDateFormat(dataPost?.deadline)}
                      </p>
                    </div>
                  </>
                )}

                {/* note */}
                <div className="w-full  flex gap-3 bg-gray-100 py-1 px-2 my-2 text-xm rounded-md">
                  <span className="text-indigo-500 py-1">
                    <FaCircleInfo />
                  </span>
                  <p className="">
                    Báo cáo tin tuyển dụng: Nếu bạn thấy rằng tin tuyển dụng này
                    không đúng hoặc có dấu hiệu lừa đảo,{" "}
                    <span className="text-indigo-500">
                      hãy phản ánh với chúng tôi.
                    </span>
                  </p>
                </div>
                <div className="w-full my-2">
                  <Image
                    src={bannerUrl[0]}
                    alt="iksak"
                    className="w-full h-40"
                  />
                </div>
              </div>
            </div>

            {/* body-2-right */}
            <div className="min-h-72 flex gap-5 flex-col w-4/12">
              {/*  */}
              <div className="min-h-72 space-y-6 p-7 w-full rounded-lg bg-white shadow-md">
                <div className="space-y-4">
                  <p className="text-xl font-medium border-l-8 px-2 border-double border-indigo-500">
                    Thông tin chung
                  </p>
                  {isLoadingDataPost ? (
                    <div className="space-y-2">
                      {Array.from({ length: 6 }).map((item, idx) => (
                        <SkeletonNormal key={idx} />
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="w-full flex gap-5">
                        <div className="font-medium text-xl rounded-full w-12 flex-center bg-indigo-300 text-white">
                          <Image src={websiteIcon} alt="website" />
                        </div>
                        <div className="">
                          <p className="text-gray-500">Website</p>
                          <a
                            href={dataPost?.urlApply}
                            className="cursor-pointer text-indigo-500 font-medium hover:text-indigo-700"
                          >
                            {dataPost?.urlApply}
                          </a>
                        </div>
                      </div>

                      <div className="w-full flex gap-5">
                        <div className="font-medium text-xl rounded-full w-12 flex-center bg-indigo-300 text-white">
                          <Image src={performanceIcon} alt="performanceIcon" />
                        </div>
                        <div className="">
                          <p className="text-gray-500">Cấp bậc</p>
                          <div className="flex">
                            {dataPost?.level?.map((item, idx) => (
                              <p key={idx} className="font-medium">
                                {idx > 0 ? "," : ""}{" "}
                                {convertData(levelList, item)}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex gap-5">
                        <div className="font-medium text-xl rounded-full w-12 flex-center bg-indigo-300 text-white">
                          <Image
                            src={satisfactionIcon}
                            alt="satisfactionIcon"
                          />
                        </div>
                        <div className="">
                          <p className="text-gray-500">Kinh nghiệm</p>
                          <p className="font-medium">
                            {dataPost?.experience} năm
                          </p>
                        </div>
                      </div>

                      <div className="w-full flex gap-5">
                        <div className="font-medium text-xl rounded-full w-12 flex-center ">
                          <Image src={quantityIcon} alt="quantity" />
                        </div>
                        <div className="">
                          <p className="text-gray-500">Số lượng</p>
                          <p className="font-medium">
                            {dataPost?.quantity} người
                          </p>
                        </div>
                      </div>

                      <div className="w-full flex gap-5">
                        <div className="font-medium text-xl rounded-full w-12 flex-center ">
                          <Image src={typeJobIcon} alt="type" />
                        </div>
                        <div className="">
                          <p className="text-gray-500">Hình thức làm việc</p>
                          {dataPost?.typeJob?.map((item, idx) => (
                            <p key={idx} className="font-medium">
                              {convertData(typeJobs, item)}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="w-full flex gap-5">
                        <div className="font-medium text-xl rounded-full w-12 flex-center bg-indigo-300 text-white">
                          {/* <IoDocumentTextSharp /> */}
                          <Image src={contractIcon} alt="contractIcon" />
                        </div>
                        <div className="">
                          <p className="text-gray-500">Hợp đồng</p>
                          {dataPost?.contract?.map((item, idx) => (
                            <p key={idx} className="font-medium">
                              {convertData(contracts, item)}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="w-full flex gap-5">
                        <div className="font-medium text-xl rounded-full w-12 flex-center bg-indigo-300 text-white">
                          <Image
                            src={genderEqualityIcon}
                            alt="genderEqualityIcon"
                          />
                        </div>
                        <div className="">
                          <p className="text-gray-500">Giới tính</p>
                          <p className="font-medium">
                            {convertData(gender, dataPost?.gender)}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2 border-t-2 border-solid border-indigo-200 pt-6">
                  <p className="text-xl font-medium border-l-8 px-2 border-double border-indigo-500">
                    Quy trình phỏng vấn
                  </p>
                  {isLoadingDataPost ? (
                    <SkeletonNormal />
                  ) : (
                    <ul className="space-y-2">
                      {dataPost?.interviewProcess?.map((item, idx) => (
                        <li key={idx}>
                          <span className="font-medium">
                            &#10052; Vòng {idx} :
                          </span>{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {/*  */}
              <div className=" flex  gap-5 flex-col p-7 w-full rounded-lg bg-white shadow-md">
                {/* industry */}
                <div className="">
                  <p className="text-xl font-medium border-l-8 px-2 border-double border-indigo-500">
                    Các kỹ năng
                  </p>
                  {isLoadingDataPost ? (
                    <SkeletonNormal />
                  ) : (
                    <div className="flex gap-2 flex-wrap my-2">
                      {dataPost?.skills?.map((skills, idx) => (
                        <p
                          key={idx}
                          className="py-1 px-2 text-sm rounded-md bg-indigo-100"
                        >
                          {convertData(dataSkills, skills)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                {/* skills */}
                <div className="">
                  <p className="text-xl font-medium border-l-8 px-2 border-double border-indigo-500">
                    Lĩnh vực
                  </p>
                  {isLoadingDataPost ? (
                    <SkeletonNormal />
                  ) : (
                    <div className="flex gap-2 flex-wrap my-2">
                      {dataCompany?.industryCompany?.map((industry, idx) => (
                        <p
                          key={idx}
                          className="py-1 px-2 text-sm rounded-md bg-indigo-100"
                        >
                          {convertData(dataIndustrys, industry)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/*  */}
              {isLoadingCompanyList ? (
                <CardCompanySkeleton />
              ) : (
                dataCompanyList && (
                  <CartCompanySquare
                    avatar={dataCompanyList[0]?.avatar}
                    name={dataCompanyList[0]?.nameCompany || ""}
                    coverImg={dataCompanyList[0]?.coverImg}
                    industry={dataCompanyList[0]?.industryCompany}
                    address={dataCompanyList[0]?.address}
                    nationality={dataCompanyList[0]?.nationality}
                  />
                )
              )}
              {/*  */}
              {isLoadingDataJobPost ? (
                Array.from({ length: 1 }).map((item, idx) => (
                  <CardGroupSkeleton key={idx} />
                ))
              ) : (
                <CartGroup
                  posts={dataJobsPost}
                  titleCartGroup="Việc làm nổi bật"
                />
              )}
              {/* poster portal it */}
              <div className="w-full">
                <Image
                  src="https://img.freepik.com/free-vector/gradient-technology-cyber-monday-vertical-poster-template_23-2149107550.jpg?w=740&t=st=1706236166~exp=1706236766~hmac=00da8c8030667dacf44fda1f744d2c60ed7607d602fcda494cf617e4a0be277c"
                  alt="poster-portal-it"
                />
              </div>
            </div>
          </div>
          {/* body-3 */}
          <div className="w-full flex gap-5">
            <div className="min-h-72 p-7 w-full rounded-lg bg-white shadow-md flex flex-col gap-2">
              {/* related work */}
              <div className="w-full space-y-5 ">
                <p className="text-xl font-medium border-l-8 px-2 border-double border-indigo-500 mx-auto w-full">
                  Các công việc liên quan
                </p>

                {isLoadingDataPost ? (
                  <div className="space-y-5">
                    {Array.from({ length: 4 }).map((item, idx) => (
                      <CardHorizontalSkeleton key={idx} />
                    ))}
                  </div>
                ) : (
                  <div className="px-28 space-y-5">
                    {dataJobsPost
                      ?.slice(0, lengthDataJobsPost)
                      ?.map((data, idx) => (
                        <div key={idx}>
                          <CartJobPost post={data} />
                        </div>
                      ))}
                  </div>
                )}

                {dataJobsPost?.length > 5 && (
                  <div className="flex justify-center">
                    <Button
                      medium
                      roundPrimary
                      title="Xem thêm"
                      styles="!px-20 !w-72 "
                      onClick={() => {
                        setLengthDataJobsPost((prev) =>
                          prev + 5 > dataJobsPost.length
                            ? dataJobsPost.length
                            : prev + 5
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        title={
          <p className="text-lg pb-3 border-b-2 border-dashed border-indigo-200">
            Ứng tuyển vị trí
            <span className="mx-1 font-bold text-indigo-500">
              {dataPost?.name}
            </span>
            tại
            <span className="mx-1 font-bold text-indigo-500">
              {dataCompany?.nameCompany}
            </span>
          </p>
        }
        centered
        open={openFormApply}
        // onOk={() => setOpenFormApply(false)}
        onCancel={() => setOpenFormApply(false)}
        width={1000}
        okType="primary"
        footer={null}
      >
        <FormApply
          companyID={dataCompany?._id}
          post={dataPost}
          modalClose={(data) => setOpenFormApply(data)}
          appliedSuccess={(data) => setOpenApplySuggest(data)}
        />
      </Modal>
      {/* apply suggest */}
      <Modal
        title={
          <p className="text-lg capitalize pb-3 border-b text-center font-bold text-indigo-500">
            Các công việc phù hợp với bạn
          </p>
        }
        centered
        open={openApplySuggest}
        onCancel={() => setOpenApplySuggest(false)}
        width={600}
        okType="primary"
        footer={null}
      >
        <ApplySuggest
          dataJobSuggest={jobsSuggest}
          onClose={(data) => setOpenApplySuggest(data)}
        />
      </Modal>
      <Footer />
    </main>
  );
};

export default JobDetail;
