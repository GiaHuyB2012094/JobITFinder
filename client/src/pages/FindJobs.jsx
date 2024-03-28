import { useMemo, useState } from "react";
import {
  Button,
  CartGroup,
  CartJobPost,
  Footer,
  Image,
  Nav,
} from "../components";
import { CompanyCart, CartCompanySquare } from "../components/company";
import { useGetCompanyListQuery } from "../slices/usersApiSlice";
// import { convertProvincesData } from "../constants/convertData";
// import { getProvinces } from "../api/provincesApi";
// import { useQuery } from "react-query";
// import cvFlatIcon from "../assets/Flaticons/cv.png"

import { useGetPostsQuery } from "../slices/postApiSlice";
import CardHorizontalSkeleton from "../components/Shared/Skeleton/CardHorizontalSkeleton";
import CardGroupSkeleton from "../components/Shared/Skeleton/CardGropSkeleton";
import CardCompanySkeleton from "../components/Shared/Skeleton/CardCompanySkeleton";
import Slider from "react-slick";
import { SkeletonHorizontal } from "../components/Shared/Skeleton";
import { Link } from "react-router-dom";
import {
  BannerIntroduction,
  FastSearch,
  Feature,
  SearchBar,
} from "../components/Home";

const FindJobs = () => {
  // const { data: provinces } = useQuery("provinces", getProvinces)
  const { data: dataCompanyList, isLoading: isLoadingDataCompanies } =
    useGetCompanyListQuery();
  const { data: dataJobsPost, isLoading: isLoadingDataJobPost } =
    useGetPostsQuery();
  const [lengthDataCompanyList, setLengthDataCompanyList] = useState(5);
  const [lengthDataJobsPost, setLengthDataJobsPost] = useState(5);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const settingsSub = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };
  const dataCompaniesHaveJobs = useMemo(() => {
    const result = dataCompanyList?.filter((comp) =>
      dataJobsPost?.some((job) => job.company === comp._id)
    );
    return result;
  }, [dataCompanyList, dataJobsPost]);
  return (
    <main>
      <Nav />
      <section className="pt-16 ">
        {/* search */}
        <div className="h-[630px] relative border-b ">
          <SearchBar searchResult={(data) => console.log(data)} />
          <div className="h-full flex absolute top-0 -z-10">
            <Image className=" h-full " src="./src/assets/bg-5g.jpg" alt="ád" />
            <Image
              className=" h-full"
              src="./src/assets/20944381.jpg"
              alt="ád"
            />
          </div>
        </div>

        <div className="min-h-[630px] relative border-b ">
          <FastSearch />
          <div className="h-full absolute top-0 left-0 right-0 -z-10">
            <Image
              className=" h-full w-full opacity-90"
              src="./src/assets/BG_IT.jpg"
              alt="fast-search"
            />
          </div>
        </div>

        <BannerIntroduction />

        <Feature />

        {/* outstanding companies  */}
        <div className="min-h-80 bg-indigo-50 drop-shadow space-y-5  py-8 px-48">
          <div>
            <p className="text-xl font-medium text-indigo-700">
              Công ty đang tuyển
            </p>
            <div className="slider-container mt-5">
              <Slider {...settings}>
                {!isLoadingDataJobPost
                  ? dataCompanyList &&
                    dataCompaniesHaveJobs
                      ?.slice(0, 9)
                      ?.map((item, idx) => (
                        <CartCompanySquare
                          key={idx}
                          id={item?._id}
                          avatar={item?.avatar}
                          name={item?.nameCompany || ""}
                          coverImg={item?.coverImg}
                          industry={item?.industryCompany}
                          address={item?.address}
                          nationality={item?.nationality}
                        />
                      ))
                  : Array.from({ length: 3 }).map((item, idx) => (
                      <CardCompanySkeleton key={idx} />
                    ))}
              </Slider>
            </div>
          </div>

          <div>
            <p className="text-xl font-medium text-indigo-700">
              Các nhà tuyển dụng
            </p>

            <div className="slider-container mt-5">
              <Slider {...settingsSub}>
                {!isLoadingDataJobPost
                  ? dataCompanyList &&
                    dataCompanyList?.slice(0, 18)?.map((item, idx) => (
                      <Link
                        key={idx}
                        className="hover:drop-shadow border  cursor-pointer bg-white flex-center p-2 w-44"
                        to={`/company-item/${item._id}/${item.nameCompany}`}
                      >
                        <Image
                          src={item?.avatar}
                          alt={idx}
                          className="w-full h-16"
                        />
                      </Link>
                    ))
                  : Array.from({ length: 3 }).map((item, idx) => (
                      <SkeletonHorizontal key={idx} width={160} height={160} />
                    ))}
              </Slider>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="flex  gap-5 bg-[#F0F2F5] min-h-screen py-8 px-48">
          {/* content-left */}
          <div className="flex flex-col gap-5 w-8/12">
            {/* info jobs */}
            <div className="flex flex-col gap-5">
              <p className="text-xl font-medium text-indigo-700">
                Thông tin việc làm
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

            {/* info companies */}
            <div className="flex flex-col gap-5 ">
              <p className="text-xl font-medium text-indigo-700">
                Thông tin công ty
              </p>

              {isLoadingDataCompanies
                ? Array.from({ length: 4 }).map((item, idx) => (
                    <CardHorizontalSkeleton key={idx} />
                  ))
                : dataCompanyList
                    ?.slice(0, lengthDataCompanyList)
                    ?.map((data, idx) => (
                      <div key={idx}>
                        <CompanyCart
                          title={data.nameCompany}
                          image={data.avatar}
                          quantity={data.sizeCompany}
                          address={data.address}
                          skills={data.skillOfCompany}
                          idCompany={data._id}
                        />
                      </div>
                    ))}

              {lengthDataCompanyList > 4 && (
                <div className="mx-auto">
                  <Button
                    medium
                    roundPrimary
                    title="Xem thêm"
                    styles="!px-20 !w-72 "
                    onClick={() => {
                      setLengthDataCompanyList((prev) =>
                        prev + 5 > dataCompanyList.length
                          ? dataCompanyList.length
                          : prev + 5
                      );
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* content-right */}
          <div className="flex flex-col gap-5 w-4/12 py-12">
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

            {isLoadingDataCompanies
              ? Array.from({ length: 1 }).map((item, idx) => (
                  <CardCompanySkeleton key={idx} />
                ))
              : dataCompanyList && (
                  <CartCompanySquare
                    id={dataCompanyList[0]?._id}
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
      </section>
      <Footer />
    </main>
  );
};

export default FindJobs;
