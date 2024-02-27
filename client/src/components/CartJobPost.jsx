// import { useQuery } from "react-query"
import { salaryScale } from "../constants/convertData"
import { useGetCompanyItemQuery } from "../slices/usersApiSlice"
import Image from "./Image"
// import { getProvinces } from "../api/provincesApi"
// import { FaCircleCheck } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import Button from "./Button"
import { FaRegHeart, FaHeart  } from "react-icons/fa";
import { useMemo, useState } from "react"
import { Popover, Tooltip } from "antd"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { multiFormatDateString } from "../lib/utils";
const CartJobPost = ({post}) => {
    const { data: dataCompanyItem } = useGetCompanyItemQuery(post.company)
    // const { data: provinces } = useQuery("provinces", getProvinces)
    const [ activeHeart, setActiveHeart ] = useState(false)
    const { userInfo } = useSelector(state => state.auth)
    
    const contentHeart = useMemo(() => {
        return (
            <div className="">
                <p>Bạn cần phải đăng nhập</p>
                <p>trước khi lưu bài viết này</p>
            </div>
        )
    },[])
    
    const saveTooltip = useMemo(() => {
        return (<p>Để lưu</p>)
    },[])
    const namePostTooltip = useMemo(() => {
        return (<p>{post.name}</p>)
    },[])
  return (
    <div className="flex w-full min-h-[165px] gap-x-5 p-3 bg-white rounded-md shadow-md
         hover:border-solid hover:border-2 hover:border-indigo-200">
        <div className="w-1/5 flex-center h-[150px] p-5 border-2 border-dashed border-indigo-100 rounded-lg cursor-pointer">
            <Link to={`/job-detail/${post._id}/${dataCompanyItem?.nameCompany}`} >
                <Image
                    src={dataCompanyItem?.avatar}
                    alt="SignInImage"
                    className="w-full h-fit"
                />
            </Link>
        </div>
        
        <div className="w-[57%] h-full">
            {post.quantity > 20 && <p className="rounded-full p-1 bg-green-100 w-36 text-center text-green-500 text-sm font-medium">Tuyển số lượng lớn</p>}
            <Link 
                to={`/job-detail/${post._id}/${dataCompanyItem?.nameCompany}`}
            >
                <Tooltip placement="top" title={namePostTooltip}>
                    <div className="w-96 truncate">
                        <p className="text-base font-medium text-indigo-500 cursor-pointer overflow-hidden
                            hover:text-indigo-600 hover:underline">
                            {post.name}
                            {/* <span className="mx-2 text-indigo-400"><FaCircleCheck/></span> */}
                        </p>
                    </div>
                </Tooltip>

            </Link>
            <p className="">{dataCompanyItem?.nameCompany}</p>
            <p className="text-[12px] font-semibold leading-[140%] text-gray-500">Đăng {multiFormatDateString(post?.createdAt)}</p>
            <div className="flex my-3 gap-6">
                {
                    post.skills?.slice(0,5)?.map((skill,idx) => (
                        <div 
                        className="p-1 px-3 cursor-pointer font-medium text-xs rounded-full bg-indigo-100 shadow-sm"
                        key={idx}
                        >
                        {skill}
                        </div>
                    ))
                }
            </div>
            <div className="flex gap-4">
                <div className="flex items-center gap-6">
                    <p className="flex items-center text-sm w-68">
                        <span className="mr-2 text-indigo-400"><IoLocationSharp /></span>
                        {dataCompanyItem?.address}
                    </p>
                    <p className="flex items-center text-sm w-68">
                        <span className="mr-2 text-indigo-400"><FaClock /></span>
                        Còn 6 ngày để ứng tuyển 
                    </p>
                </div>
            </div>
        </div>
        <div className="w-[23%] min-h-[160px] flex justify-between flex-col">
            <div className="flex items-end justify-end">
                <p className="text-base font-bold text-indigo-500"> {salaryScale(post?.minSalary, post?.maxSalary)} </p>
            </div>
            <div className="flex w-full gap-2">
                {userInfo 
                    ? 
                        <>
                            <Button
                                title="Ứng tuyển"
                                styles="!w-24 !px-1"
                                to={`/job-detail/${post._id}/${dataCompanyItem?.nameCompany}`}
                            />
                            <Tooltip placement="top" title={saveTooltip}>
                                <span className={`p-3 rounded-md bg-indigo-100 text-indigo-400 cursor-pointer border-2 border-solid border-indigo-100
                                    active:translate-y-1 ${activeHeart ? "!bg-indigo-300 !text-indigo-50 !border-indigo-400" : ""}`}
                                    onClick={() => setActiveHeart(!activeHeart) }
                                    >   
                                    {activeHeart ? <FaHeart/> : <FaRegHeart/> }
                                </span>
                             </Tooltip>
                        </>
                       
                    :
                        <>
                            <Popover 
                                trigger="hover" 
                                content="Đăng nhập để ứng tuyển">
                                <div>
                                    <Button
                                        title="Ứng tuyển"
                                        styles="!w-24 !px-1"
                                        to="/signIn-signUp-User"
                                    />
                                </div>
                            </Popover>
                            <Popover content={contentHeart} trigger="hover">
                                <span className={`p-3 rounded-md bg-indigo-100 text-indigo-400 cursor-pointer border-2 border-solid border-indigo-100
                                    active:translate-y-1 ${activeHeart ? "!bg-indigo-300 !text-indigo-50 !border-indigo-400" : ""}`}
                                    onClick={() => setActiveHeart(!activeHeart) }
                                    >   
                                    {activeHeart ? <FaHeart/> : <FaRegHeart/> }
                                </span>
                            </Popover>
                        </>
                }
            </div>
        </div>
    </div>
  )
}

export default CartJobPost
