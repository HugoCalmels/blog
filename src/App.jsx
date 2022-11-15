import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Authentication from "./authentication/Authentication"
import Redirection from "./redirection/Redirection"
import Navbar from "./blog/components/navbar/Navbar"
import IndexBlog from "./blog/IndexBlog"
import IndexCie from "./cie/IndexCie"
import Dessins from "./blog/pages/dessins/dessins-et-croquis/Dessins";
import Paysages from "./blog/pages/dessins/paysages/Paysages";
import Carnets from "./blog/pages/dessins/carnets-de-voyages/Carnets";
import Solo from "./blog/pages/performances/solo/Solo"
import Group from "./blog/pages/performances/group/Group"

function App() {
  return (
    <>
      <Router>

        <Navbar />
        <div className="bd-dessins-title">
          <h2 >Dessins et croquis</h2>
          </div>
        <Routes>

        {/* Authentication router*/}
        {/* <Route path="/" element={<Redirection />} />*/}
        <Route path="/admin" element={<Authentication />} />
  
        
        {/* Blog router */}
        <Route path="/gaelle-boucherit" element={<IndexBlog />} />
        <Route path="/gaelle-boucherit/dessins-et-croquis" element={<Dessins />} />
        <Route path="/gaelle-boucherit/paysages" element={<Paysages />} />
        <Route path="/gaelle-boucherit/carnets-de-voyages" element={<Carnets />} />
        <Route path="/gaelle-boucherit/performances/solo" element={<Solo />} />
        <Route path="/gaelle-boucherit/performances/à-plusieurs" element={<Group />} />
        
        {/* Cie router */}
          <Route path="/" element={<IndexCie />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
