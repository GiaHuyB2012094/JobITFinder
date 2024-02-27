import { useEffect, useState } from "react"
import InputControl from "../InputControl";
import { IoClose } from "react-icons/io5";
import ImageUpload from "./ImageUpload";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
const Editor = ({sections, information, setInformation}) => {
    const [actionSectionKey, setActionSectionKey] = useState(Object.keys(sections)[0])
    
    const [sectionTitle, setSectionTitle] = useState(sections[Object.keys(sections)[0]])

    const [activeInfo, setActiveInfo] = useState(information[sections[Object.keys(sections)[0]]])
   
    const [activeDetailIdx, setActiveDetailIdx] = useState(0);

    const [imageUrl, setImageUrl] = useState("");

    const [isUpload, setIsUpload] = useState(false);

    const [values, setValues] = useState({
        name: activeInfo?.detail?.name || "",
        title: activeInfo?.detail?.title || "",
        linkedin: activeInfo?.detail?.linkedin || "",
        github: activeInfo?.detail?.github || "",
        phone: activeInfo?.detail?.phone || "",
        email: activeInfo?.detail?.email || "",
        avatarImg: activeInfo?.detail?.avatarImg || "",
     })

    const handlePointUpdate = (val, idx) => {
        const tempValues = { ...values };
        if (actionSectionKey==="skills") {
            if (!Array.isArray(tempValues.points)) tempValues.points = [{name:"",skills:""}];
            const {name, value} = val.target
            tempValues.points[idx][name] = value
            setValues(tempValues);

        } else {
            if (!Array.isArray(tempValues.points)) tempValues.points = [];
            tempValues.points[idx] = val;
            setValues(tempValues);
        }
    }
    const handlePointsClick = () => {
        if (actionSectionKey==="skills") {
            setValues(prev =>  ({...prev, points: [...prev.points,{}]}))
        } else {
            setValues(prev =>  ({...prev, points: [...prev.points,""]}))
        }
    }
    const handlePointsDelete = (idx) => {
        const tempValues = { ...values };
        if (tempValues.points.length <= 1) return
        tempValues.points.splice(idx,1);
        setValues(tempValues);
    }
    let resultInputGroup = ""
    switch (actionSectionKey) {
        case "workExp":
            resultInputGroup = (
                <div className="flex flex-col gap-3">
                    <div className="flex">
                        <InputControl
                            label="Lĩnh vực"
                            value={values.title}
                            placeholder="Nhập lĩnh vực có kinh nghiệm. VD: Front-end"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, title: e.target.value}))
                            )}
                        />
                        <InputControl
                            label="Tên Công ty"
                            value={values.companyName}
                            placeholder="Nhập tên công ty. VD: TechupCorp"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, companyName: e.target.value}))
                            )}
                        />
                    </div>
                    <div className="flex">
                        <InputControl
                            label="Certificate Link"
                            value={values.certificateLink}
                            placeholder="Nhập certificate link"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, certificateLink: e.target.value}))
                            )}
                        />
                        <InputControl
                            label="Ví trí công việc"
                            value={values.location}
                            placeholder="Nhập vị trí công việc. VD: remote"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, location: e.target.value}))
                            )}
                        />
                    </div>
                    <div className="flex">
                        <InputControl
                            label="Ngày bắt đầu"
                            value={values.startDate}
                            placeholder="Nhập ngày bắt đầu công việc"
                            type="date"
                            onChange={e => (
                                setValues(prev => ({...prev, startDate: e.target.value}))
                            )}
                        />
                        <InputControl
                            label="Ngày kết thúc"
                            value={values.endDate}
                            placeholder="Nhập ngày kết thúc công việc"
                            type="date"
                            onChange={e => (
                                setValues(prev => ({...prev, endDate: e.target.value}))
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-600 text-sm mb-1 font-medium">Mô tả công việc</label>
                            <button 
                                className="flex items-center py-1 px-2 bg-transparent border-solid border-[#239ce2] border-2 rounded-md text-[#239ce2] outline-none font-medium text-base
                                    active:translate-y-1"
                                onClick={handlePointsClick}
                            >
                                Thêm 
                                <IoMdAdd className="w-5 h-5" />
                            </button>
                        </div>

                        { 
                        values?.points ?
                            values.points.map((val,idx) => (
                                <div
                                    className="flex items-center"
                                    key={idx}>
                                    <InputControl 
                                        placeholder={`Dòng ${idx + 1}`}
                                        value={val}
                                        type='text'
                                        onChange={e => handlePointUpdate(e.target.value,idx)}
                                    />
                                    <button 
                                        className="mt-3 p-1 bg-transparent border-solid border-[#C06A47] border-2 rounded-md text-[#C06A47] outline-none font-medium 
                                            active:translate-y-1 "
                                        onClick={()=>{handlePointsDelete(idx)}}
                                    >
                                        <MdDelete 
                                        className="w-7 h-7"
                                        />
                                    </button>
                                    
                                </div>
                            )) : ""
                        }



                    </div>
                </div>
            )
            break;
        case "skills":
            resultInputGroup = (
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3 overflow-y-scroll no-scrollbar max-h-[500px]">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-600 text-sm mb-1 font-medium">Danh sách các kỹ năng</label>
                            <button 
                                className="flex items-center py-1 px-2 bg-transparent border-solid border-[#239ce2] border-2 rounded-md text-[#239ce2] outline-none font-medium text-base
                                    active:translate-y-1"
                                onClick={handlePointsClick}
                            >
                                Thêm 
                                <IoMdAdd className="w-5 h-5" />
                            </button>
                        </div>

                        { 
                        values?.points ?
                            values.points.map((val,idx) => (
                                <div
                                    className="flex flex-col w-full items-center pb-3 border-b-2 border-solid border-gray-300"
                                    key={idx}>
                                    <div className="flex w-full">
                                        <InputControl 
                                            label="Tên"
                                            placeholder="Ngôn ngữ, Framework, Công cụ"
                                            value={val?.name}
                                            type='text'
                                            name="name"
                                            onChange={e => handlePointUpdate(e,idx)}
                                        />
                                        <button 
                                            className="mt-8 p-1 bg-transparent border-solid border-[#C06A47] border-2 rounded-md text-[#C06A47] outline-none font-medium 
                                                active:translate-y-1 "
                                            onClick={()=>{handlePointsDelete(idx)}}
                                        >
                                            <MdDelete 
                                            className="w-7 h-7"
                                            />
                                        </button>
                                    </div>
                                    <InputControl 
                                        label="Kỹ năng"
                                        placeholder="Nhập các kỹ năng"
                                        value={val?.skills}
                                        type='text'
                                        name="skills"
                                        onChange={e => handlePointUpdate(e,idx)}
                                    />
                                </div>
                            )) : ""
                        }



                    </div>
                </div>
            )
            break;
        case "project":
            resultInputGroup = (
                <div className="flex flex-col gap-3">
                    <div className="flex">
                        <InputControl
                            label="Tên Dự Án"
                            value={values.title}
                            placeholder="Nhập tên dự án. Chat app"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, title: e.target.value}))
                            )}
                        />
                    </div>
                    <InputControl
                            label="Tổng quan"
                            value={values.overview}
                            placeholder="Nêu tổng quan về dự án"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, overview: e.target.value}))
                            )}
                        />
                    <div className="flex">
                        <InputControl
                            label="Link dự án"
                            value={values.link}
                            placeholder="Nhập link đã deploy của dự án"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, link: e.target.value}))
                            )}
                        />
                        <InputControl
                            label="Github Link"
                            value={values.github}
                            placeholder="Điền link github vào"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, github: e.target.value}))
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <label className="text-gray-600 text-sm mb-1 font-medium">Mô tả chi tiết các chức năng & nhiệm vụ của dự án</label>
                                <button 
                                    className="flex items-center py-1 px-2 bg-transparent border-solid border-[#239ce2] border-2 rounded-md text-[#239ce2] outline-none font-medium text-base
                                        active:translate-y-1"
                                    onClick={handlePointsClick}
                                >
                                    Thêm
                                    <IoMdAdd className="w-5 h-5" />
                                </button>
                            </div>
                        { 
                        values?.points ?
                            values.points.map((val,idx) => (
                                <div
                                    className="flex items-center"
                                    key={idx}>
                                    <InputControl 
                                        placeholder={`Dòng ${idx + 1}`}
                                        value={val}
                                        type='text'
                                        onChange={e => handlePointUpdate(e.target.value,idx)}
                                    />
                                    <button 
                                        className="mt-3 p-1 bg-transparent border-solid border-[#C06A47] border-2 rounded-md text-[#C06A47] outline-none font-medium 
                                            active:translate-y-1 "
                                        onClick={()=>{handlePointsDelete(idx)}}
                                    >
                                        <MdDelete 
                                        className="w-7 h-7"
                                        />
                                    </button>
                                    
                                </div>
                            )) : ""
                        }



                    </div>
                </div>
            )
            break;
        case "education":
            resultInputGroup = (
                <div className="flex flex-col gap-3">
                    <div className="flex">
                        <InputControl
                            label="Ngành học"
                            value={values.title}
                            placeholder="Nhập tên ngành học. VD: Kỹ thuật phần mềm"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, title: e.target.value}))
                            )}
                        />
                    </div>
                    <InputControl
                        label="Tên Trường Cao đẳng/Đại học"
                        value={values.college}
                        placeholder="Nhập tên trường cao đẳng/đại học. VD: CTU"
                        type="text"
                        onChange={e => (
                            setValues(prev => ({...prev, college: e.target.value}))
                        )}
                    />
                    <div className="flex">
                        <InputControl
                            label="Ngày bắt đầu"
                            value={values.startDate}
                            placeholder="Nhập ngày bắt đầu nhập học"
                            type="date"
                            onChange={e => (
                                setValues(prev => ({...prev, startDate: e.target.value}))
                            )}
                        />
                        <InputControl
                            label="Ngày kết thúc"
                            value={values.endDate}
                            placeholder="Nhập ngày dự kiến tốt nghiệp"
                            type="date"
                            onChange={e => (
                                setValues(prev => ({...prev, endDate: e.target.value}))
                            )}
                        />
                    </div>
                </div>
            )
            break;  
        case "basicInfo":
            resultInputGroup = (
                <div className="flex flex-col gap-3">
                    <div className="w-full mx-3">
                        <label className="text-gray-600 text-sm font-medium">Hình nền</label>
                        <ImageUpload 
                            isUpload={isUpload}
                            passCloudinaryFileImage={data => {setImageUrl(data)}}
                            ImageFileLocal={data => {setImageUrl(data)}}
                            quantity={1}
                            setIsUpload={data => {setIsUpload(data)}}/>
                    </div>

                    <div className="flex">
                        <InputControl
                            label="Họ và tên"
                            value={values.name}
                            placeholder="Nhập đầy đủ tên. VD: Gia Huy"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, name: e.target.value}))
                            )}
                        />  
                        <InputControl
                            label="Nghề Nghiệp"
                            value={values.title}
                            placeholder="Nhập nghề nghiệp. VD: Frontend developer"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, title: e.target.value}))
                            )}
                        />
                    </div>
                    <div className="flex">
                        <InputControl
                            label="Linkedin"
                            value={values.linkedin}
                            placeholder="Nhập link Linkedin của bạn"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, linkedin: e.target.value}))
                            )}
                        />  
                        <InputControl
                            label="Github"
                            value={values.github}
                            placeholder="Nhập link Github của bạn"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, github: e.target.value}))
                            )}
                        />
                    </div>
                    <div className="flex">
                        <InputControl
                            label="Email"
                            value={values.email}
                            placeholder="Nhập link Email của bạn"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, email: e.target.value}))
                            )}
                        />  
                        <InputControl
                            label="Số điện thoại"
                            value={values.phone}
                            placeholder="Nhập số điện thoại"
                            type="text"
                            onChange={e => (
                                setValues(prev => ({...prev, phone: e.target.value}))
                            )}
                        />
                    </div>
                </div>
            )
            break;
        case "achievements":
            resultInputGroup = (
                <div className="flex flex-col gap-3">
                   <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-600 text-sm mb-1 font-medium">Danh sách các thành tích</label>
                            <button 
                                className="flex items-center py-1 px-2 bg-transparent border-solid border-[#239ce2] border-2 rounded-md text-[#239ce2] outline-none font-medium text-base
                                    active:translate-y-1"
                                onClick={handlePointsClick}
                            >
                                Thêm
                                <IoMdAdd className="w-5 h-5" />
                            </button>
                        </div>
                        { 
                        values?.points ?
                            values.points.map((val,idx) => (
                                <div
                                    className="flex items-center"
                                    key={idx}>
                                    <InputControl 
                                        placeholder={`Dòng ${idx + 1}`}
                                        value={val}
                                        type='text'
                                        onChange={e => handlePointUpdate(e.target.value,idx)}
                                    />
                                    <button 
                                        className="mt-3 p-1 bg-transparent border-solid border-[#C06A47] border-2 rounded-md text-[#C06A47] outline-none font-medium 
                                            active:translate-y-1 "
                                        onClick={()=>{handlePointsDelete(idx)}}
                                    >
                                        <MdDelete 
                                        className="w-7 h-7"
                                        />
                                    </button>
                                    
                                </div>
                            )) : ""
                        }

                    </div>
                </div>
            )
            break; 
        case "language":
            resultInputGroup = (
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-600 text-sm mb-1 font-medium">Ngôn ngữ</label>
                            <button 
                                className="flex items-center py-1 px-2 bg-transparent border-solid border-[#239ce2] border-2 rounded-md text-[#239ce2] outline-none font-medium text-base
                                    active:translate-y-1"
                                onClick={handlePointsClick}
                            >
                                Thêm
                                <IoMdAdd className="w-5 h-5" />
                            </button>
                        </div>
                        { 
                        values?.points ?
                            values.points.map((val,idx) => (
                                <div
                                    className="flex items-center"
                                    key={idx}>
                                    <InputControl 
                                        placeholder={`Dòng ${idx + 1}`}
                                        value={val}
                                        type='text'
                                        onChange={e => handlePointUpdate(e.target.value,idx)}
                                    />
                                    <button 
                                        className="mt-3 p-1 bg-transparent border-solid border-[#C06A47] border-2 rounded-md text-[#C06A47] outline-none font-medium 
                                            active:translate-y-1 "
                                        onClick={()=>{handlePointsDelete(idx)}}
                                    >
                                        <MdDelete 
                                        className="w-7 h-7"
                                        />
                                    </button>
                                    
                                </div>
                            )) : ""
                        }

                    </div>
                </div>
            )
            break; 
        case "summary":
            resultInputGroup = (
                <div className="flex flex-col gap-3">
                    <InputControl
                        label="Summary"
                        value={values.summary}
                        placeholder="Enter your objective/summary"
                        type="text"
                        onChange={e => (
                            setValues(prev => ({...prev, summary: e.target.value}))
                        )}
                    />
                </div>
            )
            break;
        case "other":
            resultInputGroup = (
                <div className="flex flex-col gap-5">
                    <InputControl
                        label="Other"
                        value={values.other}
                        placeholder="Enter something"
                        type="text"
                        onChange={e => (
                            setValues(prev => ({...prev, other: e.target.value}))
                        )}
                    />
                </div>
            )
            break;  
        default:
            resultInputGroup = ""
    }

    const handleSubmission = async() => {
        switch (actionSectionKey) {
            case "workExp":{
                const tempDetail = {
                    certificateLink: values.certificateLink,
                    title: values.title,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    companyName: values.companyName,
                    location: values.location,
                    points: values.points,
                };
                const tempDetails = [...information[sections.workExp].details];
                tempDetails[activeDetailIdx] = tempDetail;

                setInformation(prev => ({
                    ...prev,
                    [sections.workExp]: {
                        ...prev[sections.workExp],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case "project":{
                const tempDetail = {
                    link: values.link,
                    title: values.title,
                    overview: values.overview,
                    github: values.github,
                    points: values.points,
                };
                const tempDetails = [...information[sections.project].details];
                tempDetails[activeDetailIdx] = tempDetail;

                setInformation(prev => ({
                    ...prev,
                    [sections.project]: {
                        ...prev[sections.project],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case "education":{
                const tempDetail = {
                    title: values.title,
                    college: values.college,
                    startDate: values.startDate,
                    endDate: values.endDate,
                };
                const tempDetails = [...information[sections.education].details];
                tempDetails[activeDetailIdx] = tempDetail;

                setInformation(prev => ({
                    ...prev,
                    [sections.education]: {
                        ...prev[sections.education],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case "basicInfo": {
                    setIsUpload(true);
                    const tempDetail = {
                        name: values.name,
                        title: values.title,
                        linkedin: values.linkedin,
                        github: values.github,
                        email: values.email,
                        phone: values.phone,
                        avatarImg: values.avatarImg,
                    };
                    setInformation(prev => ({
                        ...prev,
                        [sections.basicInfo]: {
                            ...prev[sections.basicInfo],
                            detail: {...tempDetail},
                            sectionTitle,
                        },
                    }));
                    break;
            }
            case "skills":{
                const tempPoints = values.points;
                
                setInformation(prev => ({
                    ...prev,
                    [sections.skills]: {
                        ...prev[sections.skills],
                        points: tempPoints,
                        sectionTitle,
                    },
                }));
                break;
            }
            case "achievements":{
                const tempPoints = values.points;
                
                setInformation(prev => ({
                    ...prev,
                    [sections.achievements]: {
                        ...prev[sections.achievements],
                        points: tempPoints,
                        sectionTitle,
                    },
                }));
                break;
            }
            case "language":{
                const tempPoints = values.points;
                
                setInformation(prev => ({
                    ...prev,
                    [sections.language]: {
                        ...prev[sections.language],
                        points: tempPoints,
                        sectionTitle,
                    },
                }));
                break;
            }
            case "summary":{
                const tempDetail = values.summary;

                setInformation(prev => ({
                    ...prev,
                    [sections.summary]: {
                        ...prev[sections.summary],
                        detail: tempDetail,
                        sectionTitle,
                    },
                }));
                break;
            }
            case "other":{
                const tempDetail = values.other;

                setInformation(prev => ({
                    ...prev,
                    [sections.other]: {
                        ...prev[sections.other],
                        detail: tempDetail,
                        sectionTitle,
                    },
                }));
                break;
            }
            default: 
                return null
        }
    }
    const handleAddNew = () => {
        const details = activeInfo?.details; 
        if (!details) return;
        const lastDetail = details.slice(-1)[0];
        if (!Object.keys(lastDetail).length) return;
        details?.push({});
        setInformation(prev => ({
            ...prev,
            [sections[actionSectionKey]] : {
                ...information[sections[actionSectionKey]],
                details: details,
            },
        }));
        // setActiveDetailIdx(details?.length + 1);
        setActiveDetailIdx(prev => prev += 1);
    }
    const handleDeleteDetail = (idx) => {
        const details = activeInfo?.details
            ? [...activeInfo.details] 
            : "";
        if (!details) return;
        details.splice(idx,1);
        setInformation(prev => ({
            ...prev,
            [sections[actionSectionKey]]: {
                ...information[sections[actionSectionKey]],
                details: details,
            },
        }));

        setActiveDetailIdx((prev) => (prev === idx ? 0 : prev - 1));

    } 
    useEffect(() => {
        const activeInf = information[sections[actionSectionKey]];
        setActiveInfo(activeInf);
        setSectionTitle(sections[actionSectionKey]);
        setActiveDetailIdx(0);
        setValues({
            name: activeInf?.detail?.name || "",
            overview: activeInf?.details 
                ? activeInf?.details[0]?.overview || ""
                : "",
            location: activeInf?.details 
                ? activeInf?.details[0]?.location || ""
                : "",
            link: activeInf?.details 
                ? activeInf?.details[0]?.link || ""
                : "",
            companyName: activeInf?.details 
                ? activeInf?.details[0]?.companyName || ""
                : "",
            certificateLink: activeInf?.details 
                ? activeInf?.details[0]?.certificateLink || ""
                : "",
            startDate: activeInf?.details 
                ? activeInf?.details[0]?.startDate || ""
                : "",
            endDate: activeInf?.details 
                ? activeInf?.details[0]?.endDate || ""
                : "",
            points: 
                activeInf?.details 
                    ? activeInf.details[0]?.points
                        ? [...activeInf.details[0].points] 
                            : [""]
                    : activeInf?.points
                        ? [...activeInf.points]
                        : actionSectionKey==="skills" 
                            ? [{}]   
                            : [""],
            title: activeInf?.details
                ? activeInf.details[0]?.title || ""
                : activeInf?.detail?.title || "",
            linkedin: activeInf?.detail?.linkedin || "",
            github: activeInf?.details
                ? activeInf.details[0]?.github || ""
                : activeInf?.detail?.github || "",
            phone: activeInf?.detail?.phone || "",
            summary: typeof activeInf?.detail !== Object 
                ? activeInf.detail 
                : "" ,
            other: typeof activeInf?.detail !== Object 
                ? activeInf.detail 
                : "" ,
            email: activeInf?.detail?.email || "",
            avatarImg: activeInf?.detail?.avatarImg || "",
         })
    },[actionSectionKey])
    
    useEffect(() => {
        setActiveInfo(information[sections[actionSectionKey]])
    },[information])
    
    useEffect(()=>{
        console.log(imageUrl)
        setValues(prev => ({...prev, avatarImg: imageUrl[0]}))
        const tempDetail = {
            name: values.name,
            title: values.title,
            linkedin: values.linkedin,
            github: values.github,
            email: values.email,
            phone: values.phone,
            avatarImg: imageUrl[0],
        };
        setInformation(prev => ({
            ...prev,
            [sections.basicInfo]: {
                ...prev[sections.basicInfo],
                detail: {...tempDetail},
                sectionTitle,
            },
        }));
    },[imageUrl])

    useEffect(() => {
        const details = activeInfo?.details;
        if (!details) return;
        const activeInf = information[sections[actionSectionKey]];
        setValues({
            overview: activeInf.details[activeDetailIdx]?.overview || "",
            link: activeInf.details[activeDetailIdx]?.link || "",
            certificateLink: activeInf.details[activeDetailIdx]?.certificateLink || "",
            companyName: activeInf.details[activeDetailIdx]?.companyName || "",
            location: activeInf.details[activeDetailIdx]?.location || "",
            startDate: activeInf.details[activeDetailIdx]?.startDate || "",
            endDate: activeInf.details[activeDetailIdx]?.endDate || "",
            points: activeInf.details[activeDetailIdx]?.points || [""],
            title: activeInf.details[activeDetailIdx]?.title || "",
            linkedin: activeInf.details[activeDetailIdx]?.linkedin || "",
            github: activeInf.details[activeDetailIdx]?.github || "",
            college: activeInf.details[activeDetailIdx]?.college || "",
        });

        },[activeDetailIdx])
        
    return (
    <section className=" w-2/5 min-h-[450px] h-fit flex flex-col gap-7 shadow-md pt-2 bg-slate-100">
        <div className="flex gap-3 overflow-x-auto border-b-2 border-solid border-slate-200">
        {Object.keys(sections)?.map(key => (
                <div 
                    className={`p-3 border-transparent border-b-2 border-solid text-base font-medium whitespace-nowrap cursor-pointer
                        ${actionSectionKey === key 
                            ? " border-b-4 border-solid border-blue-400 text-[#239ce2]" : ""}
                    `} 
                    key={key}
                    onClick={()=> setActionSectionKey(key)}    
                >
                    {sections[key]}
                </div>
            ))}
        </div>
        <div className="flex flex-col gap-5 px-5">
            <InputControl
                label="Title"
                placeholder="Enter section title"
                value={sectionTitle}
                type="text"
                onChange={e => setSectionTitle(e.target.value)}
            />
            <div className="flex gap-3 flex-wrap max-w-[700px]">
                {activeInfo?.details 
                    ? activeInfo?.details?.map((item,idx) => (
                        <div 
                            className={`flex items-center gap-2 font-medium px-2 py-1 rounded-3xl
                            ${ activeDetailIdx === idx 
                                    ? "bg-[#239ce2]" 
                                    : "bg-black"
                            }`}
                            key={item.title + idx}
                            onClick={() => {
                                setActiveDetailIdx(idx)
                            }}
                        >
                            <p className="text-base text-white">{sections[actionSectionKey]} + {idx+1}</p>
                            <IoClose 
                                className="cursor-pointer text-white text-xl"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteDetail(idx)
                                }}
                            />
                        </div>
                    ))
                    : ""
                }
                {activeInfo?.details && 
                    activeInfo?.details?.length > 0 
                        ? (
                            <div 
                                className="font-semibold cursor-pointer text-lg  text-[#239ce2]"
                                onClick={handleAddNew}    
                            > 
                                +New
                            </div>
                        )  : ""
                }
            </div>
            {resultInputGroup}
        </div>
        <div className="">
            <button 
                className="flex items-center py-2 px-4 mx-6 mb-8 bg-[#239ce2] rounded-md text-white outline-none border-none font-medium text-base
                     active:translate-y-1 "
                onClick={handleSubmission}
            >
                Save
            </button>
        </div>
    </section>
  )
}

export default Editor
