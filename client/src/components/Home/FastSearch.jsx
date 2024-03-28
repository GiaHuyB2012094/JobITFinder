import be from "../../assets/FastSearch/backend.png";
import fe from "../../assets/FastSearch/frontend.png";
import fullstack from "../../assets/FastSearch/fullstack.jpg";
import uiux from "../../assets/FastSearch/ui-ux.avif";
import ba from "../../assets/FastSearch/business-analysis.jpg";
import tester from "../../assets/FastSearch/tester.jpg";
import game from "../../assets/FastSearch/Game-Engineer.jpg";
import cloud from "../../assets/FastSearch/cloud.webp";
import embedded from "../../assets/FastSearch/Embedded-development.jpg";
import mobile from "../../assets/FastSearch/mobile.avif";
import { Link } from "react-router-dom";

const FastSearch = () => {
  return (
    <div className="z-20 w-full min-h-[500px] py-10">
      <p className="text-center text-3xl font-medium text-white mb-10  ">
        Khám phá ước mơ nghề nghiệp của riêng bạn
      </p>

      {/* content */}
      <div className="grid grid-cols-5 gap-2 w-4/5 mx-auto  bg-white/40 min-h-[500px] font-semibold text-xl">
        <Link
          to="/seeking-jobs/front_end"
          className="bg-indigo-200/90 row-span-2 border-r border-b px-5 flex items-center relative group cursor-pointer"
        >
          <p className="z-10 group-hover:text-black">Frontend Developer</p>
          <img
            src={fe}
            className="hidden z-0 absolute top-0 bottom-0 right-0 left-0 h-full group-hover:block opacity-80 "
          />
        </Link>

        <Link
          to="/seeking-jobs/tester"
          className="bg-indigo-100/90 border cursor-pointer px-5 flex items-center relative group cursor-pointer"
        >
          <p className="z-10 group-hover:text-black"> Tester</p>
          <img
            src={tester}
            className="hidden z-0 absolute top-0 bottom-0 right-0 left-0 h-full group-hover:block opacity-80 "
          />
        </Link>

        <Link
          to="/seeking-jobs/ba"
          className="bg-blue-200/90 col-span-2 border cursor-pointer px-5 flex items-center relative group cursor-pointer"
        >
          <p className="z-10 group-hover:text-black"> Business Analyst</p>
          <img
            src={ba}
            className="hidden z-0 absolute top-0 w-full bottom-0 right-0 left-0 h-full group-hover:block opacity-80 "
          />
        </Link>

        <Link
          to="/seeking-jobs/back_endc"
          className="bg-indigo-200/90 row-span-2 border cursor-pointer px-5 flex items-center relative group cursor-pointer"
        >
          <p className="z-10 group-hover:text-white">Backend Developer</p>
          <img
            src={be}
            className="hidden z-0 absolute top-0 bottom-0 right-0 left-0 h-full group-hover:block opacity-80 "
          />
        </Link>

        <Link
          to="/seeking-jobs/ui_ux"
          className="bg-indigo-100/90 border cursor-pointer px-5 flex items-center relative group cursor-pointer"
        >
          <p className="z-10 group-hover:text-white">UI/UX Designer</p>
          <img
            src={uiux}
            className="hidden z-0 absolute top-0 bottom-0 right-0 left-0 h-full group-hover:block opacity-80 "
          />
        </Link>

        <Link
          to="/seeking-jobs/embedded"
          className="bg-indigo-200/90 row-span-2 border cursor-pointer px-5 flex items-center relative group cursor-pointer"
        >
          <p className="z-10 group-hover:text-white">Embedded Developer</p>
          <img
            src={embedded}
            className="hidden z-0 absolute top-0 bottom-0 right-0 left-0 h-full group-hover:block opacity-80 "
          />
        </Link>

        <Link
          to="/seeking-jobs/full_stack"
          className="bg-indigo-100/90 border cursor-pointer px-5 flex items-center relative group cursor-pointer"
        >
          <p className="z-10 group-hover:text-white">Fullstack Developer</p>
          <img
            src={fullstack}
            className="hidden z-0 absolute top-0 bottom-0 right-0 left-0 h-full group-hover:block opacity-80 "
          />
        </Link>

        <Link
          to="/seeking-jobs/cloud"
          className="bg-blue-200/90 col-span-2 border cursor-pointer px-5 flex items-center relative group cursor-pointer"
        >
          <p className="z-10 group-hover:text-white">Cloud Engineer</p>
          <img
            src={cloud}
            className="hidden z-0 absolute top-0 w-full bottom-0 right-0 left-0 h-full group-hover:block opacity-80 "
          />
        </Link>

        <Link
          to="/seeking-jobs/game"
          className="bg-indigo-100/90 border cursor-pointer px-5 flex items-center relative group cursor-pointer"
        >
          <p className="z-10 group-hover:text-white">Game Developer</p>
          <img
            src={game}
            className="hidden z-0 absolute top-0 bottom-0 right-0 left-0 h-full group-hover:block opacity-80 "
          />
        </Link>

        <Link
          to="/seeking-jobs/mobile"
          className="bg-indigo-100/90 border cursor-pointer px-5 flex items-center relative group cursor-pointer"
        >
          <p className="z-10 group-hover:text-white">Mobile Developer</p>
          <img
            src={mobile}
            className="hidden z-0 absolute top-0 bottom-0 right-0 left-0 h-full group-hover:block opacity-80 "
          />
        </Link>
      </div>
    </div>
  );
};

export default FastSearch;
