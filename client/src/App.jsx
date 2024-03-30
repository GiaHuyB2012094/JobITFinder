import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import {
  Company,
  FindJobs,
  SignInSignUpUser,
  SignInSignUpCompany,
  Profile,
  CompanyIT,
  PostJob,
  MyJobs,
  JobDetail,
  AppliesUser,
  AppliedForCompany,
  CompanyItem,
  SavePost,
  GrossNet,
  CompanyTop,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import CreateResume from "./pages/CreateResume/CreateResume";
import { useEffect, useState } from "react";
import { FaArrowTurnUp } from "react-icons/fa6";
import ScheduleCompany from "./pages/ScheduleApplyCompany";
import Chatbot from "./components/Chatbot/Chatbot";
import TopCompaniesDetail from "./pages/TopCompaniesDetail";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SeekingJobs from "./pages/SeekingJobs";

function LayoutCompany() {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  return userInfo?.position === "company" ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-up-company" state={{ from: location }} replace="true" />
  );
}
function LayoutUser() {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  return userInfo?.position === "user" ? (
    <Outlet />
  ) : (
    <Navigate
      to="/signIn-signUp-User"
      state={{ from: location }}
      replace="true"
    />
  );
}

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  const { pathname } = useLocation();

  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else setBackToTopButton(false);
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <main className="App relative min-h-screen w-full">
      <ToastContainer />

      <Routes>
        {/* General */}
        <Route
          path="/"
          element={
            userInfo?.position === "company" ? (
              <Navigate to="/companies" replace="true" />
            ) : (
              <Navigate to="/find-jobs" replace="true" />
            )
          }
        />
        <Route path="/signIn-signUp-User" element={<SignInSignUpUser />} />
        <Route path="/sign-up-company" element={<SignInSignUpCompany />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/company-it" element={<CompanyIT />} />
        <Route path="/company-item/:id/:name" element={<CompanyItem />} />
        <Route path="/job-detail/:id/:name" element={<JobDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gross-net" element={<GrossNet />} />
        <Route path="/save-post/:id" element={<SavePost />} />
        <Route path="/company-top" element={<CompanyTop />} />
        <Route path="/seeking-jobs/:keySearch" element={<SeekingJobs />} />
        <Route path="/seeking-jobs/" element={<SeekingJobs />} />
        <Route
          path="/company-top-details/:name"
          element={<TopCompaniesDetail />}
        />

        {/* User */}
        <Route element={<LayoutUser />}>
          <Route path="/create-resume" element={<CreateResume />} />
          <Route path="/applied-list-user/:id" element={<AppliesUser />} />
        </Route>
        {/* Company */}
        <Route element={<LayoutCompany />}>
          <Route path="/applied-company" element={<AppliedForCompany />} />
          <Route path="/companies" element={<Company />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/schedule-company" element={<ScheduleCompany />} />
        </Route>
      </Routes>

      {backToTopButton && (
        <button
          className="fixed cursor-pointer flex-center text-white rounded-full font-bold shadow-lg bg-indigo-500 bottom-24 right-10 h-12 w-12 text-2xl"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <FaArrowTurnUp />
        </button>
      )}
      {userInfo?.position === "user" && <Chatbot />}
    </main>
  );
}

export default App;
