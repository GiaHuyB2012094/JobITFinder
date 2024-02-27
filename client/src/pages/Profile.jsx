import { useRef, useState } from "react";
import { Button, Image, InputControl, Nav } from "../components"
import { FaRegImage } from "react-icons/fa6";
import { FaDeleteLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { urlAvatarDefault } from "../constants";
// import axios from "axios";
import emptyCoverImage from "../assets/emptyData.jpg"


const Profile = () => {
    const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const inputImageRef = useRef();
    const inputCoverImageRef = useRef();

    const { userInfo } = useSelector(state => state.auth);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)

    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)

    const [coverImage, setCoverImage] = useState(null)
    const [previewCoverImage, setPreviewCoverImage] = useState(null)

    const handleImageChange = (e) => {
        setImage(e.target.files[0])

        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setPreview(reader.result);
          };
    }

    const handleCoverImageChange = (e) => {
        setCoverImage(e.target.files[0])

        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setPreviewCoverImage(reader.result);
          };
    }

    const uploadingImage = async() => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset",upload_preset)
        data.append("cloud_name", cloud_name)
        data.append("folder", "Cloudinary-React")
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
                    method: "POST",
                    body: data,
                }
            )
            const res = await response.json();
            console.log(res.url)

        } catch (error) {
            console.log(error)
        }
    }

    const uploadingCoverImage = async() => {
        const data = new FormData()
        data.append("file", coverImage)
        data.append("upload_preset",upload_preset)
        data.append("cloud_name", cloud_name)
        data.append("folder", "Cloudinary-React")
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name}/coverImage/upload`,{
                    method: "POST",
                    body: data,
                }
            )
            const res = await response.json();
            console.log(res.url)

        } catch (error) {
            console.log(error)
        }
    }

    const handleUploadAvatar = () => {
        inputImageRef.current.click();
    }

    const handleUploadCoverAvatar = () => {
        inputCoverImageRef.current.click();
    }

    const avatarCurrent = userInfo?.avatar ? userInfo?.avatar : urlAvatarDefault;
    const coverAvatarCurrent = userInfo?.coverImg ? userInfo?.coverImg : emptyCoverImage;
    return (
        <main className="min-h-screen bg-white">
            <Nav/>

            <div className="relative h-[600px] border-b-2 border-solid border-gray-100 shadow-md">
                <div className="h-[600px] w-full border-b-2 border-solid border-gray-200">
                    <Image
                        src={previewCoverImage ? previewCoverImage : coverAvatarCurrent}
                        alt="cart image"
                        className="h-full w-full mx-auto pt-12"
                    />
                </div>

                <div className="flex-between h-[80px] bg-white">
                    <div className="absolute flex-center w-32 h-32  top-[530px] left-12 bg-white rounded-full shadow-md">
                        <Image
                            src={preview 
                                ? preview 
                                : avatarCurrent}
                            alt="avatar"
                            className="w-28 h-28 rounded-full"
                        />
                    </div>

                    <div>
                        <p className="mx-48 text-2xl font-medium text-gray-600 ">{
                            userInfo?.nameCompany 
                                ? (
                                    <div className="flex-center gap-1">
                                        {userInfo?.nameCompany}
                                        <p className="text-orange-400">(company)</p>
                                    </div>
                                ) 
                                : (
                                    userInfo?.lastName + " " + userInfo?.firstName
                                )
                        }</p>
                    </div>
                    {isOpenUpdate 
                        ? (
                            <div className="flex-center absolute top-[615px] right-[50px] ">
                                <form
                                    onSubmit={uploadingCoverImage}
                                    className="hidden"
                                >
                                    <InputControl
                                        ref={inputCoverImageRef}
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        name="image"
                                        onChange={handleCoverImageChange}
                                        styles="hidden"
                                    />
                                </form>
                                <Button
                                    title="Thay đổi ảnh bìa"
                                    roundPrimary
                                    onClick={handleUploadCoverAvatar}
                                    styles="!p-2 w-40"
                                />
                                <Button
                                    title="Lưu"
                                    styles="!px-5 "
                                />
                                <Button
                                    title="Hủy"
                                    onClick={() => {setIsOpenUpdate(false)}}
                                    styles="!px-5 !bg-red-400"
                                />
                            </div>
                        )
                        : (
                            <div className="flex-center absolute top-[615px] right-[50px] ">
                                <form
                                    onSubmit={uploadingCoverImage}
                                    className="hidden"
                                >
                                    <InputControl
                                        ref={inputCoverImageRef}
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        name="image"
                                        onChange={handleCoverImageChange}
                                        styles="hidden"
                                    />
                                </form>
                                <Button
                                    title="Thay đổi ảnh bìa"
                                    roundPrimary
                                    styles="!p-2 w-40"
                                    onClick={handleUploadCoverAvatar}
                                />
                                <Button
                                    title="Cập nhật"
                                    styles="!p-2 w-40"
                                    onClick={() => {setIsOpenUpdate(true)}}
                                />
                                
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="flex mt-20 gap-5 border-t-2 border-solid border-gray-200 ">
                <div className=" flex flex-col gap-3 py-10 px-20 w-1/3">
                    {/* avatar */}
                    <div className="">
                        <p className="uppercase font-medium text-indigo-500">Ảnh đại diện</p>
                        <div className="flex-center flex-col">
                            <div className="my-4 ">
                                <div className="relative h-[300px] w-[300px] flex-center border-2 border-dashed border-indigo-200 p-3 bg-slate-200">
                                    <Image
                                        src={preview 
                                                ? preview 
                                                : avatarCurrent}
                                        alt="profile-avatar"
                                        className="w-full h-full "
                                    />

                                    <div className="absolute h-[90%] w-[90%] border-2 border-dashed border-gray-400 rounded-full bg-transparent"></div>
                                </div>
                            </div>
                            <form
                                onSubmit={uploadingImage}
                                className="hidden"
                            >
                                <InputControl
                                    ref={inputImageRef}
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="image"
                                    onChange={handleImageChange}
                                    styles="hidden"
                                />
                            </form>
                            <p className="flex-center cursor-pointer gap-2 my-1 text-blue-500 font-medium 
                                hover:text-indigo-600"
                                onClick={handleUploadAvatar}
                                >
                                    <FaRegImage /> Thay đổi avatar
                            </p>
                            
                            
                        </div>
                    </div>
                    {/* info account */}
                    <div className="flex !items-start !justify-start flex-col gap-3 my-6">
                        <p className="uppercase font-medium text-indigo-500">Thông tin chi tiết</p>
                        {isOpenUpdate 
                            ? (
                                <>
                                    {userInfo?.position === "user" 
                                        ? (
                                            <>
                                                <InputControl
                                                    name="lastName"
                                                    label="Họ"
                                                    type="text"
                                                    placeholder="Nhập họ của bạn vào"
                                                />
                                                <InputControl
                                                    name="firstName"
                                                    label="Tên"
                                                    type="text"
                                                    placeholder="Nhập tên của bạn vào"
                                                />
                                            </>
                                        )
                                        : (
                                            <InputControl
                                                name="name company"
                                                label="Công ty"
                                                type="text"
                                                placeholder="Nhập tên công ty vào"
                                            />
                                        )
                                        
                                    }
                                    <InputControl
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="Nhập email vào"
                                    />
                                    <InputControl
                                        name="phone"
                                        label="Số điện thoại"
                                        type="text"
                                        placeholder="Nhập số điện thoại vào"
                                    />
                                    <InputControl
                                        name="address"
                                        label="Địa chỉ"
                                        type="text"
                                        placeholder="Nhập địa chỉ vào"
                                    />
                                </>
                            ) 
                            : (
                                <>
                                    {userInfo?.position === "user" 
                                        ? (
                                            <>
                                                <div className="w-full min-h-9 bg-gray-200 rounded-lg py-2 px-4">
                                                    <p className="text-sm font-normal text-gray-500">Họ</p>
                                                    <p className="text-md font-medium text-gray-500 ">{userInfo?.lastName}</p>
                                                </div>
                                                <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                                                    <p className="text-sm font-normal text-gray-500">Tên</p>
                                                    <p className="text-md font-medium text-gray-500 ">{userInfo?.firstName}</p>
                                                </div>
                                            </>
                                        )
                                        : (
                                            <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                                                <p className="text-sm font-normal text-gray-500">Tên Công Ty</p>
                                                <p className="text-md font-medium text-gray-500 ">{userInfo?.nameCompany}</p>
                                            </div>
                                        )  
                                    }
                                    
                                    <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                                        <p className="text-sm font-normal text-gray-500">Email</p>
                                        <p className="text-md font-medium text-gray-500 ">{userInfo?.email}</p>
                                    </div>
                                    <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                                        <p className="text-sm font-normal text-gray-500">Số điện thoại</p>
                                        <p className="text-md font-medium text-gray-500 ">{userInfo?.phone ? userInfo?.phone : "Không có"}</p>
                                    </div>
                                    <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                                        <p className="text-sm font-normal text-gray-500">Địa chỉ</p>
                                        <p className="text-md font-medium text-gray-500 ">{userInfo?.address ? userInfo?.address : "Không có"}</p>
                                    </div>
                                </>
                            )
                            
                        }
                    
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-3 py-10 px-20 w-2/3">
                    <div className="flex-center w-full gap-6">
                        <div className="w-full">
                            <p className="uppercase font-medium text-indigo-500">Vai trò</p>
                            <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                                <p className="text-sm font-normal text-gray-500">Vai trò</p>
                                <p className="text-md font-medium text-orange-500">
                                    {userInfo?.position === "user" 
                                        ? "Ứng viên"
                                        : userInfo?.position === "company" 
                                            ? "Công ty" 
                                            : ""}
                                </p>
                            </div>
                        </div>
                        <div className="w-full"> 
                            <p className="uppercase font-medium text-indigo-500">
                                {userInfo?.position === "company" ? "Quốc tịch" : "Ngày sinh"}
                            </p>
                                
                                {userInfo?.position === "company" 
                                    ? isOpenUpdate
                                        ? (
                                            <InputControl
                                                name="nationality"
                                                type="text"
                                                placeholder="Nhập quốc tịch công ty"
                                            />
                                        ) 
                                        : (
                                        <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                                            <p className="text-sm font-normal text-gray-500">
                                                {userInfo?.position === "company" ? "Quốc tịch" : "Ngày sinh"}
                                            </p>
                                            <p className="text-md font-medium text-gray-500 ">
                                                { userInfo?.nationality 
                                                    ? userInfo?.nationality
                                                    : "Không có" }
                                            </p>
                                        </div>

                                        ) 
                                    : userInfo?.position === "user"
                                        ? isOpenUpdate 
                                            ? (
                                                <InputControl
                                                    name="date"
                                                    type="date"
                                                />
                                            )
                                            : (
                                                <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                                                    <p className="text-sm font-normal text-gray-500">
                                                        {userInfo?.position === "company" ? "Quốc tịch" : "Ngày sinh"}
                                                    </p>
                                                    <p className="text-md font-medium text-gray-500 ">
                                                        {userInfo?.date 
                                                            ? userInfo?.date
                                                            : "Không có" }
                                                    </p>
                                                </div>
                                            )
                                        : ""
                                }
                            </div>
                    </div>
                    <div className="flex-center w-full gap-6">
                        <div className="w-full">
                            <p className="uppercase font-medium text-indigo-500">Website</p>
                            {isOpenUpdate 
                                ? (
                                    <InputControl
                                        name="website"
                                        type="text"
                                        placeholder="Nhập website công ty"
                                    />
                                )
                                : (
                                <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                                        <p className="text-sm font-normal text-gray-500">Website công ty</p>
                                        <a className="text-md font-medium text-blue-500" href={userInfo?.website}>
                                            {userInfo?.website 
                                                ? userInfo?.website
                                                : "Không có" }
                                        </a>
                                    </div> 
                                ) 
                            
                            
                            }
                        </div>
                        
                        <div className="w-full"> 
                            <p className="uppercase font-medium text-indigo-500">Quy mô</p>
                            {isOpenUpdate 
                                ? (
                                    <InputControl
                                        name="sizeCompany"
                                        // label="Website"
                                        type="text"
                                        placeholder="Nhập số lượng nhân sự trong công ty"
                                    />
                                )
                                : (
                                    <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                                        <p className="text-sm font-normal text-gray-500">Số lượng nhân sự</p>
                                        <p className="text-md font-medium text-gray-500 ">
                                            {userInfo?.sizeCompany 
                                                ? userInfo?.sizeCompany
                                                : "Không có" }
                                        </p>
                                    </div>
                                ) 
                            
                            
                            }
                            
                        </div>
                    </div>
                    
                { userInfo?.position === "company" && (

                        <>
                            <div className="flex items-start w-full gap-6">
                                <div className="rounded-lg w-1/2 bg-white drop-shadow-lg">
                                    <div className="flex-between border-b-2 border-solid border-gray-200 p-3">
                                        <p className="text-xl font-medium text-indigo-700">Các kỹ năng</p>
                                        {isOpenUpdate ? (
                                            <Button
                                                title="Thêm"
                                            />
                                        ) : ""
                                        }
                                    </div>
                                    <div className="max-h-[300px] flex flex-col gap-1 overflow-y-scroll no-scrollbar">
                                        <div className="  bg-slate-50 flex flex-col  gap-3">
                                            {userInfo?.skillOfCompany.map((skill, idx) => (
                                                <div key={idx} className="flex-between hover:bg-indigo-200 px-5 py-2  ">
                                                    <div  className="text-base font-normal">{skill}</div>
                                                    {
                                                        isOpenUpdate ? (
                                                            <div className="text-xl font-medium text-red-500 cursor-pointer">
                                                                <FaDeleteLeft/>
                                                            </div>
                                                        ) : ""
                                                    }
                                                </div>
                                            ))}
                                        </div>

                                        
                                    </div>
                                </div>

                                <div className="rounded-lg w-1/2 bg-white drop-shadow-lg">
                                    <div className="flex-between border-b-2 border-solid border-gray-200 p-3">
                                        <p className="text-xl font-medium text-green-600">Lĩnh vực của công ty</p>
                                        {isOpenUpdate ? (
                                            <Button
                                                title="Thêm"
                                                styles="!bg-green-500"
                                            />
                                        ) : ""
                                        }
                                    </div>
                                    <div className="max-h-[300px] flex flex-col gap-1 overflow-y-scroll no-scrollbar">
                                        <div className="  bg-slate-50 flex flex-col  ">
                                            {userInfo?.industryCompany.map((industry, idx) => (
                                                <div key={idx} className="flex-between hover:bg-green-200 gap-3 shadow-md px-5 py-2">
                                                    <div  className="text-base font-normal">{industry}</div>
                                                    {
                                                        isOpenUpdate ? (
                                                            <div className="text-xl font-medium text-red-500 cursor-pointer">
                                                                <FaDeleteLeft/>
                                                            </div>
                                                        ) : ""
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start w-full gap-6">
                                <div className="">
                                    <p className="uppercase text-base font-medium text-indigo-700">Mô tả công ty</p>
                                    {
                                        isOpenUpdate 
                                            ? (
                                                <textarea 
                                                    className="border-2 border-solid border-gray shadow-lg rounded-xl px-3 py-2 mt-2 mx-2 outline-none" 
                                                    name="textarea" 
                                                    rows="15" 
                                                    placeholder="Nhập thông tin của công ty vào đây"
                                                    cols="110"
                                                >
                                                        {/* {userInfo?.nameCompany} */}
                                                </textarea>
                                            ) : (
                                                <textarea 
                                                    className="border-2 border-solid border-gray shadow-lg rounded-xl px-3 py-2 mt-2 mx-2 outline-none" 
                                                    name="textarea" 
                                                    rows="15" 
                                                    placeholder="Nhập thông tin của công ty vào đây"
                                                    cols="110"
                                                    disabled
                                                >
                                                        {userInfo?.infoOfCompany}
                                                </textarea>
                                            )
                                    }
                                    
                                
                                </div>
                            </div>
                        </>
                        )
                }
                </div>
            </div>
        </main>
  )
}

export default Profile
