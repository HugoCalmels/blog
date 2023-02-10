const ImagesReaderImage = (props) => {
  return (
    <div
      className="bd-images-reader-unit"
      style={{ left: props.addDistance() + "vw" }}
    >
      <div className="bd-images-reader-unit-container">
        <img src={props.image.image_url} />
      </div>
      <div className="bd-images-reader-unit-references">
        <p className="bd-irur-title">{props.image.title} </p>
        <p className="bd-irur-ref">
          Référence : <span>#{props.image.ref}</span>{" "}
        </p>
        <p>Longueur : {props.image.width} cm</p>
        <p>Largeur : {props.image.height} cm</p>
        {props.image.material !== "" ? (
          <p>Matériel : {props.image.material}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ImagesReaderImage;
