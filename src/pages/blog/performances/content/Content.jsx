import { useEffect, useState } from "react"
import "./Content.scss"
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const Content = (props) => {
  let cookieToken = "";
  const cookie = Cookies.get("cie-lutin-auth-token");

  if (cookie !== undefined) {
    cookieToken = cookie;
  }
  const [linkPreview, setLinkPreview] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  console.log("///////////////////")
  console.log(props)
  console.log("///////////////////")

  const getWebsiteThumbnailLinkPreview = async (website) => {

    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")
    console.log(`${BASE_URL}/api/v1/getLink`)
    console.log(website)
    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")
    console.log("HEYYYYYYYYY")


    const body = {
      object: {
        link: website,
      },
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`
      },
      body: JSON.stringify(body),
    };




    const res = await fetch(`${BASE_URL}/api/v1/getLink`, config)
    const data = await res.json()
    console.log('222222222222222222222222222222222')
    console.log('222222222222222222222222222222222')
    console.log('222222222222222222222222222222222')
    console.log(res)
    console.log(data)
    console.log("22222222222222222222222222222222")
    console.log('222222222222222222222222222222222')

    console.log('222222222222222222222222222222222')
    if (data.error) {
      setLinkPreview("")
      setErrorMessage("url non reconnue")
    } else {
      setLinkPreview(data)
      setErrorMessage("")
    }

  }

  useEffect(() => {
    console.log('HELLO ??? LINK PREVIEW ')
    console.log(props.selectedValue.website_link)
    if (props.selectedValue.website_link.length > 0) {
      getWebsiteThumbnailLinkPreview(props.selectedValue.website_link)
    }
    
 
  },[props.selectedValue])
  


  const openPage = (url) => {
    window.open(url)
  }


  return (
    <div className="bp-perf-content-wrapper">
    <div className="bp-perf-content">
      <h2 id="bp-perf-content-title">PERFORMANCES</h2>

        <div className="bp-perf-content-informations">
          <h3> {props.selectedValue.title}</h3>
          <p> {props.selectedValue.desc}</p>
          {props.selectedValue.featuring.length > 0 ?
            <h5>Avec :&nbsp;
              {  props.selectedValue.website_link && errorMessage.length === 0 ?
              <a target="_blank" href={props.selectedValue.website_link} id="bp-perf-content-feat-link">{props.selectedValue.featuring}</a>
              :
              <span>{props.selectedValue.featuring}</span>
            }
            </h5>
            :
            <></>
          }
      
        </div>
 
      <video id="bp-video-player"controls src={props.selectedValue.video_url} max-width="100%" height="auto"/>


        {linkPreview.error || props.selectedValue.website_link.length === 0 ?
          <>
           
          </>
          :
          <>
             <div className="bp-custom-hr-perf"></div>
        <h3 id="bp-perf-more-websites-title">Retrouvez {props.selectedValue.featuring} sur son site</h3>
        
            <div className="bp-link-preview-wrapper" onClick={() => openPage(linkPreview.url)}>
              {linkPreview.images && linkPreview.images.length > 0 ?
                     <img src={linkPreview.images[0].src} />
                :
                <div className="bp-content-no-photo">
                </div>
              }
  
              <div className="bp-link-preview-righ-side">
                {errorMessage}
          <h5> {linkPreview.title}</h5>
        <p>{linkPreview.description}</p>
        <a>{linkPreview.url}</a>  
              </div>
              </div>
          </>
        }
      
  
 


  
   
      
      <hr />
      
      </div>
      </div>
  )
}

export default Content