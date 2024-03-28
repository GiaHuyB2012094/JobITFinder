import { Button, Footer, InputControl, Nav } from "../components";

import imgHeader from "../assets/5225900-removebg.png";
import { topCompanyDataList } from "../constants";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResultSearchListHaveAvatar } from "../components/Shared/Skeleton";
import { useGetCompanyListQuery } from "../slices/usersApiSlice";
import { handleTextSearch, isEmpty } from "../constants/convertData";

const Card = ({ data }) => {
  const navigate = useNavigate();

  const handleOnClick = (url) => {
    navigate(url);
  };

  return (
    <div
      className="h-96 w-[400px] rounded-md bg-white shadow-md cursor-pointer"
      onClick={() => handleOnClick(data.path)}
    >
      <div className="h-1/2 bg-indigo-100 ">
        <img
          src={data.img}
          className="w-full h-full rounded-ee-[50%] rounded-tl-md rounded-tr-md"
        />
      </div>
      <div className="h-1/2 px-3 py-4">
        <p className="font-bold uppercase hover:underline">{data.title}</p>
        <p className="text-sm line-clamp-6">{data.content}</p>
      </div>
    </div>
  );
};

const CompanyTop = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { data: dataCompanies } = useGetCompanyListQuery();

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 9;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    let val = handleTextSearch(e.target.value);

    if (!isEmpty(e.target.value)) {
      const arrTemp = dataCompanies.filter(
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div>
      <Nav />
      <main className="w-full min-h-screen bg-[#F0F2F5] flex flex-col py-16 gap-7">
        {/* header */}
        <div className="relative flex flex-col px-36 justify-center gap-7 min-h-80  bg-gradient-to-r from-indigo-300 to-sky-400 via-indigo-50 from-10% via-50% to-100%">
          {/* <Image src={imgHeader} styles="absolute right-0 !w-6 !h-6" /> */}
          <img
            src={imgHeader}
            className="absolute w-80 h-80 right-10 bottom-0"
          />

          <p className="text-3xl text-indigo-700 font-medium">
            Khám phá 100.000+ công ty nổi bật
          </p>

          <p className="">
            Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho
            bạn
          </p>

          <div className="">
            <div className="z-10 w-2/3 gap-3 flex-center bg-white py-4 px-4 rounded-md shadow-md">
              <div className="w-full relative">
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

              <Button medium title="Tìm kiếm" styles="w-52 h-10" />
            </div>
          </div>
        </div>

        {/* body */}
        <div className="mx-auto space-y-5  px-36 ">
          <p className="text-2xl text-center font-medium uppercase">
            Danh sách các top công ty
          </p>
          <div className="flex justify-between gap-y-4 flex-wrap">
            {topCompanyDataList
              .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
              .map((item, idx) => (
                <Card key={idx} data={item} />
              ))}
          </div>
          <Pagination
            total={topCompanyDataList.length}
            pageSize={PAGE_SIZE}
            current={page}
            onChange={(page) => setPage(page)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyTop;
