import Image from "./Image";
import { useGetCompanyItemQuery } from "../slices/usersApiSlice";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const Cart = ({ post }) => {
  const { data: dataCompanyItem } = useGetCompanyItemQuery(post.company);

  const address = useMemo(() => {
    let addressItem = post?.locations[0];

    let result = addressItem.split(",");

    return result[result.length - 1];
  }, [post]);

  return (
    <Link to={`/job-detail/${post._id}/${dataCompanyItem?.nameCompany}`}>
      <div className="flex-center  w-full h-[105px] border-t-2 border-gray-200 border-solid cursor-pointer gap-x-2 p-3 bg-white shadow-md">
        <div className="w-[25%] h-full mt-2">
          <Image
            src={dataCompanyItem?.avatar}
            alt="SignInImage"
            className="w-full"
          />
        </div>
        <div className="w-[75%] h-full">
          <p className="text-base font-medium text-indigo-500 w-full truncate">
            {post.name}
          </p>

          <div className="">
            <p className="text-sm line-clamp-1">{address}</p>
          </div>

          <div className="flex w-full overflow-hidden">
            {post?.skills.slice(0, 4).map((tag, idx) => (
              <div
                className="py-1 my-2 px-4 mx-1 cursor-pointer font-medium text-xs rounded-md bg-indigo-100 shadow-sm"
                key={idx}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

const CartGroup = ({ posts, titleCartGroup }) => {
  return (
    <main className="border-2 border-solid border-indigo-300 w-[380px]">
      <div className="w-full bg-indigo-100 p-2 border-b-2 border-indigo-300 border-solid">
        <p>{titleCartGroup}</p>
      </div>

      <div>
        {posts?.slice(0, 3).map((postItem, idx) => (
          <div key={idx}>
            <Cart post={postItem} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default CartGroup;
