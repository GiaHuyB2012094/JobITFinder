import { useState } from "react";
import { Button, CartGroup, CartJobPost, Footer, Image, Nav, SearchBar } from "../components"
import { CompanyCart, CartCompanySquare } from "../components/company";
import { useGetCompanyListQuery } from "../slices/usersApiSlice"
// import { convertProvincesData } from "../constants/convertData";
// import { getProvinces } from "../api/provincesApi";
// import { useQuery } from "react-query";
import { useGetPostsQuery } from "../slices/postApiSlice";


const FindJobs = () => {
  // const { data: provinces } = useQuery("provinces", getProvinces)
  const { data: dataCompanyList } = useGetCompanyListQuery();
  const { data: dataJobsPost } = useGetPostsQuery();
  const [lengthDataCompanyList,setLengthDataCompanyList] = useState(5)
  const [lengthDataJobsPost,setLengthDataJobsPost] = useState(5)
  console.log('k')
  return (
    <main>
        <Nav/>
        <section className="pt-16 ">
    {/* search */}
            <div className="h-[630px] relative ">
              <SearchBar/>
              <div className="h-full flex absolute top-0">
                <Image 
                   className=" h-full "
                  src="./src/assets/bg-5g.jpg" alt="ád"/>
                <Image 
                  className=" h-full"
                src="./src/assets/20944381.jpg" alt="ád"/>
              </div>
            </div>
            <div className="w-full flex-center">
              <Image
                src="./src/assets/1937.jpg"
                alt="leftBannerImg"
                className="h-24 w-[560px] opacity-65"
              />
              <div className="mx-auto">
                <p className="text-xl font-medium text-indigo-500 ">Được các công ty tin dùng 135+ công ty</p>
              </div>
              <Image
                src="./src/assets/1937.jpg"
                alt="leftBannerImg"
                className="h-24 w-[560px] transform -scale-x-100 opacity-65"
              />
              
            </div>
    {/* body */}
            <div className="flex  gap-5 bg-[#F0F2F5] min-h-screen p-16 px-48">
              {/* body-left */}
              <div className="flex flex-col gap-5 w-8/12">
                {/* info jobs */}
                <div className="flex flex-col gap-5">
                  <p className="text-3xl font-medium text-indigo-700">Thông tin việc làm</p>
                    {dataJobsPost?.slice(0, lengthDataJobsPost)?.map((data, idx) => 
                      <div key={idx}>
                        <CartJobPost post={data}/>
                      </div>
                    )}

                    {dataJobsPost?.length > 5 &&
                    <div className="mx-auto">
                      <Button
                        medium
                        roundPrimary
                        title="Xem thêm"
                        styles="!px-20 !w-72 "
                        onClick={()=>{setLengthDataJobsPost(prev => (
                          (prev + 5) > dataJobsPost.length 
                            ? (dataJobsPost.length)
                            : (prev + 5)
                          ))}}
                      />
                    </div>}
                </div>
                {/* info companies */}
                <div className="flex flex-col gap-5 ">
                  <p className="text-3xl font-medium text-indigo-700">Thông tin công ty</p>
                  {dataCompanyList?.slice(0, lengthDataCompanyList)?.map((data, idx) => 
                    <div key={idx}>
                      <CompanyCart 
                        title={data.nameCompany}
                        image={data.avatar}
                        quantity={data.sizeCompany}
                        address={data.address}
                        skills={data.skillOfCompany}
                        idCompany={data._id}
                      />
                    </div>
                  )}
                  {lengthDataCompanyList > 4 &&
                  <div className="mx-auto">
                    <Button
                      medium
                      roundPrimary
                      title="Xem thêm"
                      styles="!px-20 !w-72 "
                      onClick={()=>{setLengthDataCompanyList(prev => (
                        (prev + 5) > dataCompanyList.length 
                          ? (dataCompanyList.length)
                          : (prev + 5)
                        ))}}
                    />
                  </div>}
                </div>
              </div>
              {/* body-right */}
              <div className="flex flex-col gap-5 w-4/12">
                  <CartGroup/>
                  {dataCompanyList &&
                    <CartCompanySquare 
                      avatar={dataCompanyList[0]?.avatar}
                      name={dataCompanyList[0]?.nameCompany || ""}
                      coverImg={dataCompanyList[0]?.coverImg}
                      industry={dataCompanyList[0]?.industryCompany}
                      address={dataCompanyList[0]?.address}
                      nationality={dataCompanyList[0]?.nationality}
                  />}
                  <CartGroup/>
              </div>
            </div>
        </section>
        <Footer/>
    </main>
  )
}

export default FindJobs
