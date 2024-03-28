import { useMemo, useRef, useState } from "react";
import {
  Button,
  CartCompanySquare,
  Footer,
  InputControl,
  Nav,
} from "../components";
import { locations } from "../constants";
import { Carousel, Select } from "antd";
import { searchCompanyOptions } from "../constants";
import { useGetCompanyListQuery } from "../slices/usersApiSlice";
import {
  CardCompanySkeleton,
  CardGroupSkeleton,
  ResultSearchListHaveAvatar,
} from "../components/Shared/Skeleton";
import { handleTextSearch, isEmpty } from "../constants/convertData";
import Slider from "react-slick";
import { useGetPostsQuery } from "../slices/postApiSlice";

const CompanyIT = () => {
  const [location, setLocation] = useState();
  const [activeIdxOption, setActiveIdxOption] = useState(0);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { data: dataCompanyList, isLoading: isLoadingDataJobPost } =
    useGetCompanyListQuery();
  const { data: dataJobs } = useGetPostsQuery();

  const dataTopCompaniesFilter = useMemo(
    () =>
      dataCompanyList?.filter((companyItem) => {
        let industries = companyItem.industryCompany;
        return industries.includes("software");
      }),

    [dataCompanyList]
  );
  const refEl1 = useRef(null);
  const refEl2 = useRef(null);
  const refEl3 = useRef(null);
  const refEl4 = useRef(null);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const dataCompaniesHaveJobs = useMemo(() => {
    const result = dataCompanyList?.filter((comp) =>
      dataJobs.some((job) => job.company === comp._id)
    );
    return result;
  }, [dataCompanyList, dataJobs]);

  const dataCompaniesHaveSaved = useMemo(() => {
    const result = dataCompanyList?.filter((comp) => comp.saved > 0);

    return result?.sort((a, b) => b.saved > a.saved);
  }, [dataCompanyList]);

  const handleClickOption = (idx) => {
    setActiveIdxOption(idx);
    if (idx === 0) {
      refEl1.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (idx === 1) {
      refEl2.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (idx === 2) {
      refEl3.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (idx === 3) {
      refEl4.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    let val = handleTextSearch(e.target.value);

    if (!isEmpty(e.target.value)) {
      const arrTemp = dataCompanyList.filter(
        (company) =>
          company.nameCompany &&
          company.nameCompany.toLowerCase().includes(val.toLowerCase())
      );

      const result = arrTemp?.map((arr) => ({
        name: arr.nameCompany,
        path: `/company-item/${arr._id}/${arr.nameCompany}`,
        imgI: arr.avatar,
      }));

      setSearchResult(result);
    }
  };
  return (
    <div>
      <Nav />
      <main className="w-full min-h-screen bg-slate-100 flex flex-col  py-16 gap-7">
        <div className="flex flex-col gap-7 bg-gray-100 w-full px-16 py-12 shadow-sm">
          <div className="w-10/12 flex-center gap-3 mx-auto bg-white py-4 px-4 rounded-md shadow-md">
            <div className="relative w-full">
              <InputControl
                type="text"
                placeholder="Nhập tên của công ty"
                value={search}
                onChange={(e) => handleSearch(e)}
              />
              {!isEmpty(search) && (
                <div className="absolute z-10 w-full bg-white shadow-md ml-2">
                  <ResultSearchListHaveAvatar results={searchResult} />
                </div>
              )}
            </div>
            <Select
              placeholder="Tất cả địa điểm"
              value={location}
              style={{
                width: "100%",
                height: "41px",
                marginTop: "2px",
                border: "1px solid gray",
                borderRadius: "6px",
              }}
              onChange={(newVal) => {
                setLocation(newVal);
              }}
              options={locations?.map((location) => ({
                value: location.value,
                label: location.label,
              }))}
            />
            <Button medium title="Tìm kiếm" styles="w-52 h-10" />
          </div>
          <div className="w-10/12 flex-center mx-auto rounded-md shadow-md">
            {searchCompanyOptions?.map((item, idx) => (
              <div
                key={idx}
                className={`w-full h-10  font-medium text-gray-500 cursor-pointer border-2 border-solid border-indigo-500 px-3 py-7 flex-center shadow-md 
                                ${
                                  activeIdxOption === idx
                                    ? `bg-indigo-500 text-white`
                                    : ``
                                }
                                `}
              >
                <p
                  onClick={() => {
                    handleClickOption(idx);
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-16 space-y-5">
          <div ref={refEl1}>
            <div className="w-10/12 flex flex-col mx-auto  gap-5">
              <p className="text-xl font-medium text-indigo-500">
                {searchCompanyOptions[0]}
              </p>
              <div className="slider-container">
                <Slider {...settings}>
                  {!isLoadingDataJobPost
                    ? dataCompanyList &&
                      dataTopCompaniesFilter?.map((item, idx) => (
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
          </div>

          <div ref={refEl2} className="w-10/12 flex flex-col mx-auto  gap-5">
            <p className="text-xl font-medium text-indigo-500">
              {searchCompanyOptions[1]}
            </p>
            <div className="slider-container">
              <Slider {...settings}>
                {!isLoadingDataJobPost
                  ? dataCompanyList &&
                    dataCompanyList
                      ?.slice(0, 6)
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

          <div ref={refEl3} className="w-10/12 flex flex-col mx-auto  gap-5">
            <p className="text-xl font-medium text-indigo-500">
              {searchCompanyOptions[2]}
            </p>
            <div className="slider-container">
              <Slider {...settings}>
                {!isLoadingDataJobPost
                  ? dataCompanyList &&
                    dataCompaniesHaveJobs?.map((item, idx) => (
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

          <div ref={refEl4} className="w-10/12 flex flex-col mx-auto  gap-5">
            <p className="text-xl font-medium text-indigo-500">
              {searchCompanyOptions[3]}
            </p>
            <div className="slider-container">
              <Slider {...settings}>
                {!isLoadingDataJobPost
                  ? dataCompanyList &&
                    dataCompaniesHaveSaved?.map((item, idx) => (
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyIT;
