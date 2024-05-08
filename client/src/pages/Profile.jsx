import { useRef, useState } from "react";
import { Button, Image, InputControl, Nav } from "../components";
import { FaRegImage } from "react-icons/fa6";
import { FaDeleteLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { urlAvatarDefault } from "../constants";
// import axios from "axios";
import emptyCoverImage from "../assets/emptyData.jpg";
import { useGetAppliesUserIDQuery } from "../slices/applyApiSlice";
import { convertData, convertDateFormat } from "../constants/convertData";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Select, Tag, Tooltip } from "antd";
import { useQuery } from "react-query";
import { getProvinces } from "../api/provincesApi";
import { useGetSkillsQuery } from "../slices/skillOfCompanyApiSlice";
import { useGetIndustryQuery } from "../slices/industryOfCompanyApiSlice";
import ImageUpload from "../components/resume/ImageUpload";

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
const Profile = () => {
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const { userInfo } = useSelector((state) => state.auth);

  const { data: dataApply } = useGetAppliesUserIDQuery(userInfo?._id);

  const [lastName, setLastName] = useState(userInfo?.lastName || "");
  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [nameCompany, setNameCompany] = useState(userInfo?.nameCompany || "");
  const [nationality, setNationality] = useState(userInfo?.nationality || "");
  const [address, setAddress] = useState(userInfo?.address || "");
  const [sizeCompany, setSizeCompany] = useState(userInfo?.sizeCompany || "");
  const [website, setWebsite] = useState(userInfo?.website || "");
  const [dateOfUser, setDateOfUser] = useState(userInfo?.dateOfUser || "");
  const [avatar, setAvatar] = useState(userInfo?.avatar || "");
  const [coverImg, setCoverImg] = useState(userInfo?.coverImg || "");
  const [skillOfCompany, setSkillOfCompany] = useState(
    userInfo?.skillOfCompany || []
  );
  const [infoOfCompany, setInfoOfCompany] = useState(
    userInfo?.infoOfCompany || ""
  );
  const [industryCompany, setIndustryCompany] = useState(
    userInfo?.industryCompany || []
  );
  const [locations, setLocations] = useState(
    userInfo?.addressDetail?.length > 0 ? userInfo?.addressDetail : [""]
  );
  const [benefits, setBenefits] = useState(
    userInfo?.benefits?.length > 0 ? userInfo?.benefits : [""]
  );

  const inputImageRef = useRef();
  const inputCoverImageRef = useRef();

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isUploadingCoverImg, setIsUploadingCoverImg] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isAddSkills, setIsAddSkills] = useState(false);
  const [isAddIndustry, setIsAddIndustry] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [coverImage, setCoverImage] = useState(null);
  const [previewCoverImage, setPreviewCoverImage] = useState(null);

  const [isUploadImages, setIsUploadImages] = useState(false);
  const [imagesUrl, setImagesUrl] = useState(userInfo?.imagesCompany || []);

  const avatarCurrent = userInfo?.avatar ? userInfo?.avatar : urlAvatarDefault;
  const coverAvatarCurrent = userInfo?.coverImg
    ? userInfo?.coverImg
    : emptyCoverImage;

  const dispatch = useDispatch();
  // api
  const [updateProfile] = useUpdateProfileMutation();
  const { data: provinces } = useQuery("provinces", getProvinces);
  const { data: dataSkills } = useGetSkillsQuery();
  const { data: dataIndustry } = useGetIndustryQuery();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPreviewCoverImage(reader.result);
    };
  };

  const uploadingImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);
    data.append("folder", "Cloudinary-React");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();

      setIsUploadingAvatar(false);

      setAvatar(res.url);

      toast.success("Tải ảnh đại diện thành công");
    } catch (error) {
      console.log(error);
      toast.error("Tải ảnh đại diện thất bại");
    }
  };

  const uploadingCoverImage = async () => {
    const data = new FormData();
    data.append("file", coverImage);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);
    data.append("folder", "Cloudinary-React");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();

      setIsUploadingCoverImg(false);

      setCoverImg(res.url);

      toast.success("Tải ảnh bìa thành công");
    } catch (error) {
      console.log(error);
      toast.error("Tải ảnh bìa thất bại");
    }
  };

  const handleUploadAvatar = () => {
    inputImageRef.current.click();

    setIsUploadingAvatar(true);
  };

  const handleUploadCoverAvatar = () => {
    inputCoverImageRef.current.click();

    setIsUploadingCoverImg(true);
  };

  // upload images

  // skills
  const handleAddSkills = () => {
    setIsAddSkills(true);
  };

  const handleDeleteSkills = (e, idx) => {
    e.preventDefault();

    let arrSkillsTemp = [...skillOfCompany];

    arrSkillsTemp.splice(idx, 1);

    setSkillOfCompany(arrSkillsTemp);
  };

  // industries
  const handleAddIndustrys = () => {
    setIsAddIndustry(true);
  };

  const handleDeleteIndustry = (e, idx) => {
    e.preventDefault();

    let arrIndustriesTemp = [...industryCompany];

    arrIndustriesTemp.splice(idx, 1);

    setIndustryCompany(arrIndustriesTemp);
  };

  //  locations
  const handleLocationsUpdate = (e, idx) => {
    e.preventDefault();
    const { value } = e.target;
    const valOnChangeLocations = [...locations];
    valOnChangeLocations[idx] = value;
    setLocations(valOnChangeLocations);
  };

  const handleLocationsClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setLocations((prev) => [...prev, ""]);
  };

  const handleLocationsDelete = (e, idx) => {
    e.preventDefault();
    if (locations.length > 1) {
      var delLocations = [...locations];
      delLocations.splice(idx, 1);
      setLocations(delLocations);
    }
  };

  //  benefits
  const handleBenefitsUpdate = (e, idx) => {
    e.preventDefault();
    const { value } = e.target;
    const valOnChangeBenefits = [...benefits];
    valOnChangeBenefits[idx] = value;
    setBenefits(valOnChangeBenefits);
  };

  const handleBenefitsClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setBenefits((prev) => [...prev, ""]);
  };

  const handleBenefitDelete = (e, idx) => {
    e.preventDefault();
    if (benefits.length > 1) {
      var delBenefits = [...benefits];
      delBenefits.splice(idx, 1);
      setBenefits(delBenefits);
    }
  };

  const handleUpdateInfo = async () => {
    let data = {};

    setIsUploadImages(true);

    if (userInfo?.position === "user") {
      Object.assign(data, {
        lastName,
        firstName,
        phone,
        email,
        avatar,
        coverImg,
        address,
        date: dateOfUser,
      });
    } else if (userInfo?.position === "company") {
      Object.assign(data, {
        phone,
        avatar,
        email,
        coverImg,
        address,
        addressDetail: locations,
        website,
        sizeCompany: Number(sizeCompany),
        infoOfCompany,
        nameCompany,
        nationality,
        benefits,
        industryCompany,
        skillOfCompany,
        imagesCompany: imagesUrl,
      });
    }
    console.log(data);
    try {
      const result = await updateProfile(data).unwrap();

      dispatch(setCredentials({ ...result, position: userInfo?.position }));

      toast.success("Cập nhật thông tin cá nhân thành công");

      console.log(result);

      setIsOpenUpdate(false);
    } catch (error) {
      toast.error("Cập nhật thông tin cá nhân thất bại");
      console.log(error);
      setIsOpenUpdate(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Nav />

      <div className="relative h-[600px] border-b-2 border-solid border-gray-100 shadow-md">
        <div className="h-[600px] w-full border-b-2 border-solid border-gray-200">
          <Image
            src={previewCoverImage ? previewCoverImage : coverAvatarCurrent}
            alt="cart image"
            className="h-full  mx-auto pt-12 "
          />
        </div>

        <div className="flex-between h-[80px] bg-white">
          <div className="absolute flex-center w-32 h-32  top-[530px] left-12 bg-white rounded-full shadow-md">
            <Image
              src={preview ? preview : avatarCurrent}
              alt="avatar"
              className="w-[120px] h-[120px] rounded-full object-contain object-center"
            />
          </div>

          <div>
            <div className="mx-48 text-xl font-medium text-gray-600 ">
              {userInfo?.nameCompany ? (
                <div className="flex gap-x-1 line-clamp-1">
                  <p className="line-clamp-1">{userInfo?.nameCompany}</p>
                  <p className="text-orange-400 ">(công ty)</p>
                </div>
              ) : (
                userInfo?.lastName + " " + userInfo?.firstName
              )}
            </div>
          </div>
          {isOpenUpdate ? (
            <div className="flex-center absolute top-[615px] right-[50px] ">
              <form onSubmit={uploadingCoverImage} className="hidden">
                <InputControl
                  ref={inputCoverImageRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  name="image"
                  onChange={handleCoverImageChange}
                  styles="hidden"
                />
              </form>

              {!isUploadingCoverImg ? (
                <Button
                  title="Thay đổi ảnh bìa"
                  roundPrimary
                  onClick={handleUploadCoverAvatar}
                  styles="!p-2 w-48"
                />
              ) : (
                <Button
                  title="Tải lên"
                  roundPrimary
                  onClick={uploadingCoverImage}
                  styles="!p-2 w-60"
                />
              )}

              <Button
                title="Lưu"
                styles="!px-5 w-24"
                onClick={handleUpdateInfo}
              />

              <button
                onClick={() => {
                  setIsOpenUpdate(false);
                }}
                className="w-24 bg-red-500 text-white px-4 py-2 font-medium rounded-sm mx-2 hover:translate-y-1 active:translate-y-1"
              >
                Hủy
              </button>
            </div>
          ) : (
            <div className="flex-center absolute top-[615px] right-[50px] ">
              <form onSubmit={uploadingCoverImage} className="hidden ">
                <InputControl
                  ref={inputCoverImageRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  name="image"
                  onChange={handleCoverImageChange}
                  styles="hidden"
                />
              </form>
              {!isUploadingCoverImg ? (
                <Button
                  title="Thay đổi ảnh bìa"
                  roundPrimary
                  onClick={handleUploadCoverAvatar}
                  styles="!p-2 w-48"
                />
              ) : (
                <Button
                  title="Tải lên"
                  onClick={uploadingCoverImage}
                  styles="!p-2 w-44 !bg-orange-500"
                />
              )}

              <Button
                title="Cập nhật"
                styles="!p-2 w-44"
                onClick={() => {
                  setIsOpenUpdate(true);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex mt-20 gap-5 border-t-2 border-solid border-gray-200 ">
        <div className=" flex flex-col gap-3 py-10 px-20 w-1/3">
          {/* avatar */}
          <div className="">
            <p className="uppercase font-medium text-indigo-500">
              Ảnh đại diện
            </p>
            <div className="flex-center flex-col">
              <div className="my-4 ">
                <div className="relative h-[300px] w-[300px] flex-center border-2 border-solid border-indigo-200 p-3 bg-white">
                  <Image
                    src={preview ? preview : avatarCurrent}
                    alt="profile-avatar"
                    className="w-full h-full object-contain object-center"
                  />

                  <div className="absolute h-[90%] w-[90%] border-2 border-dashed border-indigo-400 rounded-full bg-transparent"></div>
                </div>
              </div>
              <form onSubmit={uploadingImage} className="hidden">
                <InputControl
                  ref={inputImageRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  name="image"
                  onChange={handleImageChange}
                  styles="hidden"
                />
              </form>
              <p
                className="flex-center cursor-pointer gap-2 my-1 text-blue-500 font-medium 
                                    hover:text-indigo-600"
                onClick={handleUploadAvatar}
              >
                <FaRegImage /> Thay đổi avatar
              </p>
              {isUploadingAvatar ? (
                <Button
                  title="Tải avatar lên"
                  styles="!p-2 w-60 bg-orange-500"
                  onClick={uploadingImage}
                />
              ) : (
                ""
              )}
            </div>
          </div>

          {/* info account */}
          <div className="flex !items-start !justify-start flex-col gap-3 my-2">
            <p className="uppercase font-medium text-indigo-500">
              Thông tin chi tiết
            </p>
            {isOpenUpdate ? (
              <>
                {userInfo?.position === "user" ? (
                  <>
                    <InputControl
                      name="lastName"
                      label="Họ"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Nhập họ của bạn vào"
                    />
                    <InputControl
                      name="firstName"
                      label="Tên"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Nhập tên của bạn vào"
                    />
                  </>
                ) : (
                  <InputControl
                    name="name company"
                    label="Công ty"
                    type="text"
                    value={nameCompany}
                    onChange={(e) => setNameCompany(e.target.value)}
                    placeholder="Nhập tên công ty vào"
                  />
                )}
                {/* email */}
                <InputControl
                  name="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email vào"
                />
                {/* phone */}
                <InputControl
                  name="phone"
                  label="Số điện thoại"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại vào"
                />
                {/* address */}
                {/* <InputControl
                                        name="address"
                                        label="Địa chỉ"
                                        type="text"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        placeholder="Nhập địa chỉ vào"
                                    /> */}
                <div className="flex flex-col mt-0 w-full ml-2">
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Trụ sở công ty
                  </p>
                  <Select
                    placeholder="Nhập địa chỉ vào"
                    style={{
                      width: "100%",
                      height: "45px",
                      border: "1px solid gray",
                      borderRadius: "6px",
                    }}
                    allowClear
                    value={address}
                    onChange={setAddress}
                    options={provinces?.map((province) => ({
                      value: province.province_name,
                      label: province.province_name,
                    }))}
                  />
                  {address === "" && (
                    <span className="text-xs text-red-500 mt-0.5">
                      Vui lòng chọn địa chỉ
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                {userInfo?.position === "user" ? (
                  <>
                    <div className="w-full min-h-9 bg-gray-200 rounded-lg py-2 px-4">
                      <p className="text-sm font-normal text-gray-500">Họ</p>
                      <p className="text-md font-medium text-gray-500 ">
                        {userInfo?.lastName}
                      </p>
                    </div>
                    <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                      <p className="text-sm font-normal text-gray-500">Tên</p>
                      <p className="text-md font-medium text-gray-500 ">
                        {userInfo?.firstName}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                    <p className="text-sm font-normal text-gray-500">
                      Tên Công Ty
                    </p>
                    <p className="text-md font-medium text-indigo-500 ">
                      {userInfo?.nameCompany}
                    </p>
                  </div>
                )}

                <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                  <p className="text-sm font-normal text-gray-500">Email</p>
                  <p className="text-md font-medium text-gray-500 ">
                    {userInfo?.email}
                  </p>
                </div>
                <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                  <p className="text-sm font-normal text-gray-500">
                    Số điện thoại
                  </p>
                  <p className="text-md font-medium text-gray-500 ">
                    {userInfo?.phone ? userInfo?.phone : "Không có"}
                  </p>
                </div>
                <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                  <p className="text-sm font-normal text-gray-500">Địa chỉ</p>
                  <p className="text-md font-medium text-gray-500 ">
                    {userInfo?.address ? userInfo?.address : "Không có"}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* upload images */}
          {userInfo?.position === "company" && (
            <>
              <div className="flex !items-start !justify-start flex-col gap-3">
                <p className="uppercase font-medium text-indigo-500">
                  Đăng tải ảnh công ty
                </p>

                <ImageUpload
                  isUpload={isUploadImages}
                  passCloudinaryFileImage={(data) => {
                    setImagesUrl(data);
                  }}
                  ImageFileLocal={(data) => {
                    setImagesUrl(data);
                  }}
                  quantity={8}
                  setIsUpload={(data) => {
                    setIsUploadImages(data);
                  }}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-3 py-10 px-20 w-2/3">
          {/* row-1 */}
          <div className="flex-center w-full gap-6">
            {/* role */}
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
            {/* nationality and date of birth */}
            <div className="w-full">
              <p className="uppercase font-medium text-indigo-500">
                {userInfo?.position === "company" ? "Quốc tịch" : "Ngày sinh"}
              </p>

              {userInfo?.position === "company" ? (
                isOpenUpdate ? (
                  <InputControl
                    name="nationality"
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder="Nhập quốc tịch công ty"
                  />
                ) : (
                  <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                    <p className="text-sm font-normal text-gray-500">
                      {userInfo?.position === "company"
                        ? "Quốc tịch"
                        : "Ngày sinh"}
                    </p>
                    <p className="text-md font-medium text-gray-500 ">
                      {userInfo?.nationality
                        ? userInfo?.nationality
                        : "Không có"}
                    </p>
                  </div>
                )
              ) : userInfo?.position === "user" ? (
                isOpenUpdate ? (
                  <InputControl
                    name="date"
                    value={dateOfUser}
                    onChange={(e) => setDateOfUser(e.target.value)}
                    type="date"
                  />
                ) : (
                  <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                    <p className="text-sm font-normal text-gray-500">
                      {userInfo?.position === "company"
                        ? "Quốc tịch"
                        : "Ngày sinh"}
                    </p>
                    <p className="text-md font-medium text-gray-500 ">
                      {userInfo?.date
                        ? convertDateFormat(userInfo?.date)
                        : "Không có"}
                    </p>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          </div>
          {/* row-2 */}
          {userInfo?.position === "company" ? (
            <>
              {/* website and scale */}
              <div className="flex-center w-full gap-6">
                <div className="w-full">
                  <p className="uppercase font-medium text-indigo-500">
                    Website
                  </p>
                  {isOpenUpdate ? (
                    <InputControl
                      name="website"
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="Nhập website công ty"
                    />
                  ) : (
                    <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                      <p className="text-sm font-normal text-gray-500">
                        Website công ty
                      </p>
                      <a
                        className="text-md font-medium text-blue-500"
                        href={userInfo?.website}
                      >
                        {userInfo?.website ? userInfo?.website : "Không có"}
                      </a>
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <p className="uppercase font-medium text-indigo-500">
                    Quy mô
                  </p>
                  {isOpenUpdate ? (
                    <InputControl
                      name="sizeCompany"
                      type="text"
                      value={sizeCompany}
                      onChange={(e) => setSizeCompany(e.target.value)}
                      placeholder="Nhập số lượng nhân sự trong công ty"
                    />
                  ) : (
                    <div className="w-full min-h-9 bg-gray-200  rounded-lg py-2 px-4">
                      <p className="text-sm font-normal text-gray-500">
                        Số lượng nhân sự
                      </p>
                      <p className="text-md font-medium text-gray-500 ">
                        {userInfo?.sizeCompany
                          ? userInfo?.sizeCompany
                          : "Không có"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* skills and industries */}
              <div className="flex items-start w-full gap-6">
                <div className="rounded-lg w-1/2 bg-white drop-shadow-lg ml-1">
                  <div className="flex-between bg-orange-200 border-b-2 border-solid border-gray-200 px-3 py-2">
                    <p className="text-xl font-medium text-indigo-700">
                      Các kỹ năng
                    </p>
                    {isOpenUpdate ? (
                      !isAddSkills ? (
                        <button
                          className="flex items-center py-[6px] px-3  bg-[#239ce2] rounded-md text-white outline-none font-medium text-base
                                                            active:translate-y-1 hover:translate-y-1 "
                          onClick={handleAddSkills}
                        >
                          Thêm
                          <IoMdAdd className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsAddSkills(false)}
                          className="bg-red-500 text-white px-4 py-2 font-medium rounded-md hover:translate-y-1 active:translate-y-1"
                        >
                          Trở về
                        </button>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  {isAddSkills && isOpenUpdate ? (
                    <div className="flex-center flex-col mt-3 w-full">
                      <Select
                        placeholder="Chọn kỹ năng công ty"
                        mode="multiple"
                        value={skillOfCompany}
                        tagRender={tagRender}
                        onChange={(val) => setSkillOfCompany(val)}
                        style={{
                          width: "98%",
                          minHeight: "43px",
                          border: "1px solid gray",
                          borderRadius: "6px",
                        }}
                        options={dataSkills?.map((skill) => ({
                          value: skill.value,
                          label: skill.label,
                        }))}
                      />
                    </div>
                  ) : (
                    <div className="max-h-[300px] flex flex-col gap-1 overflow-y-scroll no-scrollbar">
                      <div className="  bg-slate-50 flex flex-col ">
                        {skillOfCompany.map((skill, idx) => (
                          <div
                            key={idx}
                            className="flex-between hover:bg-indigo-200 px-5 py-2  border-b-[2px] border-solid border-gray-200 "
                          >
                            <div className="text-base font-normal">
                              &#10017; {convertData(dataSkills, skill)}
                            </div>
                            {isOpenUpdate ? (
                              <Tooltip
                                placement="right"
                                title={"Xóa kỹ năng này"}
                              >
                                <button
                                  className="text-xl font-medium text-red-500 cursor-pointer z-10"
                                  onClick={(e) => handleDeleteSkills(e, idx)}
                                >
                                  <FaDeleteLeft />
                                </button>
                              </Tooltip>
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-lg w-1/2 bg-white drop-shadow-lg ml-1">
                  <div className="flex-between bg-orange-200 border-b-2 border-solid border-gray-200 px-3 py-2">
                    <p className="text-xl font-medium text-green-600">
                      Lĩnh vực của công ty
                    </p>
                    {isOpenUpdate ? (
                      !isAddIndustry ? (
                        <button
                          className="flex items-center py-[6px] px-3  bg-[#239ce2] rounded-md text-white outline-none font-medium text-base
                                                            active:translate-y-1 hover:translate-y-1 "
                          onClick={handleAddIndustrys}
                        >
                          Thêm
                          <IoMdAdd className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsAddIndustry(false)}
                          className="bg-red-500 text-white px-4 py-2 font-medium rounded-md hover:translate-y-1 active:translate-y-1"
                        >
                          Trở về
                        </button>
                      )
                    ) : (
                      ""
                    )}
                  </div>

                  {isAddIndustry && isOpenUpdate ? (
                    <div className="flex-center flex-col mt-3 w-full">
                      <Select
                        placeholder="Chọn các lĩnh vực của công ty"
                        mode="multiple"
                        value={industryCompany}
                        tagRender={tagRender}
                        onChange={(val) => setIndustryCompany(val)}
                        style={{
                          width: "98%",
                          minHeight: "43px",
                          border: "1px solid gray",
                          borderRadius: "6px",
                        }}
                        options={dataIndustry?.map((industry) => ({
                          value: industry.value,
                          label: industry.label,
                        }))}
                      />
                    </div>
                  ) : (
                    <div className="max-h-[300px] flex flex-col gap-1 overflow-y-scroll no-scrollbar">
                      <div className="  bg-slate-50 flex flex-col  ">
                        {industryCompany.map((industry, idx) => (
                          <div
                            key={idx}
                            className="flex-between hover:bg-green-200 gap-3 border-b-[2px] border-solid border-gray-200 px-5 py-2"
                          >
                            <div className="text-base font-normal">
                              &#10055; {convertData(dataIndustry, industry)}
                            </div>
                            {isOpenUpdate ? (
                              <Tooltip
                                placement="right"
                                title={"Xóa lĩnh vực này"}
                              >
                                <button
                                  className="text-xl font-medium text-red-500 cursor-pointer z-10"
                                  onClick={(e) => handleDeleteIndustry(e, idx)}
                                >
                                  <FaDeleteLeft />
                                </button>
                              </Tooltip>
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* locations and benefits */}
              <div className="flex items-start w-full gap-6">
                {isOpenUpdate ? (
                  <>
                    {/* location */}
                    <div className="flex flex-col  my-3 gap-1 w-1/2">
                      <div className="flex-between gap-2 ml-2">
                        <label className="text-lg font-medium text-indigo-600 ">
                          Các chi nhánh
                        </label>
                        <button
                          className="flex items-center py-[6px] px-3  bg-[#239ce2] rounded-md text-white outline-none font-medium text-base
                                                            active:translate-y-1 hover:translate-y-1 "
                          onClick={(e) => {
                            handleLocationsClick(e);
                          }}
                        >
                          Thêm
                          <IoMdAdd className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex flex-col my-3 gap-3 overflow-y-scroll no-scrollbar max-h-[300px]">
                        {locations?.map((item, idx) => (
                          <div className="flex-center " key={idx}>
                            <InputControl
                              placeholder={`Chi nhánh ${idx + 1}`}
                              value={item}
                              type="text"
                              styles=" !focus:outline-none !rounded-md py-2"
                              onChange={(e) => {
                                handleLocationsUpdate(e, idx);
                              }}
                            />
                            <button
                              className="p-1 bg-red-500 border-solid border-red-500 mt-1 border-2 rounded-md text-white outline-none font-medium 
                                                                        active:translate-y-1 "
                              onClick={(e) => {
                                handleLocationsDelete(e, idx);
                              }}
                            >
                              <MdDelete className="w-7 h-7" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* benefits */}
                    <div className="flex flex-col  my-3 gap-1 w-1/2">
                      <div className="flex-between gap-2 ml-2">
                        <label className="text-lg font-medium text-indigo-600 ">
                          Các phúc lợi
                        </label>
                        <button
                          className="flex items-center py-[6px] px-3  bg-[#239ce2] rounded-md text-white outline-none font-medium text-base
                                                            active:translate-y-1 hover:translate-y-1"
                          onClick={(e) => {
                            handleBenefitsClick(e);
                          }}
                        >
                          Thêm
                          <IoMdAdd className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex flex-col my-3 gap-3 overflow-y-scroll no-scrollbar max-h-[300px]">
                        {benefits?.map((item, idx) => (
                          <div className="flex-center " key={idx}>
                            <InputControl
                              placeholder={`Phúc lợi ${idx + 1}`}
                              value={item}
                              type="text"
                              styles=" !focus:outline-none !rounded-md py-2"
                              onChange={(e) => {
                                handleBenefitsUpdate(e, idx);
                              }}
                            />
                            <button
                              className="p-1 bg-red-500 border-solid border-red-500 mt-1 border-2 rounded-md text-white outline-none font-medium 
                                                                active:translate-y-1 "
                              onClick={(e) => {
                                handleBenefitDelete(e, idx);
                              }}
                            >
                              <MdDelete className="w-7 h-7" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* locations */}
                    <div className="w-1/2 min-h-9 bg-slate-50 drop-shadow-md">
                      <p className="text-lg text-indigo-600 font-medium bg-orange-200 py-2 px-4">
                        Các chi nhánh
                      </p>
                      {userInfo?.addressDetail.length > 0 ? (
                        <ul className="w-full max-h-[300px] py-2 px-4 mx-4 overflow-y-scroll no-scrollbar">
                          {locations.map((branch, idx) => (
                            <li key={`branch-${idx}`} className="list-disc">
                              {branch}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-md font-medium text-gray-500 py-2 px-4 ">
                          Không có
                        </p>
                      )}
                    </div>

                    {/* benefits */}
                    <div className="w-1/2 min-h-9 bg-slate-50 drop-shadow-md">
                      <p className="text-lg text-indigo-600 font-medium bg-orange-200 py-2 px-4">
                        Các phúc lợi
                      </p>

                      {userInfo?.benefits.length > 0 ? (
                        <ul className="w-full max-h-[300px] py-2 px-5 mx-4 overflow-y-scroll no-scrollbar">
                          {benefits.map((branch, idx) => (
                            <li key={`branch-${idx}`} className="list-decimal">
                              {branch}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-md font-medium text-gray-500 py-2 px-4 ">
                          Không có
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* benefits */}
              </div>

              {/* info desc of company */}
              <div className="flex items-start w-full gap-6">
                <div className="">
                  <p className="uppercase text-base font-medium text-indigo-700">
                    Mô tả công ty
                  </p>
                  {isOpenUpdate ? (
                    <textarea
                      className="border-2 border-solid border-gray shadow-lg rounded-xl px-3 py-2 mt-2 mx-2 outline-none"
                      name="textarea"
                      rows="15"
                      placeholder="Nhập thông tin của công ty vào đây"
                      cols="90"
                      value={infoOfCompany}
                      onChange={(e) => setInfoOfCompany(e.target.value)}
                    ></textarea>
                  ) : (
                    <textarea
                      className="border-2 border-solid border-gray shadow-lg rounded-xl px-3 py-2 mt-2 mx-2 outline-none"
                      name="textarea"
                      rows="15"
                      value={infoOfCompany}
                      cols="90"
                      disabled
                    ></textarea>
                  )}
                </div>
              </div>

              {/* images of company */}

              <div
                className={`space-y-3 ${
                  imagesUrl.length > 0 ? "block" : "hidden"
                }`}
              >
                <p className="uppercase text-base font-medium text-indigo-700">
                  Các hình ảnh của công ty
                </p>

                <div className="w-full flex items-center gap-4 flex-wrap ">
                  {imagesUrl.map((imgItem, idx) => (
                    <div key={idx} className="rounded shadow-md border">
                      <Image src={imgItem} className="w-48 p-1" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // user
            <>
              <div className="min-h-96">
                <p className="text-indigo-500 font-medium uppercase">
                  Đã ứng tuyển
                </p>
                {!dataApply || dataApply?.length === 0 ? (
                  <div className="flex-center h-full">
                    <Image
                      src={emptyCoverImage}
                      alt="empty-data"
                      className="w-80 mx-auto"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 my-3">
                    {dataApply?.map((apply, idx) => (
                      <div
                        key={idx}
                        className="flex w-full gap-4 border-2 border-solid border-gray-200 rounded-md p-5 
                                                        hover:border-indigo-300 cursor-pointer"
                      >
                        <div className="w-2/3">
                          <div className="flex flex-col gap-2">
                            <p className="font-medium w-[90%] truncate">
                              {" "}
                              {apply.post?.name}{" "}
                            </p>
                            <div className="flex gap-2 text-sm text-gray-600">
                              {apply.post?.skills
                                ?.slice(0, 3)
                                .map((skill, idxx) => (
                                  <p
                                    key={idxx}
                                    className=" bg-indigo-200 px-2 rounded-sm"
                                  >
                                    {skill}
                                  </p>
                                ))}
                            </div>
                          </div>
                        </div>
                        <div className="w-1/3 flex-col gap-2">
                          <div className="font-medium text-xs flex justify-end">
                            {apply.status === "await" ? (
                              <p className="bg-amber-300 text-white px-2 py-1 mx-2  rounded-md">
                                Đang chờ
                              </p>
                            ) : apply.status === "successful" ? (
                              <p className="bg-[#0BC1B6] text-white px-2 py-1 mx-2  rounded-md">
                                Đã xác nhận
                              </p>
                            ) : apply.status === "scheduled" ? (
                              <p className="bg-indigo-500 text-white px-2 py-1 mx-2  rounded-md">
                                Đã lên lịch hẹn
                              </p>
                            ) : apply.status === "cancel" ? (
                              <p className="bg-red-400 text-white px-2 py-1 mx-2  rounded-md">
                                Đã hủy
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                          <p className="flex justify-end ">
                            Ứng tuyển
                            <span className="mx-1 font-medium  text-green-600">
                              {convertDateFormat(apply.createdAt)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
