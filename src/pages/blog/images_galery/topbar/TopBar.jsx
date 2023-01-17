import "./TopBar.scss"
import Cookies from "js-cookie";
import {useEffect} from "react"
const TopBar = (props) => {
  const isAuthCookie = Cookies.get("cie-lutin-isAuth") ? JSON.parse(Cookies.get("cie-lutin-isAuth")) : null

  useEffect(() => {
    if (isAuthCookie) {
      props.topBarElem.current.classList.add("alert")

    }
  }, [])
  
  const handleSelect = (e) => {
    e.preventDefault()
    props.displaySelectedCategory(e.target.selectedOptions[0].value)
  }
  return (
    <section className="bd-top-bar" ref={props.topBarElem}>
      <div className="bd-top-bar-container">
        <div className="bd-top-bar-categories">
          {props.categories.map((category) => (
            <>
              {category.title === props.selectedCategory ?
               <div className="bd-top-bar-category selected"
               key={category.id}
               id={`bdl-year-unit_${category.title}`}
               onClick={() => props.displaySelectedCategory(category.title)}
             >
               <h5>{category.title}</h5>
              
             </div>
                :
                <div className="bd-top-bar-category"
            key={category.id}
            id={`bdl-year-unit_${category.title}`}
            onClick={() => props.displaySelectedCategory(category.title)}
          >
            <h5>{category.title}</h5>
           
          </div>
              }
          
          </>
        ))}
        </div>

        <div className="bd-top-bar-categories-mobile">
          <form >
          <select id="b-select-mobile-dessins"onChange={(e) => handleSelect(e)}>
            {props.categories.map((cate) => (
              <option
                className="b-option-mobile-dessins"
                key={cate.id} >{cate.title}</option>
            ))}
            </select>
            </form>
        </div>
      </div>
    </section>
  )
}

export default TopBar