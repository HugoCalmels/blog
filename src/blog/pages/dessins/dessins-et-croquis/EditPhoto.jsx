import "./EditPhoto.scss";

const EditPhoto = (props) => {
  const submitEditImageToAPI = async (newImage) => {
    const data = {
      dessin: {
        image_url: newImage.image_url,
      },
    };
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetch(
      `http://localhost:3000/api/v1/dessin_categories/${props.editSelectedCategory.id}/dessins/${props.editSelectedImage.id}`,
      config
    );
    window.location.reload(false);
  };
  const tryToEditImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("dessin_temp_image[image]", e.target[0].files[0]);
    if (data) {
      createTempImage(data).then((res) => {
        submitEditImageToAPI(res);
      });
    }
  };

  const createTempImage = async (data) => {
    await fetch("http://localhost:3000/api/v1/dessin_temp_images", {
      method: "POST",
      body: data,
    });
    // get latest image
    const latestImageResponse = await fetch(
      "http://localhost:3000/api/v1/dessin-latest"
    );
    const latestImage = await latestImageResponse.json();
    return latestImage;
  };

  const closeModal = () => {
    document.querySelector(".bd-edit-photo").style.display = "none";
  };
  return (
    <div className="bd-edit-photo">
      <div className="bd-edit-close-btn" onClick={closeModal}>
        X
      </div>
      <form onSubmit={(e) => tryToEditImage(e)}>
        <label htmlFor="bd-edit-image">edit image</label>
        <input id="bd-edit-image" type="file"></input>
        <input type="submit" value="valider"></input>
      </form>
    </div>
  );
};

export default EditPhoto;
