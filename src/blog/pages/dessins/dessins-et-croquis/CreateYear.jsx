import "./CreateYear.scss";
import { useEffect, useState } from "react";
const CreateYear = () => {
  const [categories, setCategories] = useState([]);

  const closeModal = () => {
    const modal = document.querySelector(".bdl-create-year-modal");
    modal.classList.remove("active");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      dessin_category: {
        title: e.target[0].value,
      },
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    await fetch("http://localhost:3000/api/v1/dessin_categories", config);
    window.location.reload(false);
  };

  const getCategories = async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/dessin_categories",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setCategories(data);
  };

  const tryToDestroyCategory = (e) => {
    let getSelects = document.querySelectorAll(".bdl-custom-select-destroy");
    const foundSelect = Array.from(getSelects).filter(
      (select) => select.value == e.target[0].value
    );
    let answer = window.confirm(
      `voulez vous supprimer "${foundSelect[0].value}" ?`
    );
    if (answer) {
      destroyCategoryAPI(foundSelect[0].dataset.id);
    }
  };

  const destroyCategoryAPI = async (id) => {
    await fetch(`http://localhost:3000/api/v1/dessin_categories/${id}`, {
      method: "DELETE",
    });
    window.location.reload(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bdl-create-year-modal">
      <h5>Créer une ANNEE/CATEGORIE</h5>
      <p onClick={closeModal}>X</p>
      <form className="bdl-create-year-form" onSubmit={(e) => handleSubmit(e)}>
        <label>Ajouter une année, ou du texte</label>
        <input type="text"></input>
        <input type="submit" value="envoyer"></input>
      </form>

      <hr />
      <h5>Supprimer une catégorie existante</h5>
      <form onSubmit={(e) => tryToDestroyCategory(e)}>
        <select id="remove-categories">
          {categories.map((category) => (
            <option
              className="bdl-custom-select-destroy"
              key={category.id}
              data-id={category.id}
            >
              {category.title}
            </option>
          ))}
        </select>
        <input type="submit" value="supprimer"></input>
      </form>
    </div>
  );
};

export default CreateYear;
