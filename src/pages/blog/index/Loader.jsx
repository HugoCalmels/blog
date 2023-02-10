
import greyCircleLoader from "../../../assets/gifs/greyCircleLoader2.gif";
const Loader = (props) => {
  return (
    <div className="b-main-content-loader-home" ref={props.loaderElem}>
      <div className="b-main-content-loader-container">
        <img src={greyCircleLoader} alt="loader" />
      </div>
    </div>
  );
};

export default Loader;
