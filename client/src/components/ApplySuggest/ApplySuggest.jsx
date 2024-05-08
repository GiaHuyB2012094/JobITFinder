import CardApplySuggest from "./CardApplySuggest";

const ApplySuggest = (props) => {
  const { dataJobSuggest } = props;
  return (
    <div className="space-y-2 max-h-96  overflow-y-scroll">
      {dataJobSuggest?.map((job, idx) => (
        <CardApplySuggest
          key={idx}
          job={job}
          onClose={(data) => {
            props.onClose(data);
          }}
        />
      ))}
    </div>
  );
};

export default ApplySuggest;
