import BeatLoader from "react-spinners/BeatLoader";

const PageLoader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <BeatLoader
        color={"#B51E21"}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default PageLoader;
