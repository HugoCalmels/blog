import "./LeftBar.scss"

const LeftBar = () => {
  // cta pour créer du contenu => ce qui implique un view a inverser ?
  // ==> schématiser avec crayon les views : show  / new / et mby "edit" / et destroy ..
  // liste de contenu crée 
  return (
    <div className="bd-left-bar">
      <div className="bdl-create-year">
        <h5>Créer une année</h5>
      </div>
      <div className="bdl-create-photo">
        <h5>Créer une photo</h5>
      </div>
      <div className="bdl-years-list">
        <h5>2022</h5>
        <h5>2021</h5>
        <h5>2020</h5>
      </div>
    </div>
  )
}

export default LeftBar