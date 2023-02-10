import "./Index.scss";
import { useState, useRef } from "react";
import { resizeImages } from "../../../utils/resizeImages";
import Carrousel from "./carrousel/Carrousel";
import { useEffect } from "react";
import Grid from "./grid/Grid";
import Loader from "./Loader";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const IndexBlog = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const loaderElem = useRef(null);

  const postImageAPI = async (newImage) => {
    const body = {
      home: {
        type_id: 1, // will be carrousel later
        image_url: newImage.image_url,
      },
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(`${BASE_URL}/api/v1/homes`, config);
    const data = await res.json();
  };

  const getAllIndexImagesAPI = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/homes`, {
      method: "GET",
    });
    const data = await res.json();
    setFetchedData(data);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllIndexImagesAPI().then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      loaderElem.current.classList.add("active");
    } else {
      loaderElem.current.classList.remove("active");
    }
  }, [isLoading]);
  return (
    <>
      <section className="b-index-content">
        <Loader loaderElem={loaderElem} />
        <Carrousel
          fetchedData={fetchedData}
          page={props.page}
          setIsLoading={setIsLoading}
        />

        <div className="b-custom-hr-animated-top"></div>
        <h2 class="b-index-title-animated">
          <span>B</span>
          <span>l</span>
          <span>o</span>
          <span>g</span>
          <span>&nbsp;</span>
          <span>d</span>
          <span>e</span>
          <span>&nbsp;</span>
          <span>G</span>
          <span>a</span>
          <span>ë</span>
          <span>l</span>
          <span>l</span>
          <span>e</span>
        </h2>
        <div className="b-custom-hr-animated-bot"></div>
        <Grid fetchedData={fetchedData} setIsLoading={setIsLoading} />
      </section>
    </>
  );
};

export default IndexBlog;
