import { sections, colors } from "../../constants";
import { MdDownload } from "react-icons/md";
import Editor from "../../components/resume/Editor";
import { useRef, useState } from "react";
import Resume from "../../components/resume/Resume";
import ReactToPrint from "react-to-print";
import Nav from "../../components/Nav";
const CreateResume = () => {

    const [resumeInfo, setResumeInfo] = useState({
        [sections.basicInfo] : {
            id: sections.basicInfo,
            sectionTitle: sections.basicInfo,
            detail:{},
        },
        [sections.workExp] : {
            id: sections.workExp,
            sectionTitle: sections.workExp,
            details:[]
        },
        [sections.skills] : {
            id: sections.skills,
            sectionTitle: sections.skills,
            points:""
        },
        [sections.achievements] : {
            id: sections.achievements,
            sectionTitle: sections.achievements,
            points:""
        },
        [sections.language] : {
            id: sections.language,
            sectionTitle: sections.language,
            points:""
        },
        [sections.education] : {
            id: sections.education,
            sectionTitle: sections.education,
            details:[]
        },
        [sections.other] : {
            id: sections.other,
            sectionTitle: sections.other,
            detail:""
        },
        [sections.project] : {
            id: sections.project,
            sectionTitle: sections.project,
            details:[]
        },
        [sections.summary] : {
            id: sections.summary,
            sectionTitle: sections.summary,
            detail:""
        },
    })
    const resumeRef = useRef();
    const [activeColor, setActiveColor] = useState(colors[0]);
    
    const [sizeSection, setSizeSection] = useState(1060);
    return (
        <div>
            <Nav/>
            <section className="px-8 pt-20 flex flex-col items-center gap-8">
                <p className="font-medium text-4xl text-indigo-600">Tạo Đơn Ứng Tuyển</p>
                <div className="w-full flex gap-10 justify-between items-center">
                    <div className="flex gap-5 py-0 px-8">
                        {colors.map(color => (
                            <span
                                key={color}
                                style={{backgroundColor: color}}
                                className={`h-9 w-9 rounded-full
                                    ${activeColor === color ? " border-2 border-solid border-black" : ""}`}
                                onClick={()=>setActiveColor(color)}
                            >
                            </span>
                        ))}
                    </div>
                    <ReactToPrint
                        trigger={()=>{
                            return (
                                <button 
                                    className="flex items-center py-2 px-4 bg-[#239ce2] rounded-md text-white outline-none border-none font-medium text-base active:translate-y-1 "
                                >
                                    Download
                                    <MdDownload/>
                                </button>
                            )
                        }}
                        content={() => {
                            const resume = resumeRef.current;
                            let clonedResume = resume.cloneNode(true);
                            // clonedResume.style.transform = "scale(1,1)";
                            // clonedResume.style.removeProperty('scale')
                            clonedResume.style.transform = "scale(1)";
                            clonedResume.style.removeProperty("top")
                            // clonedResume.style = ''
                            // clonedResume.style.height = {sizeSection}
                            // clonedResume.style.height = `${sizeSection}px`
                            // clonedResume.style.cssText = `height:${sizeSection}px; margin-top: 100px`
                            console.log(clonedResume.style.height)
                            console.log(clonedResume)
                            return clonedResume;
                        }} 
                    />
                </div>
                <main className="w-full flex justify-between gap-4">
                    <Editor
                        sections={sections}
                        information={resumeInfo}
                        setInformation={setResumeInfo}
                    />
                    <Resume
                        sizeSection={sizeSection}
                        setSizeSection={setSizeSection}
                        ref={resumeRef}
                        activeColor={activeColor}
                        sections={sections}
                        information={resumeInfo}
                    />
                </main>
            </section>    
        </div> 
)
}

export default CreateResume
