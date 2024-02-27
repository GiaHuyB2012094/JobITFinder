import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";    
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { colors } from "../../constants";
import { MdFormatColorFill } from "react-icons/md";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Input, Typography } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputControl from "../InputControl";


const Resume = forwardRef(({information, sections, sizeSection, setSizeSection},ref) => {
    const [cols, setCols] = useState([[],[]])
    const [source, setSource] = useState("")
    const [target, setTarget] = useState("")
    const [colorActive, setColorActive] = useState("#239ce2")
    const [colorItem, setColorItem] = useState({backgroundColor : "#239ce2"});
    const [colorTextItem, setColorTextItem] = useState({color : "#239ce2"});

    const [stepActive, setStepActive] = useState(0);
    
    const [arrayPageResume, setArrayPageResume] = useState([]); 

    const workExpRef = useRef();
    const educationRef = useRef();
    const projectRef = useRef();
    const achievementsRef = useRef();
    const summaryRef = useRef();
    const languageRef = useRef();
    const otherRef = useRef();
    const bodyRef = useRef();
    const boxTop = useRef();
    const skillsRef = useRef();
    const containerRef = useRef();
    let sectionCloneRef = useRef();
    
    const colorInputRef = useRef();
    const info = {
        workExp: information[sections.workExp],
        project: information[sections.project],
        achievements: information[sections.achievements],
        language: information[sections.language],
        education: information[sections.education],
        basicInfo: information[sections.basicInfo],
        summary: information[sections.summary],
        other: information[sections.other],
        skills: information[sections.skills],
    }
    const steps = [
        info.basicInfo?.sectionTitle,
        info.workExp?.sectionTitle,
        info.project?.sectionTitle,
        info.skills?.sectionTitle,
        info.education?.sectionTitle,
        info.language?.sectionTitle,
        info.achievements?.sectionTitle,
        info.summary?.sectionTitle,
        info.other?.sectionTitle,

    ];

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    const getFormattedDate = value => {
        if (!value) return "";
        const date = new Date(value);   
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    const sectionDiv = {
        [sections.workExp]: (
            <div ref={workExpRef} 
                className={`${info.workExp?.details?.length > 0 ? "" : "hidden"}`}
                key={"workExp"}
                draggable
                onDragOver={() => setTarget(info.workExp?.id)}
                onDragEnd={() => setSource(info.workExp?.id)}
                
            >
                <div className="text-2xl font-medium w-full border-b-2 border-solid border-slate-400">{info.workExp?.sectionTitle}</div>
                <div className="ml-2 flex flex-col gap-3 pb-2 px-0">
                    {info.workExp?.details?.map((item,idx )=> (
                        <div 
                            className={`${idx > 0 ? 'border-t-2 border-solid border-slate-200 pb-2' : ""}`}
                            key={item.title + idx}
                            >
                            {item.title && <p className="font-normal text-xl">{item.title}</p>}
                            {item.companyName && <p className="font-medium ">{item.companyName}</p>}
                            {item.certificateLink && (
                                <a 
                                    style={colorTextItem}
                                    className=" flex gap-1 text-sm items-center  cursor-pointer"
                                    href={item.certificateLink}
                                >
                                    <GrAttachment /> 
                                    {item.certificateLink}
                                </a>
                            )}
                            {item.startDate && item.endDate ? (
                                <div className="flex gap-1 text-base items-center">
                                    <FaRegCalendarAlt />
                                    {getFormattedDate(item.startDate)} - {getFormattedDate(item.endDate)}
                                </div>
                            ) : ""}
                            {item.location && <p className="flex gap-1 text-base items-center"><FaLocationDot/>{item.location}</p>}
                            {item.points?.length > 0 && (
                                <ul className="">
                                    {item.points?.map((element,idx) => (
                                        <li
                                            className=""
                                            key={element + idx}
                                        >
                                        {element}   
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                </div>
            </div>),
        [sections.project]: (
            <div ref={projectRef}
                className={`${info.project?.details?.length > 0 ? "" : "hidden"}`}
                key={"project"}
                draggable
                onDragOver={() => setTarget(info.project?.id)}
                onDragEnd={() => setSource(info.project?.id)}
            >
                <div className=" text-2xl font-medium w-full border-b-2 border-solid border-slate-400">{info.project?.sectionTitle}</div>
                <div className="ml-2 flex flex-col gap-3 pb-2 px-0">
                    {info.project?.details?.map((item, idx) => (
                        <div 
                            className={`${idx > 0 ? 'border-t-2 border-solid border-slate-200 pb-2' : ""}`}
                            key={item + idx}    
                        >
                            {item.title && <p className="font-medium text-xl">{item.title}</p>}
                            {item.link && (
                                <a  style={colorTextItem}
                                    className="flex gap-1 text-sm items-center cursor-pointer"
                                    href={item.link}    
                                >
                                    <GrAttachment /> 
                                    {item.link}
                                </a>
                            )}
                            {item.github && (
                                <a  style={colorTextItem}
                                    className="flex gap-1 text-sm items-center cursor-pointer"
                                    href={item.github}    
                                >
                                    <FaGithub /> 
                                    {item.github}
                                </a>    
                            )}
                            {item.overview && <p className="">{item.overview}</p>}
                            {item.points?.length > 0 && (
                                <ul className="">
                                    {item.points?.map((element,idx) => (
                                        <li
                                            className=""
                                            key={element + idx}
                                        >
                                        {element}   
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>),
        [sections.education]: (
            <div ref={educationRef}
                className={`${info.education?.details?.length > 0 ? "" : "hidden"}`}
                key={"education"}
                draggable
                onDragOver={() => setTarget(info.education?.id)}
                onDragEnd={() => setSource(info.education?.id)}
            >
                <div className=" text-2xl font-medium w-full border-b-2 border-solid border-slate-400">{info.education?.sectionTitle}</div>
                <div className="ml-2 flex flex-col gap-1 pb-2 px-0">
                    {info.education?.details?.map((item, idx) => (
                        <div key={idx} className="">
                            {item.title && <p className="font-normal text-xl">{item.title}</p>}
                            {item.college && <p style={colorTextItem} className=" font-medium ">{item.college}</p> }
                            {item.startDate && item.endDate ? (
                                <div className="flex gap-1 text-base items-center">
                                    <FaRegCalendarAlt />
                                    {getFormattedDate(item.startDate)} - {getFormattedDate(item.endDate)}
                                </div>
                            ) : ""}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [sections.language]: (
            <div ref={languageRef}
                className={`${info.language?.points?.length > 0 ? "" : "hidden"}`}
                key={"language"}
                draggable
                onDragOver={() => setTarget(info.language?.id)}
                onDragEnd={() => setSource(info.language?.id)}
            >
                <div className="text-2xl font-medium w-full border-b-2 border-solid border-slate-400">{info.language?.sectionTitle}</div>
                {info.language?.points?.length > 0 && (
                    <ul className="ml-2 pb-2">
                        {info.language?.points?.map((element,idx) => (
                            <li
                                className=""
                                key={element + idx}
                            >
                                {element}   
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ),
        [sections.skills]: (
            <div ref={skillsRef}
                className={`${info.skills?.points?.length > 0 ? "" : "hidden"}`}
                key={"skills"}
                draggable
                onDragOver={() => setTarget(info.skills?.id)}
                onDragEnd={() => setSource(info.skills?.id)}
            >
                <div className="text-2xl font-medium w-full border-b-2 border-solid border-slate-400">{info.skills?.sectionTitle}</div>
                {info.skills?.points?.length > 0 && (
                    <ul className="ml-2 pb-2">
                        {info.skills?.points?.map((element,idx) => (
                            <li
                                className="flex"
                                key={idx}
                            >
                                <p className=" font-medium text-base mr-1">{element.name} </p>  
                                <p>{element.skills} </p>  
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ),
        [sections.achievements]: (
            <div ref={achievementsRef}
                className={`${info.achievements?.points?.length > 0 ? "" : "hidden"}`}
                key={"achievement"}
                draggable
                onDragOver={() => setTarget(info.achievements?.id)}
                onDragEnd={() => setSource(info.achievements?.id)}
            >
                <div className=" text-2xl font-medium w-full border-b-2 border-solid border-slate-400">{info.achievements?.sectionTitle}</div>
                {info.achievements?.points?.length > 0 && (
                    <ul className="ml-2 pb-2">
                        {info.achievements?.points?.map((element,idx) => (
                            <li
                                className=""
                                key={element + idx}
                            >
                                {element}   
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ),
        [sections.summary]: (
            <div ref={summaryRef}
                className={`${info.summary?.detail ? "" : "hidden"}`}
                key={"summary"}
                draggable
                onDragOver={() => setTarget(info.summary?.id)}
                onDragEnd={() => setSource(info.summary?.id)}
            >
                <div className="text-2xl font-medium w-full border-b-2 border-solid border-slate-400">{info.summary.sectionTitle}</div>
                <div className="ml-2 flex flex-col gap-3 pb-1 px-0">
                    <p className="font-normal text-xl">
                        {info.summary?.detail}
                    </p>
                </div>
            </div>
        ),
        [sections.other]: ( 
            <div ref={otherRef}
                className={`${info.other?.detail ? "" : "hidden"}`}
                key={"other"}
                draggable
                onDragOver={() => setTarget(info.other?.id)}
                onDragEnd={() => setSource(info.other?.id)}
            >
                <div className="text-2xl font-medium w-full border-b-2 border-solid border-slate-400 ">{info.other.sectionTitle}</div>
                <div className="ml-2 flex flex-col gap-3 pb-1 px-0">
                    <p className="font-normal text-xl">
                        {info.other?.detail}
                    </p>
                </div>
            </div>
        ),
    }
    const swapSourceTarget = (source, target) => {
        if (!source || !target) return;
        const tempCols = [[...cols[0]], [...cols[1]]];

        let sourceRowIndex = tempCols[0].findIndex(item => item === source);
        let sourceColumnIndex = 0;
        if (sourceRowIndex < 0) {
            sourceColumnIndex = 1;
            sourceRowIndex = tempCols[1].findIndex(item => item === source);
        }

        let targetRowIndex = tempCols[0].findIndex(item => item === target);
        let targetColumnIndex = 0;
        if (targetRowIndex < 0) {
            targetColumnIndex = 1;
            targetRowIndex = tempCols[1].findIndex(item => item === target)
        }

        const tempSource = tempCols[sourceColumnIndex][sourceRowIndex];
        tempCols[sourceColumnIndex][sourceRowIndex] = tempCols[targetColumnIndex][targetRowIndex];
        tempCols[targetColumnIndex][targetRowIndex] = tempSource;

        setCols(tempCols);
    }
    const handleOpenColor = () => {
        colorInputRef.current.click();
    }
    useEffect(() => {
        setCols([
            [sections.skills,sections.language,sections.summary,sections.other],
            [sections.education,sections.workExp,sections.project,sections.achievements],
        ])
    },[])
    
    useEffect(() => {
        swapSourceTarget(source, target);
    }, [source]);

    useLayoutEffect(()=>{
        setColorItem({backgroundColor:`${colorActive}`});
        setColorTextItem({color:`${colorActive}`})
        let container = ref.current;    
        container.style.transform = "scale(0.6,0.6)";
        container.style.top = "-110px";
        container.style.height = "2000";
        // container.style.cssText = `height: 0px`

    },[colorActive])
    
    useEffect(()=>{
        let count = 0;
        let inf = Object.keys(information);
        if (Object.keys(information[inf[0]]?.detail).length>0) count+=1; 
        inf.splice(0,1);
        inf.forEach(item => {
            if (information[item]?.detail  || information[item]?.details?.length> 0 || information[item]?.points?.length>0){
                count+=1;            
            }
        })
        setStepActive(count);
    },[information])

    useEffect(()=>{
            sectionCloneRef = ref;
            setArrayPageResume([ref.current]);
        },[])
        
    // const [sizeSection, setSizeSection] = useState(1112)
    useEffect(()=>{
        let sum = boxTop.current?.offsetHeight + bodyRef.current?.offsetHeight;
        if (sum > 1060)
            setSizeSection(sum)
        else setSizeSection(1060)
    },[bodyRef.current?.offsetHeight])
  return (
       <div
         className=" bg-gray-200 w-3/5 h-[750px] my-0 mx-auto relative "
       >
            <Box 
                sx={{ 
                    width: '98%',
                    mt: "1rem",
                    mx: "auto"
                }}>
                <Stepper activeStep={stepActive} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>
                            <Typography variant="p">{label}</Typography>
                        </StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>  
           <section 
                className="absolute left-0 right-0 flex-1 w-[820px] h-[1060px] bg-red-100 gap-8 mt-0 mx-auto overflow-y-scroll no-scrollbar"   
                ref={ref}     
            >
                <div ref={boxTop} style={colorItem} className="h-14 mb-2 z-10"/>
                <div
                    ref={bodyRef}
                    className="w-full">
                    <div className="flex flex-col gap-1 px-7">
                         <p style={colorTextItem} className=" text-5xl font-medium capitalize m-0">{info.basicInfo?.detail?.name}</p>
                         <p className=" font-medium text-xl m-0">{info.basicInfo?.detail?.title}</p>
                         <div className="my-1 flex flex-wrap gap-2">
                            {
                                info.basicInfo?.detail?.email && (
                                    <a 
                                        className="flex items-center text-base" 
                                        type="email"    
                                    >
                                        <MdEmail style={colorTextItem} className="text-lg mx-1"/>
                                        {info.basicInfo?.detail?.email}
                                    </a>
                                )
                            }
                            {
                                info.basicInfo?.detail?.phone && (
                                    <a 
                                        className="flex items-center text-base" 
                                    >
                                        <FaPhoneAlt style={colorTextItem} className=" text-lg mx-1"/>
                                        {info.basicInfo?.detail?.phone}
                                    </a>
                                )
                            }
                            {
                                info.basicInfo?.detail?.linkedin && (
                                    <a 
                                        className="flex items-center text-base" 
                                    >
                                        <IoLogoLinkedin style={colorTextItem} className="  text-lg mx-1"/>
                                        {info.basicInfo?.detail?.linkedin}
                                    </a>
                                )
                            }
                            {
                                info.basicInfo?.detail?.github && (
                                    <a 
                                        className="flex items-center text-base" 
                                    >
                                        <FaGithub style={colorTextItem} className="  text-lg mx-1"/>
                                        {info.basicInfo?.detail?.github}
                                    </a>
                                )
                            }
                         </div>
                        
                    </div>
                    <main className="flex gap-4 px-7 py-2">
                        <div className="w-52 flex-2 flex-col flex-wrap flex gap-1">
                            <div className="w-52 mt-2 h-52"> 
                                {info.basicInfo?.detail?.avatarImg ? (
                                    <img className="w-full h-full" src={info.basicInfo?.detail?.avatarImg} alt="avatar"/>)
                                    :   ""}
                            </div>
                            {cols[0].map(item => sectionDiv[item])}
                        </div>
                        <div className="flex-1 flex-col flex-wrap flex gap-1">

                            {cols[1].map(item => sectionDiv[item])}
                        </div>
                    </main>
                </div>
                {/* <div ref={boxBot} style={colorItem} className="w-full h-14 absolute bottom-0 z-10"/> */}
            </section>

            <div className="absolute bottom-3 left-2 z-0">
                <Box sx={{ '& > :not(style)': { mx: 2, mt: 2 } }}>
                    <Fab 
                        size="small"
                        color="primary"
                        aria-label="add"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <AddIcon />
                    </Fab>
                    
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                        sx={{
                             mt: -9,
                        }}
                    >
                        
                        <MenuItem onClick={handleOpenColor}> 
                            <div className="flex">
                                Color 
                                <MdFormatColorFill className="ml-2 w-5 h-5"/>
                            </div>
                            <InputControl 
                                styles="invisible w-0 m-0 p-0"
                                ref={colorInputRef}
                                type="color" 
                                value={colorActive}
                                onChange={(e) => setColorActive(e.target.value)}
                            />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                    
                </Box>
            </div>
            {/* <div className="absolute bottom-3 left-[43%]">
                <Stack 
                    spacing={10}
                    >
                    <Pagination
                        count={2} color="primary" />
                </Stack>
            </div> */}
        </div>
  )

})
Resume.displayName  = "Resume";

export default Resume
