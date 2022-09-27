import {
  BrowserRouter as Router,

  Route,
  Routes,

} from "react-router-dom";
import Index from "./Index"
const CieRouter = () => {
  return (
    <>
    <Routes>
     <Route path="/" element={<Index />} />
     </Routes>
 </>
  )
}

export default CieRouter 