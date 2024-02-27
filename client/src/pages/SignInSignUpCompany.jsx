import { useState } from "react"
import { Button, Image, InputControl, Nav } from "../components";
import imgSignIn from "../assets/BG_IT.jpg"
import imgSignUpCompany from '../assets/signupcompany.png'
import { Select, Space, Tag } from 'antd';
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { getProvinces } from "../api/provincesApi";
import Wave from "react-wavify";
import { useGetSkillsQuery } from "../slices/skillOfCompanyApiSlice";
import { useGetIndustryQuery } from "../slices/industryOfCompanyApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useRegisterUMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import jobITImg from "../assets/5216292-removebg.png";
import workImg from "../assets/5225900-removebg.png";
const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    
    return (
      <Tag
        color={"pink"}
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

const Signin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()
    const { 
        register, 
        handleSubmit, 
        formState: {
            errors,
        }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const onSubmit = async(data) => {
        const { email, password } = data;
        try {
            const res = await login({ email, password}).unwrap()
            console.log(res);
            if (res?.position === "company") {
                dispatch(setCredentials({...res}));
                toast.success("Login successfully");
                navigate('/companies');
            } else {
                toast.error("It is not account company");
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
    return (
        <>
            <p className="text-3xl font-bold text-indigo-500 uppercase">Đăng nhập</p>
            <p className="text-primary-black p-3 mb-2 border-b-2 border-dashed border-indigo-100">Liên kết tài khoản để sử dụng các dịch vụ của JobsITFinder</p>
            <div className="flex-center flex-col py-3 gap-2 w-full  rounded-md px-12">
                <form
                className="w-full flex flex-col gap-5 mr-3"
                >
                    <InputControl
                        name="email"
                        label="Email"
                        placeholder="Nhập email. VD: email@example.com"
                        type="email"
                        {...register("email", {
                            required: "Vui lòng nhập email đầy đủ!",
                        })}
                        error={errors.email ? errors.email.message : ""}
                    />
                    <div className="flex w-full gap-3">
                    <div className="w-full">
                            <InputControl
                                name="password"
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu. VD: 12345568"
                                type="password"
                                {...register("password", {
                                    required: "Vui lòng nhập password đầy đủ!",
                                })}
                                error={errors.password ? errors.password.message : ""}
                            />
                    </div>
                    </div>
                </form>
                <Button
                    title="Đăng nhập"
                    medium
                    styles="w-full mt-6 mx-auto "
                    onClick={handleSubmit(onSubmit)}
                />
            </div>
            <div className="absolute bottom-0 w-full z-0">
                <Wave
                    fill='#6366f1'
                    paused={false}
                    options={{
                        height: 75,
                        amplitude: 30,
                        speed: 0.2,
                        points: 5
                    }}
                />
            </div>
            {isLoading && <Loader/>}
        </>
    )
}
const Signup = () => {
    const [address, setAddress] = useState({value:"thanh_pho_ha_noi", label:"Thành Phố Hà Nội"});
    const [skills, setSkills] = useState([]);
    const [industryList, setIndustryList] = useState([]);

    const { data: provinces } = useQuery("provinces", getProvinces)
    const { data: dataSkillsOfCompany } = useGetSkillsQuery();
    const { data: industryOfCompany } = useGetIndustryQuery();
    

    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const [registerU, { isLoading }] = useRegisterUMutation()


    const { 
        register, 
        handleSubmit, 
        getValues, 
        formState: {
            errors,
        }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            nameCompany: "",
            phone: "",
        }
    })

    const onSubmit = async(data) => {
        if ((industryList.length>0) && (skills.length>0) && (address !== "")) {
            Object.assign(data,{
                industryCompany: industryList,
                skillOfCompany: skills,
            })
            const {
                email,
                password,
                nameCompany,
                industryCompany,
                skillOfCompany,
                phone,
            } = data;
            try {
                await registerU({
                    email,
                    password,
                    nameCompany,
                    industryCompany,
                    skillOfCompany,
                    address,
                    phone,
                    position: "company"
                }).unwrap(); 
                // dispatch(setCredentials({...res}));
                toast.success("Sign up successfully");
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        } else {
            toast.error("Vui lòng điền đẩy đủ thông tin");
            return;
        }
    }
    const handleOnChangeSkillOfCompany = (value) => {
        setSkills(value);
    }
    const handleOnChangeIndustryOfCompany = (value) => {
        setIndustryList(value);
    }
    return (    
        <div className="relative text-white mt-10  px-24 py-10 w-full">
            <Image
                src={jobITImg}
                alt="mlkasdl"
                className="absolute right-0 top-[7%] w-[520px]"
            />
            <Image
                src={workImg}
                alt="mlkasdl"
                className="absolute left-0 bottom-0 w-[520px]"
            />
            <div className="z-10 w-full z-10">
                <p className="text-2xl font-bold text-indigo-600 uppercase py-2">Đăng ký tài khoản nhà tuyển dụng</p> 
                <p className="text-indigo-600 mb-2">Tạo ngay tài khoản để tuyển dụng các ứng viên hàng đầu trên JobsITFinder</p>
                <div className="flex-center flex-col px-8 py-2 gap-3 min-w-[450px] ">
                    <form
                        className="w-4/5 flex flex-col gap-3 z-10 bg-[rgba(240,240,240,0.4)] rounded-md px-10 py-8 backdrop-blur-sm"
                    >
                        <p className="text-lg text-indigo-700 font-medium">Thông tin đăng nhập</p>
                            <div className="w-full flex flex-col gap-2 mr-3 ">
                                <InputControl
                                    name="email"
                                    label="Email"
                                    placeholder="Nhập email. VD: email@example.com"
                                    type="email"
                                    {...register("email", {
                                        required: "Vui lòng nhập email đầy đủ!",
                                    })}
                                    error={errors.email ? errors.email.message : ""}
                                />
                                <InputControl
                                    name="phone"
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại. VD: 12345568"
                                    type="text"
                                    {...register("phone", {
                                        required: "Vui lòng nhập số điện thoại đầy đủ!",
                                    })}
                                    error={errors.phone ? errors.phone.message : ""}
                                />
                                <InputControl
                                    name="password"
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu. VD: 12345568"
                                    type="password"
                                    {...register("password", {
                                        required: "Vui lòng nhập password đầy đủ!",
                                    })}
                                    error={errors.password ? errors.password.message : ""}
                                />
                                <InputControl
                                    name="confirm password"
                                    label="Nhập lại mật khẩu"
                                    placeholder="Nhập lại mật khẩu"
                                    type="password"
                                    {...register("cPassword", {
                                        validate: value => {
                                            const {password} = getValues();
                                            if (password !== value) {
                                                return "Mật khẩu không khớp"
                                            }
                                        },
                                    })}
                                    error={errors.cPassword && errors.cPassword.type === "validate" ? errors.cPassword.message : ""}
                                />
                            </div>
                            <p className="text-lg text-indigo-700 font-medium">Thông tin công ty</p>
                            <InputControl
                                name="name company"
                                label="Công ty"
                                placeholder="Nhập công ty của bạn"
                                type="text"
                                {...register("nameCompany", {
                                    required: "Vui lòng nhập tên công ty đầy đủ!",
                                })}
                                error={errors.nameCompany ? errors.nameCompany.message : ""}
                            />
    
                        <div className="flex flex-col mt-0 w-full mx-0">
                            <p className="text-gray-600 text-sm font-medium mb-1">Lĩnh vực</p>
                            <Select
                                placeholder="Chọn lĩnh vực công ty"
                                mode="multiple"
                                tagRender={tagRender}
                                onChange={handleOnChangeIndustryOfCompany}
                                style={{ width: '100%',height: "43px",  border: "1px solid gray", borderRadius: "6px" }}
                                options={industryOfCompany?.map((industry) => ({value: industry.value, label: industry.label}))}
                            />
                            {(industryList.length === 0) && <span className="text-xs text-red-500 mt-0.5">Vui lòng chọn lĩnh vực của công ty</span>}
                        </div>
    
                        <div className="flex flex-col mt-0 w-full mx-0">
                            <p className="text-gray-600 text-sm font-medium mb-1">Kỹ năng công ty</p>
                            <Select
                                placeholder="Chọn kỹ năng công ty"
                                mode="multiple"
                                tagRender={tagRender}
                                onChange={handleOnChangeSkillOfCompany}
                                style={{ width: '100%', height: "43px",  border: "1px solid gray", borderRadius: "6px" }}
                                options={dataSkillsOfCompany?.map((skill) => ({value: skill.value, label: skill.label}))}
                            />
                            {(skills.length === 0) && <span className="text-xs text-red-500 mt-0.5">Vui lòng chọn kỹ năng của công ty</span>}
                        </div>
                        
                        <div className="flex flex-col mt-0 w-full mx-0">
                            <p className="text-gray-600 text-sm font-medium mb-1">Trụ sở công ty</p>
                            <Select
                                placeholder="Chọn trụ sở công ty"
                                style={{ width: "100%", height: "43px", border: "1px solid gray", borderRadius: "6px"}}
                                allowClear
                                value={address}
                                onChange={setAddress}
                                options={provinces?.map((province) => ({value: province.province_name, label: province.province_name}))}
                                />
                            {(address === "") && <span className="text-xs text-red-500 mt-0.5">Vui lòng chọn trụ sở của công ty</span>}
                        </div>
                            
                    </form>
                    <Button
                        title="Đăng ký"
                        medium
                        styles="w-4/5 my-2 z-10"
                        onClick={handleSubmit(onSubmit)}
                    />
                </div>
            </div>
        </div>
    )
}
const SignInSignUpCompany = () => {
  return (
    <div className="w-full h-screen">
    <Nav/>
    <main className="flex-center w-full h-[695px]">
        {/* Left */}
        <div className="relative w-[35%] bg-white h-[707px] flex-center flex-col shadow-md z-10">
            <Signin/>            
        </div>  
        {/* Right */}
        <div className="w-[65%] bg-indigo-300 gap-1 h-full flex flex-col overflow-y-scroll no-scrollbar">
            <Signup/>
        </div>
    </main>
</div>
  )
}

export default SignInSignUpCompany
