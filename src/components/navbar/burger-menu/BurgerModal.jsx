import "./BurgerModal.scss"

const BurgerModal = (props) => {
  return (
    <div className="b-navbar-burger-modal-container" ref={props.burgerModalElem}>
      <ul className="b-navbar-burger-modal-ul">
        <li>ADMIN</li>
        <li>DESSINS</li>
        <li>PERFORMANCES</li>
        <li>RESEAU</li>
        <li>CONTACT</li>
        <li>SITE COMPAGNIE</li>
      </ul>
    </div>
  )
}

export default BurgerModal