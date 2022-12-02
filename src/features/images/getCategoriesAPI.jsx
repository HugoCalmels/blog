
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
export const getCategoriesAPI = async (arg) => {
  let response
    if (arg === "dessins") {
      response = await fetch(`${BASE_URL}/api/v1/dessin_categories`, {
        method: "GET",
      });
    } else if ( arg === "paysages"){
      response = await fetch(`${BASE_URL}/api/v1/paysage_categories`, {
        method: "GET",
      });
    }
  const data = await response.json();
  return data
}

