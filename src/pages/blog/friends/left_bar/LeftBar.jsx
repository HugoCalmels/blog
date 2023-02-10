import "./LeftBar.scss";
import { RxCross1 } from "react-icons/rx";
const LeftBar = (props) => {
  const btnStyle = { color: "#424242", width: "20px", height: "20px" };
  return (
    <aside className="bd-left-bar" ref={props.leftBarElemRef}>
      <div
        className="bd-left-bar-btn-to-display-elem"
        onClick={(e) => props.closeLeftBar(e)}
      >
        <h5>Retour</h5>
        <RxCross1 style={btnStyle} />
      </div>

      <div className="bdl-create-year" onClick={props.openCreateFriendModal}>
        <h5>Créer coup de coeur</h5>
      </div>
      <div className="bdl-create-photo" onClick={props.openDeleteFriendModal}>
        <h5>Suppr coup de coeur</h5>
      </div>
    </aside>
  );
};

export default LeftBar;
