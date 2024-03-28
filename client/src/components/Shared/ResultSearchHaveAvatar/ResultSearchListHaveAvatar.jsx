import ResultSearch from "./ResultSearchHaveAvatar";

const ResultSearchListHaveAvatarHaveAvatar = ({ results }) => {
  return (
    <div className="max-h-80 overflow-auto ">
      <div className="">
        {results.map((result, idx) => (
          <ResultSearch key={idx} result={result} />
        ))}
      </div>
    </div>
  );
};

export default ResultSearchListHaveAvatarHaveAvatar;
