import "./TopBar.scss"

const TopBar = (props) => {

  const handleChange = (e) => {
    e.preventDefault()
    props.setSelectedSubMenu(e.target.selectedOptions[0].value)
  }
  return (
    <div className="admin-topbar-container">
      <ul>
        <li onClick={()=>props.setSelectedSubMenu("Connexion")}>Connexion</li>
        <li onClick={() => props.setSelectedSubMenu("Newsletter")}>Newsletter</li>
        <li onClick={()=>props.setSelectedSubMenu("Subscribers")}>Liste des abonnés</li>
        <li onClick={()=>props.setSelectedSubMenu("Statistiques")}>Statistiques</li>
      </ul>
     

      <div className="admin-mobile-select-wrapper">
        <select onChange={(e)=>handleChange(e)}>
          <option>Connexion</option>
          <option>Newsletter</option>
          <option>Liste des abonnés</option>
          <option>Statistiques</option>
        </select>
     </div>
    </div>
  )
}

export default TopBar