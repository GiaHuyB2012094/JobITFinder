import { Link, useParams } from "react-router-dom";
import {
  Button,
  CartCompanySquare,
  CartJobPost,
  Footer,
  Image,
  InputControl,
  Nav,
} from "../components";
import { topCompanyDataList } from "../constants";
import { useEffect, useMemo, useState } from "react";
import { useGetCompanyListQuery } from "../slices/usersApiSlice";
import {
  CardCompanySkeleton,
  CardHorizontalSkeleton,
  ResultSearchListHaveAvatar,
} from "../components/Shared/Skeleton";
import { useGetPostsQuery } from "../slices/postApiSlice";
import {
  getDayToTime,
  handleTextSearch,
  isEmpty,
} from "../constants/convertData";

const TopCompaniesDetail = () => {
  //   const {} = data;
  const [isActive, setIsActive] = useState(false); //false => companies , true => jobs
  const [dataJobFiltered, setDataJobFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // filter radio
  const [optionsFilter, setOptionsFilter] = useState("all");

  const { data: dataCompanies, isLoading: isLoadingDataCompanies } =
    useGetCompanyListQuery();

  const { data: dataJobs, isLoading: isLoadingJobs } = useGetPostsQuery();

  const { name } = useParams();

  const data = useMemo(
    () =>
      topCompanyDataList.find((topCompanyItem) => topCompanyItem.name === name),
    [name]
  );

  const dataCompaniesList = useMemo(
    () =>
      dataCompanies?.filter((companyItem) => {
        let industries = companyItem.industryCompany;
        return industries.includes(name);
      }),

    [name, dataCompanies]
  );

  const dataJobsOfCompanies = useMemo(
    () =>
      dataJobs?.filter((job) =>
        dataCompaniesList?.some((company) => company._id === job.company)
      ),
    [dataJobs, dataCompaniesList]
  );

  // search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    let val = handleTextSearch(e.target.value);

    if (!isEmpty(e.target.value)) {
      const arrTemp = dataCompaniesList.filter(
        (company) =>
          company.nameCompany &&
          company.nameCompany.toLowerCase().includes(val.toLowerCase())
      );

      const result = arrTemp?.map((arr) => ({
        name: arr.nameCompany,
        path: `/company-item/${arr._id}/${arr.nameCompany}`,
      }));
      setSearchResult(result);
    }
  };
  // options filter
  useEffect(() => {
    setDataJobFiltered(dataJobsOfCompanies);
  }, [dataJobsOfCompanies]);

  const onOptionChange = (e) => {
    setOptionsFilter(e.target.value);

    const tbSalary = (a, b) => (a + b) / 2;
    const arrTemp = [...dataJobsOfCompanies];

    const nowDate = new Date();
    switch (e.target.value) {
      case "deadline":
        setDataJobFiltered(
          arrTemp.sort(
            (a, b) =>
              getDayToTime(nowDate, a.deadline) -
              getDayToTime(nowDate, b.deadline)
          )
        );
        break;
      case "salary":
        setDataJobFiltered(
          arrTemp.sort(
            (a, b) =>
              tbSalary(b.minSalary, b.maxSalary) -
              tbSalary(a.minSalary, a.maxSalary)
          )
        );
        break;
      case "urgentRecruitment":
        setDataJobFiltered(
          arrTemp.filter(
            (job) =>
              getDayToTime(nowDate, job.deadline) <= 30 &&
              getDayToTime(nowDate, job.deadline) > 0
          )
        );
        break;
      default:
        console.log("jsjkjnadsjn");
        setDataJobFiltered(dataJobsOfCompanies);
        break;
    }
  };

  const myStyle = {
    backgroundImage: `url("${data?.urlBg}")`,
    backgroundSize: "cover",
  };

  return (
    <div className="">
      <Nav />
      <main className="w-full min-h-screen bg-[#F0F2F5] flex flex-col py-16 gap-7">
        {/* header */}
        <div>
          <div
            className="relative flex-center flex-col px-36 justify-center gap-5 min-h-52 text-white"
            style={myStyle}
          >
            <p className="text-3xl uppercase  font-bold">{data?.title}</p>

            <p className="">
              Nơi bạn sẽ được trải nghiệm, thử thách bản thân tại những
              <span className="uppercase mx-1">{data?.title}</span>
            </p>

            <div className="flex-center gap-3 text-sm">
              <button
                className={`w-52 h-12 rounded-full  font-medium ${
                  isActive
                    ? "border-white bg-transparent !border-2 !text-white"
                    : "text-sky-950  bg-white"
                }`}
                onClick={() => setIsActive(false)}
              >
                Danh sách công ty
              </button>

              <button
                className={`w-52 h-12 rounded-full font-medium ${
                  !isActive
                    ? "!border-white  !border-2 !text-white"
                    : "text-sky-950 !bg-white"
                }`}
                onClick={() => setIsActive(true)}
              >
                Danh sách việc làm
              </button>
            </div>
            {/*  */}
          </div>
          {!isActive ? (
            <div className="bg-white py-6 flex-center">
              <div className="z-10 w-2/3 gap-3 flex-center py-4 px-4 rounded-md shadow-md border">
                <div className="w-full relative">
                  <InputControl
                    type="text"
                    placeholder={`Nhập tên của công ty ${data?.title}`}
                    value={search}
                    onChange={(e) => handleSearch(e)}
                  />
                  {!isEmpty(search) && (
                    <div className="absolute z-10 w-full  bg-white shadow-md ml-2">
                      <ResultSearchListHaveAvatar results={searchResult} />
                    </div>
                  )}
                </div>

                <Button medium title="Tìm kiếm" styles="w-52 h-10" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {!isActive ? (
          <div className="flex items-center gap-10 flex-wrap py-5  px-36 ">
            {isLoadingDataCompanies
              ? Array.from({ length: 6 }).map((item, idx) => (
                  <CardCompanySkeleton key={idx} />
                ))
              : dataCompaniesList?.map((companyI, idx) => (
                  <CartCompanySquare
                    key={idx}
                    id={companyI._id}
                    avatar={companyI.avatar}
                    name={companyI.nameCompany || ""}
                    coverImg={companyI.coverImg}
                    industry={companyI.industryCompany}
                    address={companyI.address}
                    nationality={companyI.nationality}
                  />
                ))}
          </div>
        ) : (
          <div className="space-y-4 mx-36">
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
                    Tất cả việc làm
                  </p>
                </Link>
                <p className="mx-1 font-bold"> &#62;</p>
                <Link to="/">
                  <p className="text-base cursor-pointer font-medium text-indigo-500 hover:text-indigo-700 capitalize">
                    Việc làm {data?.title}
                  </p>
                </Link>
              </div>
            </div>

            <div className="bg-white space-y-4 rounded px-4 py-6">
              <div className="pb-3 border-b">
                <p>
                  Tìm thấy{" "}
                  <span className="font-medium text-indigo-500">
                    {dataJobsOfCompanies?.length}
                  </span>{" "}
                  công việc phù hợp với bạn
                </p>
              </div>

              <div className="flex items-center gap-x-10 py-3 border-b">
                <p className="font-medium ">Ưu tiên hiển thị :</p>
                <form className="flex items-center gap-x-10">
                  <div className="flex-center ">
                    <InputControl
                      type="radio"
                      name="optionsFilter"
                      id="all"
                      value="all"
                      checked={optionsFilter === "all"}
                      onChange={onOptionChange}
                    />
                    <label htmlFor="all" className="text-nowrap">
                      Tất cả
                    </label>
                  </div>

                  <div className="flex-center ">
                    <InputControl
                      type="radio"
                      name="optionsFilter"
                      id="deadline"
                      value="deadline"
                      checked={optionsFilter === "deadline"}
                      onChange={onOptionChange}
                    />
                    <label htmlFor="deadline" className="text-nowrap">
                      Hạn nộp hồ sơ
                    </label>
                  </div>

                  <div className="flex-center">
                    <InputControl
                      type="radio"
                      name="optionsFilter"
                      id="urgentRecruitment"
                      value="urgentRecruitment"
                      checked={optionsFilter === "urgentRecruitment"}
                      onChange={onOptionChange}
                    />
                    <label htmlFor="urgentRecruitment" className="text-nowrap">
                      Cần tuyển gấp
                    </label>
                  </div>

                  <div className="flex-center">
                    <InputControl
                      type="radio"
                      name="optionsFilter"
                      id="salary"
                      value="salary"
                      checked={optionsFilter === "salary"}
                      onChange={onOptionChange}
                    />
                    <label htmlFor="salary" className="text-nowrap">
                      lương cao đến thấp
                    </label>
                  </div>
                </form>
              </div>

              <div className="flex gap-x-5">
                <div className="w-4/5 space-y-5">
                  {isLoadingJobs
                    ? Array.from({ length: 4 }).map((item, idx) => (
                        <CardHorizontalSkeleton key={idx} />
                      ))
                    : dataJobFiltered?.map((data, idx) => (
                        <div key={idx}>
                          <CartJobPost post={data} />
                        </div>
                      ))}
                </div>
                <div className="w-1/5 ">
                  <Image
                    src="https://i.pinimg.com/564x/c3/85/b2/c385b2b996a2340c34e31e7226929d3f.jpg"
                    alt="poster-jobs"
                    className="h-80 w-80"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TopCompaniesDetail;
