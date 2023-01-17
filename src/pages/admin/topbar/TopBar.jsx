import "./TopBar.scss"

const TopBar = (props) => {
  return (
    <div className="admin-topbar-container">
      <ul>
        <li onClick={()=>props.setSelectedSubMenu("Connexion")}>Connexion</li>
        <li onClick={() => props.setSelectedSubMenu("Newsletter")}>Newsletter</li>
        <li onClick={()=>props.setSelectedSubMenu("Subscribers")}>Liste des abonnés</li>
        <li onClick={()=>props.setSelectedSubMenu("Statistiques")}>Statistiques</li>
      </ul>
     
    </div>
  )
}

export default TopBar