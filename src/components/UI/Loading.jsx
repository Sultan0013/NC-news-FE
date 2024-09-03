import { ThreeDots } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex flex-col items-center">
        <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="black"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p className="mt-4 text-black-600">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
