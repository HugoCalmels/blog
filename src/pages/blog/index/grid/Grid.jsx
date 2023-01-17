import "./Grid.scss"
import Card from "./card/Card"
const Grid = (props) => {

   // can I have a better function ?
  let gridArray = props.fetchedData.filter(type => type.id !== 1)

  let sortedArray = gridArray.sort((a, b) => a.id - b.id)

  console.log("GRIIIIIIIIIIID")
  console.log(gridArray)
  return (
    <div className="b-index-content-grid">
      {gridArray.map((type, index) => (
        <Card data={type} index={index}  setIsLoading={props.setIsLoading} />
      ))}
 
    </div>
  )
}

export default Grid