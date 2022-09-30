import {
  BrowserRouter as Router,

  Route,
  Routes,

} from "react-router-dom";
import Navbar from "./components/navbar/Navbar"
import Index from "./Index"
import Dessins from "./pages/dessins/dessins-et-croquis/Dessins";
import Paysages from "./pages/dessins/paysages/Paysages";
import Carnets from "./pages/dessins/carnets-de-voyages/Carnets";


const BlogRouter = () => {
  return (
    <>
      <Navbar />
       <Routes>
        <Route path="/gaelle-boucherit" element={<Index />} />
        <Route path="/gaelle-boucherit/dessins-et-croquis" element={<Dessins />} />
        <Route path="/gaelle-boucherit/paysages" element={<Paysages />} />
        <Route path="/gaelle-boucherit/carnets-de-voyages" element={<Carnets />} />
        </Routes>
    </>
  )
}

export default BlogRouter