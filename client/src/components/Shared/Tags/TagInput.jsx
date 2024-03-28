import { useEffect, useMemo, useState } from "react";

const TagInput = ({ values, onChange, className, placeholder }) => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(values || []);

  const handleChange = (e) => {
    const { value } = e.target;

    setTag(value);
  };

  const handleKeyDown = (e) => {
    const { key } = e;

    const newTag = tag.trim();

    if (
      (key === "," || key === "Enter" || key === "Tab") &&
      newTag.length &&
      !tags?.includes(newTag)
    ) {
      e.preventDefault();

      setTags((prevTags) => [...prevTags, newTag]);

      onChange((prevTagsI) => [...prevTagsI, newTag]);

      setTag("");
    } else if (key === "Backspace" && !newTag.length && tags.length) {
      e.preventDefault();

      const tagsCopy = [...tags];

      const lastTag = tagsCopy.pop();

      setTags(tagsCopy);

      setTag(lastTag);

      onChange(tagsCopy);
    }
  };

  const removeTag = (idx) => {
    setTags((prevTags) => prevTags.filter((tag, i) => i !== idx));

    onChange((prevTagsI) => prevTagsI.filter((tag, i) => i !== idx));
  };

  const placeholderTagInput = useMemo(() => {
    if (tags?.length > 0) return "";
    return placeholder;
  }, [placeholder, tags]);
  return (
    <div className="p-3 border border-gray-400 flex flex-wrap items-center min-h-7 w-full p-1">
      {tags?.map((tag, idx) => (
        <div
          className="inline-flex justify-between items-start mx-1 relative h-[25px] bg-indigo-100 border"
          key={idx}
        >
          <p className="block relative overflow-hidden whitespace-nowrap text-ellipsis  px-2 text-sm ">
            {tag}
          </p>
          <button
            className="block relative cursor-pointer px-2 text-center  bg-indigo-300 font-semibold hover:bg-red-400 hover:text-white"
            onClick={() => removeTag(idx)}
          >
            &times;
          </button>{" "}
        </div>
      ))}

      <input
        className={`focus:outline-none color-[#495057] flex-1 border-none ${className}`}
        value={tag}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholderTagInput}
      />
    </div>
  );
};

export default TagInput;
