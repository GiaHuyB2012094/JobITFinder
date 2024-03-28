import ResultSearch from "./ResultSearch";

const ResultSearchList = ({ results }) => {
  return (
    <div className="max-h-32 overflow-auto ">
      <div className="">
        {results.map((result, idx) => (
          <ResultSearch key={idx} result={result} />
        ))}
      </div>
    </div>
  );
};

export default ResultSearchList;
