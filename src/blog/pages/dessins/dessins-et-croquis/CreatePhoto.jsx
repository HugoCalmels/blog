import { useEffect, useState } from "react";
import "./CreatePhoto.scss";

const CreatePhoto = () => {
  const [categories, setCategories] = useState([]);
  const [imageRef, setImageRef] = useState(0);
  const [imageTitle, setImageTitle] = useState("");
  const [imageMaterial, setImageMaterial] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("dessin_temp_image[image]", e.target[1].files[0]);
    let getSelects = document.querySelectorAll(".bdl-custom-select");
    const foundSelect = Array.from(getSelects).filter(
      (select) => select.value == e.target[0].value
    );
    const categoryID = foundSelect[0].dataset.id;
    createTempImage(data).then((data) => {
      createImage(data, categoryID);
    });
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

  const createImage = async (image, categoryID) => {
    const body = {
      dessin: {
        dessin_category_id: categoryID,
        image_url: image.image_url,
        title: imageTitle,
        ref: imageRef,
        material: imageMaterial,
        width: imageWidth,
        height: imageHeight,
      },
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    await fetch(
      `http://localhost:3000/api/v1/dessin_categories/${categoryID}/dessins`,
      config
    );
    window.location.reload(false);
  };

  const closeModal = () => {
    const modal = document.querySelector(".bdl-create-photo-modal");
    modal.classList.remove("active");
  };

  const getCategories = async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/dessin_categories",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    //setCategories(data)
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bdl-create-photo-modal">
      <h5>Créer une IMAGE/PHOTO</h5>
      <p onClick={closeModal}>X</p>
      <form className="bdl-create-photo-form" onSubmit={(e) => handleSubmit(e)}>
        <label>1.Sélectionner année ou catégorie</label>

        <select id="select-categories">
          {categories.map((category) => (
            <option
              className="bdl-custom-select"
              key={category.id}
              data-id={category.id}
            >
              {category.title}
            </option>
          ))}
        </select>
        <label htmlFor="dessin-image">2. Photo</label>
        <input type="file" id="dessin-image" name="dessin-image"></input>

        <label>3. titre de l'image</label>
        <input
          type="text"
          onChange={(e) => setImageTitle(e.target.value)}
        ></input>

        <label>4. référence image ( par défaut "# + (réf_image)" ) </label>
        <input
          type="number"
          onChange={(e) => setImageRef(e.target.value)}
        ></input>

        <label>5. longueur </label>
        <input
          type="text"
          onChange={(e) => setImageWidth(e.target.value)}
        ></input>

        <label>6. largeur</label>
        <input
          type="text"
          onChange={(e) => setImageHeight(e.target.value)}
        ></input>

        <label>7. matériau utilisé</label>
        <input
          type="text"
          onChange={(e) => setImageMaterial(e.target.value)}
        ></input>

        <input type="submit" value="envoyer"></input>
      </form>
    </div>
  );
};

export default CreatePhoto;
