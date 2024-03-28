import { useState } from "react"
import { Button, Image, InputControl, Nav } from "../components";
import { useForm } from "react-hook-form";
import imgSignIn from "../assets/signin.jpg"
import Wave from "react-wavify";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useRegisterUMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import logo from "../assets/JOBITFINDER.png"
import imgVacancy from "../assets/5372072-removebg.png"
import { avatarComp } from "../constants";

const SignInSignUpUser = () => {
    const [isRegister, setIsRegister] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { 
        register,
        handleSubmit,
        getValues,
        formState: {
            errors,
        }
    } = useForm({
        mode: "onChange",
        defaultValues:{
            email:"",
            lastName:"",
            firstName:"",
            password:""
        }
    })

    const [login, { isLoading }] = useLoginMutation()
    
    const [registerU, { isLoading: isLoadingRegister }] = useRegisterUMutation()
    const { userInfo } = useSelector(state => state.auth);

    const onSubmit = async(data) => {
        if (!isRegister) {
           const {email,password} = data;
           try {
                const res = await login({email, password}).unwrap()

                if (res?.position === "user"){
                    dispatch(setCredentials({...res}))

                    toast.success("Đăng nhập thành công");

                    if (userInfo?.position === "admin") {
                        navigate('/admin');
                    } else {
                        navigate('/')
                    }

                } else if (res?.position === "company") {
                    toast.error("Đây là tài khoản công ty");
                }
           } catch (error) {
            toast.error(error?.data?.message || error.error)
           }
        } else {
            const {email,password,firstName,lastName} = data;
            try {
                await registerU({email,password,firstName,lastName, position: "user"}).unwrap();
                // dispatch(setCredentials({...res}));
                toast.success("Đăng ký thành công");
                setIsRegister(false);
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
  return (
    <div className="w-full h-screen">
        <Nav/>
        <main className="flex-center w-full h-[695px]"> 
            <div className="w-[35%] relative px-5 bg-white  h-[707px] flex-center flex-col  shadow-md z-10">
                <p className="text-3xl font-bold text-indigo-500 py-1 uppercase"> {!isRegister ? "Đăng nhập" : "Đăng ký"}</p>
                <p className="text-primary-black p-3 mb-2 border-b-2 border-dashed border-indigo-100">Liên kết tài khoản để sử dụng các dịch vụ của JobsITFinder</p>
                <div className="flex-center flex-col px-8 py-3 gap-2 w-full z-10  rounded-md">
                    <div className="w-full  mx-3 flex-center pb-2 gap-3">
                        <button
                            className={`flex-1 px-4 py-3 rounded text-sm outline-none font-medium
                                ${isRegister
                                    ? "bg-white border border-blue-400"
                                    : "bg-indigo-400 text-white"}
                            `}
                            onClick={() => setIsRegister(false)}
                        >
                            Đăng nhập
                        </button>
                        <button
                            className={`flex-1 px-5 py-3 rounded text-sm outline-none font-medium
                                ${!isRegister
                                    ? "bg-white border border-blue-400"
                                    : "bg-indigo-400 text-white"}
                            `}
                            onClick={() => setIsRegister(true)}
                        >
                            Đăng ký
                        </button>
                    </div>
                    <form
                        className="w-full flex flex-col gap-5 mr-4"
                        onSubmit={handleSubmit(onSubmit)}
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
                        
                        {isRegister && (
                        <div className="flex w-full gap-3 ">
                            <div className={`${isRegister ? "w-1/2" : "w-full"}`}>
                                <InputControl
                                    name="last name"
                                    label="Họ"
                                    placeholder="Nhập họ của bạn. VD: Gia"
                                    type="text"
                                    {...register("lastName", {
                                        required: "Vui lòng nhập họ đầy đủ!",
                                    })}
                                    error={errors.lastname ? errors.lastname.message : ""}
                                />
                            </div>
                            <div className="w-1/2 pr-3">
                                <InputControl
                                    name="first name"
                                    label="Tên"
                                    placeholder="Nhập tên. VD: Huy"
                                    type="text"
                                    {...register("firstName", {
                                        required: "Vui lòng nhập tên đầy đủ!",
                                    })}
                                    error={errors.firstname ? errors.firstname.message : ""}
                                />
                            </div>
                        </div>
                        )}
                        <div className="flex w-full gap-3 ">
                           <div className={`${isRegister ? "w-1/2" : "w-full"}`}>
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
                            {isRegister && (
                                <div className="w-1/2 pr-3">
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
                            )
                            }
                        </div>
                    </form>
                    <Button
                        title={!isRegister ? "Đăng nhập" : "Đăng ký"}
                        medium
                        styles="w-full mt-6 mx-auto"
                        onClick={handleSubmit(onSubmit)}
                    />
                </div>
                <div className="absolute bottom-0 w-full ">
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
            </div>  
            <div className="w-[65%] h-[707px] bg-indigo-400 flex-center flex-col ">
                <Image
                    src={imgVacancy}
                    alt="img-vacancy"
                    className="w-[600px] my-4"
                />
                <p className="text-lg font-bold text-white">JobITFinder miễn phí cho tất cả mọi người, mọi nơi.</p>
                <p className=" text-white text-center w-4/5">Mọi ứng viên muốn tìm kiếm công việc phù hợp, công ty ưa thích với mọi lĩnh vực IT thì JobITFinder sẽ là lựa chọn tốt nhất giành cho bạn với nhiều tính năng mới mẻ</p>
                <div className="flex-center gap-5 my-3 text-white font-medium">
                    {avatarComp?.map((item, idx) => (
                        <div key={idx} className="w-16 h-16 bg-white flex-center flex-col p-1 rounded-lg">
                            <Image
                                src={item}
                                alt={`avatar-company-${idx}`}
                                className=""
                            />
                        </div>
                    ))
                    }
                    <div className="text-lg">+102 Công ty khác</div>
                </div>
            </div>
        </main>
        {isLoading && <Loader/>}
        {isLoadingRegister && <Loader/>}
    </div>
  )
}

export default SignInSignUpUser
