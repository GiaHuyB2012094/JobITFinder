import { Select, Tag } from "antd";
import {
  Button,
  CartCompanySquare,
  CartGroup,
  CartJobPost,
  Footer,
  InputControl,
  Nav,
} from "../components";
import {
  contracts,
  fastSearch,
  levelList,
  locations,
  suggestTags,
  typeJobs,
} from "../constants";
import { useEffect, useMemo, useState } from "react";
import { FaFilterCircleXmark } from "react-icons/fa6";
// import bgSearch from "../assets/5372072-removebg.png";
import {
  CardCompanySkeleton,
  CardGroupSkeleton,
  CardHorizontalSkeleton,
} from "../components/Shared/Skeleton";
import { useGetPostsQuery } from "../slices/postApiSlice";
import { useGetCompanyListQuery } from "../slices/usersApiSlice";
import { useParams } from "react-router-dom";
import {
  convertData,
  handleTextSearch,
  isEmpty,
  splitLocation,
} from "../constants/convertData";
import bgDataEmpty from "../assets/emptyData.jpg";
import { useGetSkillsQuery } from "../slices/skillOfCompanyApiSlice";
import ResultSearchList from "../components/Shared/ResultSearchJob/ResultSearchList";
import { useSelector } from "react-redux";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={"blue"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      value={value}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const Search = (props) => {
  const [level, setLevel] = useState();
  const [contract, setContract] = useState();
  const [location, setLocation] = useState();
  const [typejob, setTypeJob] = useState();
  const [skills, setSkills] = useState();

  const [charSearchInput, setCharSearchInput] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { data: dataSkills } = useGetSkillsQuery();

  const { keySearch } = useParams();

  const { data: dataJobsPost, isLoading: isLoadingDataJobPost } =
    useGetPostsQuery();

  const { searchResult: homeKeySearch } = useSelector((state) => state.search);

  const dataKeySearch = useMemo(() => {
    if (contracts.find((contract) => contract.value === keySearch))
      return ["contracts", convertData(contracts, keySearch)];

    if (levelList.find((level) => level.value === keySearch))
      return ["levelList", convertData(levelList, keySearch)];

    if (locations.find((location) => location.value === keySearch))
      return ["locations", convertData(locations, keySearch)];

    if (typeJobs.find((typeJob) => typeJob.value === keySearch))
      return ["typeJobs", convertData(typeJobs, keySearch)];

    if (suggestTags.find((suggest) => suggest.value === keySearch))
      return ["skills", convertData(suggestTags, keySearch)];

    if (fastSearch.find((skill) => skill.value === keySearch))
      return ["fastSearch", convertData(fastSearch, keySearch)];
  }, [keySearch]);

  const handleDeleteFilter = () => {
    setLevel([]);
    setContract([]);
    setLocation([]);
    setTypeJob([]);
    setSkills([]);
    setResultSearch([]);
    setCharSearchInput("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);

    let val = handleTextSearch(e.target.value);

    if (!isEmpty(e.target.value)) {
      const arrTemp = dataJobsPost.filter(
        (post) =>
          post.name && post.name.toLowerCase().includes(val.toLowerCase())
      );

      const result = arrTemp?.map((arr) => ({
        name: arr.name,
        id: arr._id,
        company: arr.company,
      }));

      setSearchResult(result);

      props.search(arrTemp);
    } else props.search([]);
  };

  useEffect(() => {
    console.log(homeKeySearch);
    if (Object.keys(homeKeySearch).length > 0) {
      setContract(homeKeySearch?.contract);
      setTypeJob(homeKeySearch?.typejob);
      setLocation(homeKeySearch?.location);
      setLevel(homeKeySearch?.level);
      setSkills(homeKeySearch?.searchInput);
    }
  }, [homeKeySearch]);

  useEffect(() => {
    let result = "";

    if (
      level?.length > 0 ||
      contract?.length > 0 ||
      location?.length > 0 ||
      typejob?.length > 0 ||
      skills?.length > 0
    ) {
      result = Object.assign(
        {},
        {
          level,
          contract,
          location,
          typejob,
          skills,
        }
      );
    }

    props.filteredResult(result);
  }, [level, contract, location, typejob, skills]);

  return (
    <div className="space-y-5 z-10 px-48 bg-gradient-to-r from-indigo-300 via-indigo-100 to-sky-300 from-10% via-50% to-100% py-8">
      <div className="font-bold text-xl flex items-center gap-x-4">
        <h2>Tìm kiếm</h2>
        {dataKeySearch ? (
          <h2 className="p-3 bg-indigo-500 text-white !text-lg capitalize">
            {dataKeySearch[1]}
          </h2>
        ) : (
          <div className="font-normal flex gap-x-2">
            {homeKeySearch?.searchInput?.map((skill, idx) => (
              <h2
                key={idx}
                className="p-3 bg-indigo-500 text-white !text-lg capitalize"
              >
                {skill}
              </h2>
            ))}
          </div>
        )}
      </div>

      <div></div>

      <div className="">
        <div className="flex-center gap-3 mx-auto bg-white py-4 px-4 rounded-md shadow-md z-10">
          <div className="w-full relative">
            <InputControl
              type="text"
              placeholder="Nhập tên của công việc"
              value={search}
              onChange={(e) => handleSearch(e)}
            />

            {!isEmpty(search) && (
              <div className="absolute z-10 w-full bg-white shadow-md ml-2">
                <ResultSearchList results={searchResult} />
              </div>
            )}
          </div>
          <Button medium title="Tìm kiếm" styles="w-52 h-10" />
        </div>

        <div className="flex-center gap-3 my-2">
          <div className="w-full">
            <p className="text-base font-medium ">Địa điểm</p>
            <Select
              placeholder="Tất cả địa điểm"
              mode="multiple"
              tagRender={tagRender}
              value={location}
              maxTagCount="responsive"
              onChange={(newVal) => {
                setLocation(newVal);
              }}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "6px",
              }}
              options={locations?.map((location) => ({
                value: location.value,
                label: location.label,
              }))}
            />
          </div>

          <div className="w-full">
            <p className="text-base font-medium ">Cấp bậc</p>
            <Select
              placeholder="Tất cả các bậc"
              mode="multiple"
              tagRender={tagRender}
              value={level}
              maxTagCount="responsive"
              onChange={(newVal) => {
                setLevel(newVal);
              }}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "6px",
              }}
              options={levelList?.map((items) => ({
                value: items.value,
                label: items.label,
              }))}
            />
          </div>
          <div className="w-full">
            <p className="text-base font-medium ">Công việc</p>
            <Select
              placeholder="Tất cả loại công việc"
              mode="multiple"
              tagRender={tagRender}
              value={typejob}
              maxTagCount="responsive"
              onChange={(newVal) => {
                setTypeJob(newVal);
              }}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "6px",
              }}
              options={typeJobs?.map((typejob) => ({
                value: typejob.value,
                label: typejob.label,
              }))}
            />
          </div>
          <div className="w-full">
            <p className="text-base  font-medium ">Hợp đồng</p>
            <Select
              placeholder="Tất cả hợp đồng"
              mode="multiple"
              tagRender={tagRender}
              maxTagCount="responsive"
              value={contract}
              onChange={(newVal) => {
                setContract(newVal);
              }}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "6px",
              }}
              options={contracts?.map((contract) => ({
                value: contract.value,
                label: contract.label,
              }))}
            />
          </div>
          <Button
            onClick={handleDeleteFilter}
            title="Xóa"
            styles="mt-6"
            color="bg-red-500 z-10"
            iconLeft={<FaFilterCircleXmark />}
          />
        </div>
      </div>
    </div>
  );
};

