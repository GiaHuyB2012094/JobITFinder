import { useRef, useState } from "react";
import { Button, CartCompanySquare, Footer, InputControl, Nav } from "../components"
import { locations } from "../constants";
import { Carousel, Select,  } from "antd";
import { searchCompanyOptions } from "../constants";
import { useGetCompanyListQuery } from "../slices/usersApiSlice";
const CompanyIT = () => {
    const [location, setLocation] = useState();
    const [activeIdxOption, setActiveIdxOption] = useState(0);
    const { data: dataCompanyList } = useGetCompanyListQuery();
    
    const refEl1 = useRef(null)
    const refEl2 = useRef(null)
    const refEl3 = useRef(null)
    const refEl4 = useRef(null)
    
    const handleClickOption = (idx) => {
        setActiveIdxOption(idx)
        if (idx === 0) {
            refEl1.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (idx === 1) {
            refEl2.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (idx === 2) {
            refEl3.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (idx === 3) {
            refEl4.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }
    console.log(location);
  return (
    <>
        <Nav/>
        <main className="w-full min-h-screen bg-slate-100 flex flex-col  py-16 gap-7">
            <div className="flex flex-col gap-7 bg-gray-100 w-full px-16 py-12 shadow-sm">
                <div className="w-10/12 flex-center gap-3 mx-auto bg-white py-4 px-4 rounded-md shadow-md">
                    <InputControl
                        type="text"
                        placeholder="Nhập tên của công ty" 
                    />
                    <Select
                        placeholder="Tất cả địa điểm"
                        value={location}
                        style={{ width: '100%',height: "41px",marginTop:"2px",  border: "1px solid gray", borderRadius: "6px" }}
                        onChange={ newVal => { setLocation(newVal)}}
                        options={locations?.map((location) => ({value: location.value, label: location.label}))}
    
                        />
                    <Button
                        medium
                        title="Tìm kiếm"
                        styles="w-52 h-10"
                    />
                </div>
                <div className="w-10/12 flex-center mx-auto rounded-md shadow-md">
                    {searchCompanyOptions?.map((item, idx) => (
                        <div 
                            key={idx} 
                            className={`w-full h-10  font-medium text-gray-500 cursor-pointer border-2 border-solid border-indigo-500 px-3 py-7 flex-center shadow-md 
                                ${activeIdxOption === idx ? `bg-indigo-500 text-white` : ``}
                                `}>
                            <p onClick={()=>{handleClickOption(idx)}}>
                                {item}
                            </p>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className="px-16">
                <div ref={refEl1} className="w-10/12 flex flex-col mx-auto  gap-5">
                    <p className="text-xl font-medium text-indigo-500">{searchCompanyOptions[0]}</p>
                    <Carousel
                        autoplay
                    >
                        <div className="flex items-center gap-6 w-full mx-auto">
                            {dataCompanyList &&
                                dataCompanyList?.slice(0,3)?.map((item, idx) => (
                                    <CartCompanySquare 
                                        key={idx}
                                        avatar={item?.avatar}
                                        name={item?.nameCompany || ""}
                                        coverImg={item?.coverImg}
                                        industry={item?.industryCompany}
                                        address={item?.address}
                                        nationality={item?.nationality}
                                    />
                                ))
                            }
                        </div>
                        <div className="flex items-center gap-6 w-full mx-auto">
                            {dataCompanyList &&
                                dataCompanyList?.slice(4,7)?.map((item, idx) => (
                                    <CartCompanySquare 
                                        key={idx}
                                        avatar={item?.avatar}
                                        name={item?.nameCompany || ""}
                                        coverImg={item?.coverImg}
                                        industry={item?.industryCompany}
                                        address={item?.address}
                                        nationality={item?.nationality}
                                    />
                                ))
                            }
                        </div>
                    </Carousel>
                </div>
                <div ref={refEl2} className="w-10/12 flex flex-col mx-auto  gap-5">
                    <p className="text-xl font-medium text-indigo-500">{searchCompanyOptions[1]}</p>
                    <Carousel
                        autoplay
                        
                    >
                        <div className="flex items-center gap-6 w-full mx-auto">
                            {dataCompanyList &&
                                dataCompanyList?.slice(0,3)?.map((item, idx) => (
                                    <CartCompanySquare 
                                        key={idx}
                                        avatar={item?.avatar}
                                        name={item?.nameCompany || ""}
                                        coverImg={item?.coverImg}
                                        industry={item?.industryCompany}
                                        address={item?.address}
                                        nationality={item?.nationality}
                                    />
                                ))
                            }
                        </div>
                        <div className="flex items-center gap-6 w-full mx-auto">
                            {dataCompanyList &&
                                dataCompanyList?.slice(4,7)?.map((item, idx) => (
                                    <CartCompanySquare 
                                        key={idx}
                                        avatar={item?.avatar}
                                        name={item?.nameCompany || ""}
                                        coverImg={item?.coverImg}
                                        industry={item?.industryCompany}
                                        address={item?.address}
                                        nationality={item?.nationality}
                                    />
                                ))
                            }
                        </div>
                    </Carousel>
                </div>
                <div ref={refEl3} className="w-10/12 flex flex-col mx-auto  gap-5">
                    <p className="text-xl font-medium text-indigo-500">{searchCompanyOptions[2]}</p>
                    <Carousel
                        autoplay
                        
                    >
                        <div className="flex items-center gap-6 w-full mx-auto">
                            {dataCompanyList &&
                                dataCompanyList?.slice(0,3)?.map((item, idx) => (
                                    <CartCompanySquare 
                                        key={idx}
                                        avatar={item?.avatar}
                                        name={item?.nameCompany || ""}
                                        coverImg={item?.coverImg}
                                        industry={item?.industryCompany}
                                        address={item?.address}
                                        nationality={item?.nationality}
                                    />
                                ))
                            }
                        </div>
                        <div className="flex items-center gap-6 w-full mx-auto">
                            {dataCompanyList &&
                                dataCompanyList?.slice(4,7)?.map((item, idx) => (
                                    <CartCompanySquare 
                                        key={idx}
                                        avatar={item?.avatar}
                                        name={item?.nameCompany || ""}
                                        coverImg={item?.coverImg}
                                        industry={item?.industryCompany}
                                        address={item?.address}
                                        nationality={item?.nationality}
                                    />
                                ))
                            }
                        </div>
                    </Carousel>
                </div>
                <div ref={refEl4} className="w-10/12 flex flex-col mx-auto  gap-5">
                    <p className="text-xl font-medium text-indigo-500">{searchCompanyOptions[3]}</p>
                    <Carousel
                        autoplay
                        
                    >
                        <div className="flex items-center gap-6 w-full mx-auto">
                            {dataCompanyList &&
                                dataCompanyList?.slice(0,3)?.map((item, idx) => (
                                    <CartCompanySquare 
                                        key={idx}
                                        avatar={item?.avatar}
                                        name={item?.nameCompany || ""}
                                        coverImg={item?.coverImg}
                                        industry={item?.industryCompany}
                                        address={item?.address}
                                        nationality={item?.nationality}
                                    />
                                ))
                            }
                        </div>
                        <div className="flex items-center gap-6 w-full mx-auto">
                            {dataCompanyList &&
                                dataCompanyList?.slice(4,7)?.map((item, idx) => (
                                    <CartCompanySquare 
                                        key={idx}
                                        avatar={item?.avatar}
                                        name={item?.nameCompany || ""}
                                        coverImg={item?.coverImg}
                                        industry={item?.industryCompany}
                                        address={item?.address}
                                        nationality={item?.nationality}
                                    />
                                ))
                            }
                        </div>
                    </Carousel>
                </div>
            </div>

        </main>
        <Footer/>
    </>
  )
}

export default CompanyIT
