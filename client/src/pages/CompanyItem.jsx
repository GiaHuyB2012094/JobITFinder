import { Link, useParams } from "react-router-dom"
import { Button, Image, Nav } from "../components"
import { useGetCompanyItemQuery } from "../slices/usersApiSlice";
import { FaSearchLocation } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import EmptyDataImg from '../assets/emptyData.jpg';
import { useGetPostItemWithCompanyQuery } from "../slices/postApiSlice";
import { useGetIndustryQuery } from "../slices/industryOfCompanyApiSlice";
import { convertData, quantityOfEmployee } from "../constants/convertData";
import { useGetSkillsQuery } from "../slices/skillOfCompanyApiSlice";
// flat-icon
import flatIconNationality from '../assets/Flaticons/brazil-flag.png'; 
import flatIconAutomation from '../assets/Flaticons/automation.png';
import quantityIcon from '../assets/Flaticons/teamwork.png'
import flatIconSkills from '../assets/Flaticons/online.png'
import flatIconWebsite from '../assets/Flaticons/ux.png'
import flatIconPhone from '../assets/Flaticons/post.png'

const CompanyItem = () => {
    const { id, name } = useParams();
    const { data: dataPosts } = useGetPostItemWithCompanyQuery(id);
    const { data: dataCompany} = useGetCompanyItemQuery(id);
    const { data: dataIndustry } = useGetIndustryQuery();
    const { data: dataSkills } = useGetSkillsQuery();
    console.log(dataPosts)
  return (
    <section>
        <Nav/>
        <main className="w-full min-h-screen bg-slate-100 flex flex-col  py-16 gap-7">
            <div className="flex gap-4 bg-gray-100 w-full px-16 py-5 shadow-sm ">
                {/* left */}
                <div className="w-2/3 flex flex-col gap-16">
                    <div className="w-full relative">
                        <div className="w-full h-80">
                            <Image
                                src={dataCompany?.coverImg}
                                alt="cover-image"
                                className="w-full h-full rounded-md "
                            />
                        </div>
                        <div className="absolute flex gap-8 top-[60%] left-[10%] px-4 py-3 bg-white rounded-md h-44 w-[80%]">
                            <div className="w-1/4 flex items-start h-full pt-3">
                                <Image
                                    src={dataCompany?.avatar}
                                    alt="avatarComp"
                                    className="w-full"
                                />
                            </div>
                            <div className="w-3/4 flex flex-col gap-3">
                                <p className="font-medium text-xl text-indigo-500">{dataCompany?.nameCompany}</p>
                                <p className="flex items-center gap-2">
                                    <span className="">
                                        <FaSearchLocation/>
                                    </span>
                                    {dataCompany?.address}
                                </p>
                                <p className="flex items-center gap-2 underline hover:text-indigo-500 cursor-pointer">
                                    <span className="">
                                        <IoDocumentTextSharp/>
                                    </span>
                                    1 Bài tuyển dụng
                                    {/* {dataCompany?.address} */}
                                </p>
                                <Button
                                    title="Theo dõi"
                                    iconLeft={<FaPlus/>}
                                />
                            </div>
                        </div>
                    </div>
                    {/* info  */}
                    <div className="flex flex-col gap-3 bg-white rounded-md min-h-80 w-full shadow-md py-3 px-6">
                        <p className="text-xl font-medium px-3 text-indigo-500 border-l-8 border-double border-indigo-500">Thông tin về công ty</p>
                        <p>{dataCompany?.infoOfCompany}</p>

                    </div>
                </div>
                {/* right */}
                <div className="w-1/3 flex flex-col gap-4">
                    <div className="w-full bg-white rounded-md min-h-80 max-h-[500px] py-2 px-4 overflow-y-scroll no-scrollbar shadow-md">
                        <p className="text-xl font-medium px-3 text-indigo-500 border-l-8 border-double border-indigo-500">Thông tin tuyển dụng</p>
                        {
                            ((!dataPosts) || (dataPosts?.length === 0) )
                                ? 
                                    <div className="flex-center h-full">
                                            <Image 
                                                src={EmptyDataImg}
                                                alt="empty-data"
                                                className="w-80 mx-auto"
                                            />
                                    </div>
                                : 
                                    <div className="flex flex-col gap-3 my-3">
                                        {dataPosts?.map((post, idx) => (
                                            <>
                                                <Link to={`/job-detail/${post._id}/${dataCompany?.nameCompany}`}>
                                                    <div key={idx}
                                                        className="flex w-full gap-2 border-2 border-solid border-gray-200 rounded-md p-3 
                                                            hover:border-indigo-300 cursor-pointer"
                                                    >
                                                        <div className="w-2/3">
                                                            <div className="flex flex-col gap-2">
                                                                <p className="font-medium w-[90%] truncate"> {post?.name} </p>
                                                                <div className="flex gap-2 text-sm text-gray-600">
                                                                    {post?.skills?.slice(0,3).map((skill, idx) => (
                                                                        <p key={idx} className=" bg-indigo-200 px-2 rounded-sm">{skill}</p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-1/3 flex-col gap-2">
                                                            <p className="flex justify-end">
                                                                Còn 
                                                                <span className="mx-1 font-medium text-red-600">
                                                                    30 
                                                                </span>
                                                                ngày
                                                            </p>
                                                            <p className="flex justify-end">
                                                                Số lượng
                                                                <span className="mx-1 font-medium text-green-600">
                                                                    {post?.quantity}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </>
                                        ))}
                                    </div>
                        }
                    </div>
                    {/* info general of company */}
                    <div className="w-full bg-white rounded-md min-h-80 py-2 px-4 shadow-md">
                        <p className="text-xl font-medium px-3 text-indigo-500 border-l-8 border-double border-indigo-500">Thông tin công ty</p>
                        {/* industry */}
                        <div className="flex w-full py-2 mt-3">
                            <div className="w-1/6 mt-1">
                                <Image src={flatIconAutomation} alt="industry" className="w-10"/>
                            </div>
                            <div className="w-5/6">
                                <p className="font-medium">Lĩnh vực</p>
                                <div className="flex flex-wrap gap-1 w-full">
                                    {dataCompany?.industryCompany?.map((industry, idx) => (
                                        <p key={idx} className="">{convertData(dataIndustry,industry)}{idx < dataCompany?.industryCompany?.length ? "," : ""} </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* scale */}
                        <div className="flex w-full py-2">
                            <div className="w-1/6 mt-1">
                                <Image src={quantityIcon} alt="scale" className="w-10"/>
                            </div>
                            <div className="w-5/6">
                                <p className="font-medium">Quy mô</p>
                                <div className="flex flex-wrap gap-1 w-full">
                                   <p>{quantityOfEmployee(dataCompany?.sizeCompany)}</p>
                                </div>
                            </div>
                        </div>

                        {/* nationality */}
                        <div className="flex w-full py-2">
                            <div className="w-1/6 mt-1">
                                <Image src={flatIconNationality} alt="nationality" className="w-10"/>
                            </div>
                            <div className="w-5/6">
                                <p className="font-medium">Quốc tịch công ty</p>
                                <div className="flex flex-wrap gap-1 w-full">
                                   <p>{dataCompany?.nationality}</p>
                                </div>
                            </div>
                        </div>

                        {/* skills */}
                        <div className="flex w-full py-2 mt-3">
                            <div className="w-1/6 mt-1">
                                <Image src={flatIconSkills} alt="skills" className="w-10"/>
                            </div>
                            <div className="w-5/6">
                                <p className="font-medium">Kỹ năng</p>
                                <div className="flex flex-wrap gap-2 w-full pt-1">
                                    {dataCompany?.skillOfCompany?.map((skill, idx) => (
                                        <p key={idx} className="text-sm px-2 py-1 bg-indigo-200 rounded-md text-gray-600">{convertData(dataSkills,skill)} </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* info contact of company */}
                    <div className="w-full bg-white rounded-md min-h-80 py-2 px-4 shadow-md">
                        <p className="text-xl font-medium px-3 text-indigo-500 border-l-8 border-double border-indigo-500">Thông tin công ty</p>
                        {/* website */}
                        <div className="flex w-full py-2 mt-3">
                            <div className="w-1/6 mt-1">
                                <Image src={flatIconWebsite} alt="website" className="w-10"/>
                            </div>
                            <div className="w-5/6">
                                <p className="font-medium">Website</p>
                                <div className="flex flex-wrap gap-1 w-full">
                                    <Link to={dataCompany?.website}>
                                        <p className="cursor-pointer hover:text-indigo-500 hover:underline">
                                            {dataCompany?.website}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* phone */}
                        <div className="flex w-full py-2">
                            <div className="w-1/6 mt-1">
                                <Image src={flatIconPhone} alt="phone" className="w-10"/>
                            </div>
                            <div className="w-5/6">
                                <p className="font-medium">Số điện thoại</p>
                                <div className="flex flex-wrap gap-1 w-full">
                                    <p className="text-indigo-500 italic font-medium">{dataCompany?.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* address */}
                        <div className="flex w-full py-2">
                            <div className="w-1/6 mt-1">
                                <Image src={flatIconNationality} alt="nationality" className="w-10"/>
                            </div>
                            <div className="w-5/6">
                                <p className="font-medium">Địa chỉ</p>
                                <div className="flex flex-wrap gap-1 w-full">
                                    <p className="">{dataCompany?.address}</p>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>
        </main>
    </section>
  )
}

export default CompanyItem
