import GridItem from "./GridItem";
import Masonry from "react-masonry-css";

const ImagesGrid = (props) => {
  const breakpointColumnsObj = {
    default: 3,
    1180: 2,
    700: 1,
  };

  const imagesArray = () => {
    return props.imageCategory.photos;
  };

  return (
    <div className={`images-grid-per-category ${props.imageCategory.title}`}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {imagesArray() &&
          imagesArray().map((image, imageIndex) => (
            <>
              {image.has_to_be_displayed === true ? (
                <article className="image-grid-item" key={image.id}>
                  <GridItem
                    cookieIsAuth={props.cookieIsAuth}
                    handleHideImage={props.handleHideImage}
                    image={image}
                    imageCategory={props.imageCategory}
                    openEditModal={props.openEditModal}
                    tryToDestroyImage={props.tryToDestroyImage}
                    openImagesReader={props.openImagesReader}
                    imageIndex={imageIndex}
                    cateIndex={props.cateIndex}
                  />
                </article>
              ) : (
                <article className="image-grid-item red" key={image.id}>
                  <GridItem
                    cookieIsAuth={props.cookieIsAuth}
                    handleHideImage={props.handleHideImage}
                    image={image}
                    imageCategory={props.imageCategory}
                    openEditModal={props.openEditModal}
                    tryToDestroyImage={props.tryToDestroyImage}
                    openImagesReader={props.openImagesReader}
                    imageIndex={imageIndex}
                    cateIndex={props.cateIndex}
                  />
                </article>
              )}
            </>
          ))}
      </Masonry>
    </div>
  );
};

export default ImagesGrid;
