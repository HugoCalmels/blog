import deleteIcon from "../../../../../assets/icons/deleteIcon.png";
import hideIcon from "../../../../../assets/icons/hideIcon.png";
import editIcon from "../../../../../assets/icons/editIcon.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CategoryContent = (props) => {
  return (
    <>
      {props.image.has_to_be_displayed === true ? (
        <div className="grid-item" key={props.image.id}>
          {props.cookieIsAuth === true ? (
            <>
              <div
                className="bd-image-hide-btn"
                onClick={() =>
                  props.handleHideImage(props.image, props.imageCategory)
                }
              >
                <img src={hideIcon} alt="hide" />
              </div>
              <div
                className="bd-image-edit"
                onClick={() =>
                  props.openEditModal(props.image, props.imageCategory)
                }
              >
                <img src={editIcon} alt="edit" />
              </div>
              <div
                className="bd-image-destroy"
                onClick={() =>
                  props.tryToDestroyImage(props.image, props.imageCategory)
                }
              >
                <img src={deleteIcon} alt="delete" />
              </div>
            </>
          ) : (
            <></>
          )}

          <LazyLoadImage
            width={"100%"}
            effect="blur"
            className="bd-image"
            onClick={(e) =>
              props.openImagesReader(
                e,
                props.imageIndex,
                props.cateIndex,
                props.imageCategory,
                props.image.customIndex
              )
            }
            src={props.image.image_url}
            alt="drawing"
          />
        </div>
      ) : (
        <div className="grid-item red" key={props.image.id}>
          {props.cookieIsAuth === true ? (
            <>
              <div
                className="bd-image-hide-btn"
                onClick={(e) =>
                  props.handleHideImage(e, props.image, props.imageCategory)
                }
              >
                <img src={hideIcon} alt="hide" />
              </div>
              <div
                className="bd-image-edit"
                onClick={() =>
                  props.openEditModal(props.image, props.imageCategory)
                }
              >
                <img src={editIcon} alt="edit" />
              </div>
              <div
                className="bd-image-destroy"
                onClick={() =>
                  props.tryToDestroyImage(props.image, props.imageCategory)
                }
              >
                <img src={deleteIcon} alt="delete" />
              </div>
            </>
          ) : (
            <></>
          )}
          <LazyLoadImage
            width={"100%"}
            effect="blur"
            className="bd-image"
            onClick={(e) =>
              props.openImagesReader(
                e,
                props.imageIndex,
                props.cateIndex,
                props.imageCategory,
                props.image.customIndex
              )
            }
            src={props.image.image_url}
            alt="drawing"
          />
        </div>
      )}
    </>
  );
};

export default CategoryContent;
