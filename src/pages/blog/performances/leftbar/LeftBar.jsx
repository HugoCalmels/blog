import "./LeftBar.scss";
import { RxCross1 } from "react-icons/rx";
const LeftBar = (props) => {
  const btnStyle = { color: "#424242", width: "20px", height: "20px" };

  return (
    <aside className="bd-left-bar-perf" ref={props.leftBarElem}>
      <div
        className="bd-left-bar-btn-to-display-elem-perf"
        onClick={(e) => props.closeLeftBar(e)}
      >
        <h5>Retour</h5>
        <RxCross1 style={btnStyle} />
      </div>

      <div
        className="bdl-create-year"
        onClick={props.openCreatePerformanceModal}
      >
        <h5>Créer performance</h5>
      </div>
      <div
        className="bdl-create-photo"
        onClick={props.openDeletePerformanceModal}
      >
        <h5>Suppr performance</h5>
      </div>
      <div
        className="bdl-create-photo"
        onClick={props.openEditPerformanceModal}
      >
        <h5>Edit performance</h5>
      </div>
    </aside>
  );
};

export default LeftBar;
