import { useEffect, useState, useRef } from "react";
import "./PerformancesGalery.scss"
import TopBar from "./topbar/TopBar"
import LeftBar from "./leftbar/LeftBar"
import Content from "./content/Content"
import CreatePerformance from "./create_performance/CreatePerformance"
import DeletePerformance from "./delete_performance/DeletePerformance"
import EditPerformance from "./edit_performance/EditPerformance"
import { RxGear } from "react-icons/rx"
import {BsArrowDownCircle} from "react-icons/bs"
import Loader from "./Loader"
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
const PerformancesGalery = () => {
  const [isLoading, setIsLoading ] = useState(false)
  const btnStyle = { color: "#424242", width: "25px", height: "25px" }
  const btnStyle2 = { color: "#424242", width: "35px", height: "35px" }
  const [value, setValue] = useState("")
  const [selectedValue, setSelectedValue] = useState("")
  const performanceModalRef = useRef(null)
  const leftBarTriggerBtnElem = useRef(null)
  const topBarElem = useRef(null)
  const leftBarElem = useRef(null)
  const loaderElem = useRef(null)
  const deletePerformancesModalRef = useRef(null)
  const editPerformanceModalRef = useRef(null)
  let cookieIsAuth = false;
  const cookie = Cookies.get("cie-lutin-isAuth");

  if (cookie !== undefined) {
    cookieIsAuth = JSON.parse(cookie);
  }
  useEffect(() => {
    setIsLoading(true)
    getAllPerformances().then((data) => {
      let sortedData = data.sort(function (a, b) {
        return a.id - b.id
      })
      setValue(sortedData)
      setSelectedValue(sortedData[0])
      setIsLoading(false)
    })
  },[])
  useEffect(() => {
    console.log("LOADER TRIGGERED")
    console.log("LOADER TRIGGERED")
    console.log("LOADER TRIGGERED")
    if(isLoading ) {
      loaderElem.current.classList.add('active')
    } else {
      loaderElem.current.classList.remove('active')
    }

  },[isLoading])

  const openLeftBar = (e) => {
    e.preventDefault();
    console.log("ALO")
    leftBarElem.current.classList.add("active")
    leftBarTriggerBtnElem.current.classList.add("inactive")
  }
  const closeLeftBar = (e) => {
    e.preventDefault();
    if (leftBarElem.current && leftBarTriggerBtnElem.current) {
      leftBarElem.current.classList.remove("active")
      leftBarTriggerBtnElem.current.classList.remove("inactive")
    }

  }
  

  const getAllPerformances = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/performances`)
    const data = await res.json()
    console.log('this is the value')
    console.log(data)
   
    return data
  }

  const openCreatePerformanceModal = () => {
    performanceModalRef.current.classList.toggle("active")
    deletePerformancesModalRef.current.classList.remove("active")
    editPerformanceModalRef.current.classList.remove("active")
  }

  const openDeletePerformanceModal = () => {
    console.log("HELLO")
    deletePerformancesModalRef.current.classList.toggle("active")
    performanceModalRef.current.classList.remove("active")
    editPerformanceModalRef.current.classList.remove("active")
  }

  
  const openEditPerformanceModal = () => {
    console.log("HELLO")
    editPerformanceModalRef.current.classList.toggle("active")
    deletePerformancesModalRef.current.classList.remove("active")
    performanceModalRef.current.classList.remove("active")
  }


  
 
  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}


  // ref={leftBarTriggerBtnElem} onClick={(e)=>openLeftBar(e)}

  return (
    <div className="b-performances-wrapper">
      <Loader loaderElem={loaderElem} />
      <div className="scroll-to-top-btn-small-container-wrapper">
      <div className="scroll-to-top-btn-container"  onClick={scrollToTop}>
      <BsArrowDownCircle style={btnStyle2} />
      </div>
      </div>
      <TopBar value={value} setSelectedValue={setSelectedValue} topBarElem={topBarElem} />
      {selectedValue ?       <Content selectedValue={selectedValue} />:<></>}
      <LeftBar openEditPerformanceModal={openEditPerformanceModal} openDeletePerformanceModal={openDeletePerformanceModal}  value={value} leftBarElem={leftBarElem} topBarElem={topBarElem} closeLeftBar={closeLeftBar} openCreatePerformanceModal={openCreatePerformanceModal} />
      <CreatePerformance performanceModalRef={performanceModalRef} setIsLoading={setIsLoading} />
      <DeletePerformance deletePerformancesModalRef={deletePerformancesModalRef} value={value} selectedValue={selectedValue} />
      
      {selectedValue ? <><EditPerformance editPerformanceModalRef={editPerformanceModalRef} selectedValue={selectedValue} setIsLoading={setIsLoading} /></>:<></>}
      
      
      {cookieIsAuth ?
          <div className="bp-left-bar-trigger-btn-perf" ref={leftBarTriggerBtnElem} onClick={(e) => openLeftBar(e)}>
          <h5>Paramètres</h5>
           <RxGear style={btnStyle} />
      </div>
        :
        <></>
      }
   
   

      <br />
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default PerformancesGalery