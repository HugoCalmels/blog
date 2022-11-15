import "./Carnets.scss"

const Carnets = () => {
  return (
    <>
      <div className="bc-list">
          <ul>
            <li>Taiwan</li>
            <li>Paris</li>
            <li>Londres</li>
            <li>New-York</li>
            <li>Toulouse</li>
          </ul>
        </div>
      <div className="bc-content-wrapper">
        
        <div className="bc-content">
          <div className="bc-photos-grid">
            <div className="bc-photo"></div>
            <div className="bc-photo"></div>
            <div className="bc-photo"></div>
            <div className="bc-photo"></div>
            <div className="bc-photo"></div>
            <div className="bc-photo"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Carnets