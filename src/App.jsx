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
import { LoginContext } from "./authentication/LoginContext"
import {useState} from "react"
//const LazyDessins = React.lazy(()=>import('./blog/pages/dessins/dessins-et-croquis/Dessins'))
function App() {

  const [isAuth, setIsAuth] = useState(false) // useConte
  return (
    <>
      <LoginContext.Provider value={{isAuth, setIsAuth}} >
      <Router>

        <Navbar />
        
        <Routes>

        {/* Authentication router*/}
        {/* <Route path="/" element={<Redirection />} />*/}
        <Route path="/admin" element={<Authentication />} exact/>
  
        
        {/* Blog router */}
        <Route path="/gaelle-boucherit" element={<IndexBlog />}  exact/>
        <Route path="/gaelle-boucherit/dessins-et-croquis" element={<Dessins />}  exact/>
        <Route path="/gaelle-boucherit/paysages" element={<Paysages />}  exact/>
        <Route path="/gaelle-boucherit/carnets-de-voyages" element={<Carnets />} />
        <Route path="/gaelle-boucherit/performances/solo" element={<Solo />}  exact/>
        <Route path="/gaelle-boucherit/performances/à-plusieurs" element={<Group />}  exact/>
        
        {/* Cie router */}
          <Route path="/" element={<IndexCie />} />
          
        </Routes>
        </Router>
        </LoginContext.Provider>
    </>
  );
}

export default App;
