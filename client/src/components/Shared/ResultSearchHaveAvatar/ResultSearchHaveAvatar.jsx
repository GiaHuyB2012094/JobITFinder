import { Link } from "react-router-dom";
import Image from "../../Image";
import { useId } from "react";

const ResultSearchHaveAvatar = ({ result }) => {
  const id = useId();

  return (
    <Link
      className=" p-3 hover:bg-indigo-100 border-b cursor-pointer flex items-center gap-x-5"
      to={result.path}
    >
      <div className="w-10 h-10 bg-white flex-center">
        <Image src={result.imgI} alt={`result.name-${id}`} className=" h-fit" />
      </div>
      <p className="line-clamp-2">{result.name}</p>
    </Link>
  );
};

export default ResultSearchHaveAvatar;
