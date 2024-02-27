import Button from "./Button"
import { FaFilterCircleXmark } from "react-icons/fa6";
import InputControl from "./InputControl"
import { contracts, introTag, levelList, locations, suggestTags, typeJobs } from "../constants"
import { Select, Tag } from 'antd';
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";

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

const SearchBar = () => {
  const [level,setLevel] = useState();
  const [contract,setContract] = useState();
  const [location,setLocation] = useState();
  const [typejob,setTypeJob] = useState();
  const [charSearchInput, setCharSearchInput] = useState("")
  
  // const [activeSuggest, setActiveSuggset] = useState(0);
  const [resultSearch, setResultSearch] = useState([]);


  const handleDeleteFilter = () => {
    setLevel([])
    setContract([])
    setLocation([])
    setTypeJob([])
    setResultSearch([])
    setCharSearchInput("")
  }
  const handleAddSearchKey = (val) => {
    if (!resultSearch.includes(val)) {
      setResultSearch(prev => [...prev, val])
    }  else {
      setResultSearch(prev => prev.filter(item => item !== val))
    }
  }

  const handleFilter = () => {
    const filterData = {
      level,
      contract,
      location,
      typejob,
      charSearchInput,
      resultSearch,
    }
    
  }
  // bg-[url('./src/assets/SL-113022-54210-29.jpg')]
  return (
    <main className="w-full flex-center min-h-[500px] z-20">
        <section className="flex flex-col rounded-md z-20 bg-white  bg-cover bg-center drop-shadow-2xl min-h-80 w-10/12 p-10 gap-5 mt-10 ">
            <div className="flex-between">
              <div className="">
                <p className="text-2xl w-full font-bold text-indigo-600">TÌM KIẾM</p>
                <p className="text-base w-full font-normal text-indigo-500">Việc làm IT xịn dành cho Developer chất</p>
              </div>
              <div className="flex gap-6">
                {introTag.map((item,idx) => (
                  <p key={idx} className="flex-center gap-1 rounded-full p-2 bg-indigo-500 text-xs font-medium text-white">
                    <FaCircleCheck />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-full flex-center gap-x-2">
                <InputControl
                  type="text"
                  value={charSearchInput}
                  onChange={(e)=>{setCharSearchInput(e.target.value)}}
                  placeholder="Tìm kiếm theo các Kỹ năng, Vị trí, Công ty,..."
                  className=" rounded-md p-3 w-full bg-slate-50 outline-none drop-shadow-xl"
                />

                {/* <InputTagControl/> */}
                <Button
                  title="Tìm kiếm"
                  medium
                  iconLeft={<IoSearch />}
                  onClick={handleFilter}
                  styles="w-40 mt-1 shadow-sm"
                />
            </div>
            <div className="flex gap-2 mt-2">
              <p className="text-base font-normal">Đề xuất tìm kiếm:</p>
              <div className="gap-3 flex flex-wrap w-4/5">
                  {
                    suggestTags.map((tag,idx) => (
                      <div 
                        className={`py-1 px-4 cursor-pointer font-medium text-xs rounded-full bg-indigo-200 shadow-sm 
                            hover:bg-indigo-100 hover:text-indigo-700
                            ${resultSearch.includes(tag) ? "!bg-indigo-500 text-white" : ""}`}
                        key={idx}
                        onClick={() => {handleAddSearchKey(tag)}}  
                      >
                        {tag}
                        
                      </div>
                    ))
                  }
                  
              </div>
            </div>
            <div className="">
              <div className="flex-center gap-3 my-2">
                <div className="w-full">
                  <p className="text-base font-medium text-orange-400">Địa điểm</p>
                  <Select
                    placeholder="Tất cả địa điểm"
                    mode="multiple"
                    tagRender={tagRender}
                    value={location}
                    maxTagCount='responsive'
                    onChange={ newVal => { setLocation(newVal) }}
                    style={{ width: '100%',height: "40px",  border: "1px solid orange", borderRadius: "6px" }}
                    options={locations?.map((location) => ({value: location.value, label: location.label}))}
                  />
                </div>
                
                <div className="w-full">
                  <p className="text-base font-medium text-green-600">Cấp bậc</p>
                  <Select
                    placeholder="Tất cả các bậc"
                    mode="multiple"
                    tagRender={tagRender}
                    value={level}
                    maxTagCount='responsive'
                    onChange={ newVal => { setLevel(newVal) }}
                    style={{ width: '100%',height: "40px",  border: "1px solid rgb(22 163 74)", borderRadius: "6px" }}
                    options={levelList?.map((items) => ({value: items.value, label: items.label}))}
                  />
                </div>
                <div className="w-full">
                  <p className="text-base font-medium text-violet-500">Công việc</p>
                  <Select
                    placeholder="Tất cả loại công việc"
                    mode="multiple"
                    tagRender={tagRender}
                    value={typejob}
                    maxTagCount='responsive'
                    onChange={ newVal => { setTypeJob(newVal) }}
                    style={{ width: '100%',height: "40px",  border: "1px solid rgb(139 92 246)", borderRadius: "6px" }}
                    options={typeJobs?.map((typejob) => ({value: typejob.value, label: typejob.label}))}
                  />
                </div>
                <div className="w-full">
                  <p className="text-base  font-medium text-blue-500">Hợp đồng</p>
                  <Select
                    placeholder="Tất cả hợp đồng"
                    mode="multiple"
                    tagRender={tagRender}
                    maxTagCount='responsive'
                    value={contract}
                    onChange={ newVal => { setContract(newVal) }}
                    style={{ width: '100%',height: "40px",  border: "1px solid rgb(59 130 246)", borderRadius: "6px" }}
                    options={contracts?.map((contract) => ({value: contract.value, label: contract.label}))}
                  />
                </div>
                <Button
                  onClick={handleDeleteFilter}
                  title="Xóa"
                  styles="mt-6"
                  color="bg-red-500"
                  iconLeft={(<FaFilterCircleXmark />)}
                />
              </div>

            </div>
        </section>
    </main>
  )
}

export default SearchBar
