import "./NewComponent.scss"

const NewComponent = (props) => {
  return (
    <div className="new-component">
      <h1>{props.selectedCategory}</h1>
    </div>
  )
}

export default NewComponent