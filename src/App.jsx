import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/admin/Index";
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar";
import IndexBlog from "./pages/blog/index/IndexBlog";
import IndexCie from "./pages/cie/IndexCie";
import ImagesGalery from "./pages/blog/images_galery/ImagesGalery";

//const LazyDessins = React.lazy(()=>import('./blog/pages/dessins/dessins-et-croquis/Dessins'))
function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          {/* Authentication router*/}
          {/* <Route path="/" element={<Redirection />} />*/}
          <Route path="/admin" element={<Index />} exact />

          {/* Blog router */}
          <Route path="/gaelle-boucherit" element={<IndexBlog />} exact />
          <Route
            path="/gaelle-boucherit/dessins-et-croquis"
            element={<ImagesGalery arg="dessins" />}
            exact
          />
          <Route
            path="/gaelle-boucherit/paysages"
            element={<ImagesGalery arg="paysages" />}
            exact
          />
          <Route
            path="/gaelle-boucherit/carnets-de-voyages"
            element={<ImagesGalery arg="carnets" />}
          />

          {/* Cie router */}
          <Route path="/" element={<IndexCie />} />
        </Routes>
        <Footer />
      </Router>

    </>
  );
}

export default App;
