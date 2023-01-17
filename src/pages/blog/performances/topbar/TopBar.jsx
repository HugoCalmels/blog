import { RxValue } from "react-icons/rx"
import "./TopBar.scss"
import Select from "react-select"
const TopBar = (props) => {
  const options = props.value

  console.log(props.value)
  console.log(options)

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
 
          <select id="b-select-mobile-perf-mobile">
          {props.value && props.value.map((performance) => (
       <>
              {performance.featuring.length > 0 ?
                <>
                  <option
                className="b-option-mobile-perf"
                key={performance.id} >     <h5 >{performance.title}</h5>
                <p>& {performance.featuring}</p></option>
                            </>
                :
                <option
                className="b-option-mobile-perf"
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