const Container = (props) => {
  const { keySearch } = useParams();

  const { data: dataJobsPost, isLoading: isLoadingDataJobPost } =
    useGetPostsQuery();
  const { data: dataCompanyList, isLoading: isLoadingDataCompanies } =
    useGetCompanyListQuery();

  const [lengthDataJobsPost, setLengthDataJobsPost] = useState(5);

  const dataKeySearch = useMemo(() => {
    if (contracts.find((contract) => contract.value === keySearch))
      return ["contracts", convertData(contracts, keySearch)];

    if (levelList.find((level) => level.value === keySearch))
      return ["levelList", convertData(levelList, keySearch)];

    if (locations.find((location) => location.value === keySearch))
      return ["locations", convertData(locations, keySearch)];

    if (typeJobs.find((typeJob) => typeJob.value === keySearch))
      return ["typeJobs", convertData(typeJobs, keySearch)];

    if (suggestTags.find((suggest) => suggest.value === keySearch))
      return ["skills", convertData(suggestTags, keySearch)];

    if (fastSearch.find((skill) => skill.value === keySearch))
      return ["fastSearch", convertData(fastSearch, keySearch)];
    return keySearch;
  }, [keySearch]);

  const [dataJobFiltered, setDataJobFiltered] = useState(
    dataJobsPost ? dataJobsPost : []
  );

  useEffect(() => {
    if (!!props.filteredResult === true) {
      let filteredSearch = props.filteredResult;

      let dataJobsTemp = dataJobsPost;

      // level
      for (let i = 0; i < filteredSearch?.level?.length; i++) {
        dataJobsTemp = dataJobsTemp?.filter((job) =>
          job.level.some((levelTemp) => levelTemp === filteredSearch?.level[i])
        );
      }
      // contract
      for (let i = 0; i < filteredSearch?.contract?.length; i++) {
        dataJobsTemp = dataJobsTemp?.filter((job) =>
          job.contract.some(
            (contractTemp) => contractTemp === filteredSearch?.contract[i]
          )
        );
      }
      // type job
      for (let i = 0; i < filteredSearch?.typejob?.length; i++) {
        dataJobsTemp = dataJobsTemp?.filter((job) =>
          job.typeJob.some(
            (typeJobTemp) => typeJobTemp === filteredSearch?.typejob[i]
          )
        );
      }

      // skills
      for (let i = 0; i < filteredSearch?.skills?.length; i++) {
        dataJobsTemp = dataJobsTemp?.filter((job) =>
          job.skills.some((skill) => skill === filteredSearch?.skills[i])
        );
      }

      // location
      if (
        !filteredSearch?.location?.some(
          (locationT) => locationT === "allLocations"
        )
      ) {
        for (let i = 0; i < filteredSearch?.location?.length; i++) {
          dataJobsTemp = dataJobsTemp?.filter((job) =>
            job.locations.some(
              (locationTemp) =>
                splitLocation(locationTemp) === filteredSearch?.location[i]
            )
          );
        }
      }

      setDataJobFiltered(dataJobsTemp);
    } else if (props.searchResult?.length > 0) {
      setDataJobFiltered(props.searchResult);
    } else if (dataKeySearch) {
      if (dataKeySearch[0] === "contracts")
        setDataJobFiltered(
          dataJobsPost?.filter((job) =>
            job.contract.some((contractI) => contractI === keySearch)
          )
        );

      if (dataKeySearch[0] === "levelList")
        setDataJobFiltered(
          dataJobsPost?.filter((job) =>
            job.level.some((levelI) => levelI === keySearch)
          )
        );

      if (dataKeySearch[0] === "locations")
        if (keySearch === "allLocations") {
          setDataJobFiltered(dataJobsPost);
        } else {
          setDataJobFiltered(
            dataJobsPost?.filter((job) =>
              job.locations?.some((location) => {
                return splitLocation(location) === keySearch;
              })
            )
          );
        }

      if (dataKeySearch[0] === "typeJobs")
        setDataJobFiltered(
          dataJobsPost?.filter((job) =>
            job.typeJob.some((typeJobI) => typeJobI === keySearch)
          )
        );

      if (dataKeySearch[0] === "skills" || dataKeySearch[0] === "fastSearch")
        setDataJobFiltered(
          dataJobsPost?.filter((job) =>
            job.skills.some((skill) => skill === keySearch)
          )
        );
    }
  }, [
    dataKeySearch,
    dataJobsPost,
    keySearch,
    props.searchResult,
    props.filteredResult,
  ]);

  const TitleSearch = () => {
    const TitleSearchSub = () => {
      return (
        <>
          {dataKeySearch[0] === "contracts" && (
            <h2 className="font-medium">
              Hiện có
              <span className=" mx-1 text-orange-500 text-xl">
                {dataJobFiltered?.length}
              </span>
              việc làm
              <span className="font-normal mx-1">- Hợp đồng công việc :</span>
            </h2>
          )}

          {dataKeySearch[0] === "levelList" && (
            <h2 className="font-medium">
              Hiện có
              <span className=" mx-1 text-orange-500 text-xl">
                {dataJobFiltered?.length}
              </span>
              việc làm
              <span className="font-normal mx-1">- Cấp bậc :</span>
            </h2>
          )}

          {dataKeySearch[0] === "locations" && (
            <h2 className="font-medium">
              Hiện có
              <span className=" mx-1 text-orange-500 text-xl">
                {dataJobFiltered?.length}
              </span>
              việc làm ở :
            </h2>
          )}

          {dataKeySearch[0] === "typeJobs" && (
            <h2 className="font-medium">
              Hiện có
              <span className=" mx-1 text-orange-500 text-xl">
                {dataJobFiltered?.length}
              </span>
              việc làm
              <span className="font-normal mx-1">- Loại công việc :</span>
            </h2>
          )}

          {(dataKeySearch[0] === "skills" ||
            dataKeySearch[0] === "fastSearch") && (
            <h2 className="font-medium">
              Hiện có
              <span className=" mx-1 text-orange-500 text-xl">
                {dataJobFiltered?.length}
              </span>
              việc làm
              <span className="font-normal mx-1">- Kỹ năng :</span>
            </h2>
          )}
        </>
      );
    };
    return (
      <div className="flex gap-x-3 items-center">
        {dataKeySearch ? (
          <>
            <TitleSearchSub />
            <h2 className="px-3 py-2   font-medium border-2 border-dashed border-indigo-200 bg-indigo-50 rounded">
              {dataKeySearch && dataKeySearch[1]}
            </h2>
          </>
        ) : (
          <h2 className="text-lg font-medium text-indigo-500">
            Các việc làm :
          </h2>
        )}
      </div>
    );
  };
  console.log(dataJobFiltered);
  return (
    <div className="min-h-screen bg-[#F0F2F5] drop-shadow px-48 py-4 flex gap-5 ">
      {/* left */}
      <div className="space-y-5">
        <div className="flex gap-x-3 items-center">
          <TitleSearch />
        </div>
        {/* card jobs */}
        <div className="space-y-5">
          {isLoadingDataJobPost ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <CardHorizontalSkeleton key={idx} />
            ))
          ) : dataJobFiltered?.length > 0 ? (
            dataJobFiltered.slice(0, lengthDataJobsPost).map((data, idx) => (
              <div key={idx}>
                <CartJobPost post={data} />
              </div>
            ))
          ) : (
            <div className="w-[700px] flex justify-center">
              <img src={bgDataEmpty} alt="bg-empty" className="w-96" />
            </div>
          )}

          {dataJobFiltered?.length > 5 && (
            <div className="mx-auto">
              <Button
                medium
                roundPrimary
                title="Xem thêm"
                styles="!px-20 !w-72 "
                onClick={() => {
                  setLengthDataJobsPost((prev) =>
                    prev + 5 > dataJobFiltered.length
                      ? dataJobFiltered.length
                      : prev + 5
                  );
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col gap-5">
        {isLoadingDataJobPost ? (
          Array.from({ length: 1 }).map((item, idx) => (
            <CardGroupSkeleton key={idx} />
          ))
        ) : (
          <CartGroup posts={dataJobsPost} titleCartGroup="Việc làm nổi bật" />
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
  );
};

const SeekingJobs = () => {
  const [searchResult, setSearchResult] = useState();
  const [filteredResult, setFilteredResult] = useState();

  return (
    <div className="">
      <Nav />
      <main className="relative min-h-72 pt-16">
        <Search
          search={(data) => setSearchResult(data)}
          filteredResult={(data) => setFilteredResult(data)}
        />
        <Container
          searchResult={searchResult}
          filteredResult={filteredResult}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SeekingJobs;
