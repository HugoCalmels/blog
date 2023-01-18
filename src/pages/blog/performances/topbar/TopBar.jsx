import { RxValue } from "react-icons/rx"
import "./TopBar.scss"

const TopBar = (props) => {



  const handleChange = (e) => {
    e.preventDefault()

    //props.setSelectedValue(e.target.selectedOptions[0].value)
    const foundPerf = props.value.find(perf => perf.id == e.target.selectedOptions[0].id)

    props.setSelectedValue(foundPerf)
  }
  return (
    <div className="bp-topbar" ref={props.topBarElem}>
      <div className="bp-topbar-container">
        <div className="bp-topbar-entries">
          {props.value && props.value.map((performance) => (
       <>
         
              {performance.featuring.length > 0 ?
                <>
                  <div className="bp-topbar-perf" onClick={() => props.setSelectedValue(performance)}>
                  <h5 >{performance.title}</h5>
                    <p>& {performance.featuring}</p>
                    </div>
                            </>
                :
                <div className="bp-topbar-perf no-feat" >
                <h5 onClick={() => props.setSelectedValue(performance)} >{performance.title}</h5>
              
                  </div>
              }
          </>
          
      ))}
          </div>
        </div>

        <div className="bd-top-bar-categories-mobile-perf">

          <select id="b-select-mobile-perf-mobile" onChange={(e)=>handleChange(e)}>
          {props.value && props.value.map((performance) => (
       <>
              {performance.featuring.length > 0 ?
                <>
                  <option
                    id={performance.id}
                className="b-option-mobile-dessins"
                key={performance.id} >     <h5 >{performance.title}</h5>
                <p>&nbsp;& {performance.featuring}</p></option>
                            </>
                :
                <option
                id={performance.id}
                className="b-option-mobile-dessins"
                key={performance.id} ><h5 >{performance.title}</h5></option>
              
                
              }
          </>
          
      ))}
            </select>
         
        </div>
    </div>
  )
}

export default TopBar