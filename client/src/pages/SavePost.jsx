import { Link } from "react-router-dom";
import {
  Button,
  CartCompanySquare,
  CartJobPost,
  Footer,
  Image,
  InputControl,
  Nav,
} from "../components";

import { useSelector } from "react-redux";
import { FaBuilding } from "react-icons/fa6";
import { LiaSearchLocationSolid } from "react-icons/lia";
import { useGetSaveQuery } from "../slices/saveApiSlice";
import { useGetPostItemQuery, useGetPostsQuery } from "../slices/postApiSlice";
import { useEffect, useState } from "react";
import {
  useGetCompanyItemQuery,
  useGetCompanyListQuery,
} from "../slices/usersApiSlice";
import {
  CardCompanySkeleton,
  CardHorizontalSkeleton,
} from "../components/Shared/Skeleton";

const Cart = ({ postID }) => {
  const { data } = useGetPostItemQuery(postID);
  return <div>{data && <CartJobPost post={data} />}</div>;
};

const LocationDetail = ({ postID }) => {
  const { data } = useGetPostItemQuery(postID);

  return (
    <div className="py-1">
      {data?.locations.map((location, idx) => (
        <p key={`${location}-${idx}`} className="text-gray-600">
          <span className="text-black">&#10148;</span> {location}
        </p>
      ))}
    </div>
  );
};

const NameCompany = ({ companyID }) => {
  const { data } = useGetCompanyItemQuery(companyID);
  return (
    <div className="flex gap-2 border-b-2 border-indigo-100 py-2">
      <Image src={data?.avatar} alt="avatar" className="w-20" />
      <p>{data?.nameCompany}</p>
    </div>
  );
};

const CompanyDetail = ({ postID, company, setCompany }) => {
  const { data } = useGetPostItemQuery(postID);

  const [check, setCheck] = useState(true);

  useEffect(() => {
    if (data) {
      if (company.includes(data?.company)) {
        setCheck(false);
      } else {
        setCompany((prev) => [...prev, data?.company]);
      }
    }
  }, []);

  return (
    <div className="py-1">
      {check ? <NameCompany companyID={data?.company} /> : ""}
    </div>
  );
};

const SavePost = () => {
  const [company, setCompany] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  // api
  const { data: dataSaves, isLoading: isLoadingDataSaves } = useGetSaveQuery(
    userInfo._id
  );
  const { data: dataCompanyList, isLoading: isLoadingDataCompanies } =
    useGetCompanyListQuery();
  const { data: dataJobsPost, isLoading: isLoadingDataJobPost } =
    useGetPostsQuery();

  const [lengthDataJobsPost, setLengthDataJobsPost] = useState(5);

  return (
    <section>
      <Nav />
      <main className="w-full min-h-screen bg-[#F0F2F5] py-20 px-48">
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
                Lưu bài
              </p>
            </Link>
          </div>
        </div>
        {/* body  */}
        <div className="flex gap-4 bg-gray-100 w-full">
          {/* left */}
          <div className=" w-[33%] flex flex-col gap-4">
            <div className="flex flex-col gap-2 bg-white drop-shadow-md rounded-md min-h-80 p-3">
              {/* company */}
              <div className="">
                <p className="flex items-center gap-2 text-indigo-500 font-medium">
                  <span className="">
                    <FaBuilding />
                  </span>
                  Các công ty
                </p>
                <div className="w-full px-2">
                  {dataSaves?.map((save, idx) => (
                    <div key={idx} className="">
                      <CompanyDetail
                        postID={save.postID}
                        setCompany={(ok) => setCompany(ok)}
                        company={company}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* locations */}
              <div className="">
                <p className="flex items-center gap-2 text-indigo-500 font-medium">
                  <span className="">
                    <LiaSearchLocationSolid />
                  </span>
                  Các địa điểm
                </p>
                <div className="w-full px-2">
                  {dataSaves?.map((save, idx) => (
                    <div key={idx} className="">
                      <LocationDetail postID={save.postID} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/*  */}
            <div>
              {isLoadingDataCompanies
                ? Array.from({ length: 1 }).map((item, idx) => (
                    <CardCompanySkeleton key={idx} />
                  ))
                : dataCompanyList && (
                    <CartCompanySquare
                      avatar={dataCompanyList[0]?.avatar}
                      name={dataCompanyList[0]?.nameCompany || ""}
                      coverImg={dataCompanyList[0]?.coverImg}
                      industry={dataCompanyList[0]?.industryCompany}
                      address={dataCompanyList[0]?.address}
                      nationality={dataCompanyList[0]?.nationality}
                    />
                  )}
            </div>
          </div>
          {/* right */}
          <div className="w-[66%] flex flex-col gap-4">
            <div className="flex flex-col gap-3 bg-white drop-shadow-md rounded-md min-h-80 p-3">
              <p className="text-lg pb-2 border-b-2 border-solid border-indigo-100">
                Đã lưu
                <span className="font-bold text-indigo-500 px-2 border-2 bg-indigo-50 border-dashed border-indigo-200 rounded-sm mx-1">
                  {dataSaves?.length}
                </span>
                bài tuyển dụng
              </p>

              <div className="flex w-full gap-3 pb-2  border-b-2 border-solid border-indigo-100">
                <p className="font-medium ">Ưu tiên hiển thị :</p>
                <form className="flex-between">
                  <div className="flex-center ">
                    <InputControl type="radio" name="optionsFilter" />
                    <p className="text-nowrap">Cập nhật gần nhất</p>
                  </div>

                  <div className="flex-center">
                    <InputControl type="radio" name="optionsFilter" />
                    <p className="text-nowrap">Tuyển gấp</p>
                  </div>

                  <div className="flex-center">
                    <InputControl type="radio" name="optionsFilter" />
                    <p className="text-nowrap">lương cao nhất</p>
                  </div>
                </form>
              </div>

              <div className="flex flex-col gap-5 py-3">
                {isLoadingDataSaves
                  ? Array.from({ length: 4 }).map((item, idx) => (
                      <CardHorizontalSkeleton key={idx} />
                    ))
                  : dataSaves?.map((save, idx) => (
                      <div key={idx} className="">
                        <Cart postID={save.postID} />
                      </div>
                    ))}
              </div>
            </div>

            {/* suggest jobs */}
            <div className="flex flex-col gap-3 bg-white drop-shadow-md rounded-md min-h-80 p-3">
              <p className="text-xl font-medium text-indigo-700">
                Gợi ý việc làm
              </p>
              {isLoadingDataJobPost
                ? Array.from({ length: 4 }).map((item, idx) => (
                    <CardHorizontalSkeleton key={idx} />
                  ))
                : dataJobsPost
                    ?.slice(0, lengthDataJobsPost)
                    ?.map((data, idx) => (
                      <div key={idx}>
                        <CartJobPost post={data} />
                      </div>
                    ))}

              {dataJobsPost?.length > 5 && (
                <div className="mx-auto">
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
      </main>
      <Footer />
    </section>
  );
};

export default SavePost;
