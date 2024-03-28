import Image from "../Image";

const BannerIntroduction = () => {
  return (
    <div className="w-full flex-center shadow-md">
      <Image
        src="./src/assets/1937.jpg"
        alt="leftBannerImg"
        className="h-24 w-[560px] opacity-65"
      />

      <div className="mx-auto">
        <p className="text-xl font-medium text-indigo-500 ">
          Được các công ty tin dùng 135+ công ty
        </p>
      </div>

      <Image
        src="./src/assets/1937.jpg"
        alt="leftBannerImg"
        className="h-24 w-[560px] transform -scale-x-100 opacity-65"
      />
    </div>
  );
};

export default BannerIntroduction;
