import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/admin/Index";
import {useRef, useState} from "react"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar";
import IndexBlog from "./pages/blog/index/IndexBlog";
import IndexCie from "./pages/cie/IndexCie";
import ImagesGalery from "./pages/blog/images_galery/ImagesGalery";
import PhotosGalery from "./pages/blog/photos/PhotosGalery"
import PerformancesGalery from "./pages/blog/performances/PerformancesGalery"
import FriendsIndex from "./pages/blog/friends/FriendsIndex"
import ContactIndex from "./pages/blog/contact/ContactIndex"
import NewsLetterIndex from "./pages/blog/newsletter/NewsLetterIndex"
import QuitNewsLetterIndex from "./pages/blog/quit-newsletter/QuitNewsLetterIndex"

//const LazyDessins = React.lazy(()=>import('./blog/pages/dessins/dessins-et-croquis/Dessins'))
function App() {

  const openPolicyModal = () => {
    policyModalRef.current.classList.add("active")
  }
  const policyModalRef = useRef(null)


  return (
    <>
      <Router>

        <Navbar />

        <Routes>
          {/* Authentication router*/}
          {/* <Route path="/" element={<Redirection />} />*/}
          <Route path="/admin" element={<Index page="admin"/>} exact />

          {/* Blog router */}
          <Route path="/gaelle-boucherit" element={<IndexBlog page="b-index"/>}  exact />
          <Route
            path="/gaelle-boucherit/dessins-et-croquis"
            element={<ImagesGalery arg="dessins" page="b-dessins"/>}
            exact
          />
          <Route
            path="/gaelle-boucherit/paysages"
            element={<ImagesGalery arg="paysages" page="b-dessins" />}
            exact
          />
          <Route
            path="/gaelle-boucherit/carnets-de-voyages"
            element={<ImagesGalery arg="carnets" page="b-dessins"/>}
          />
            <Route
            path="/gaelle-boucherit/photos"
            element={<PhotosGalery page="b-photos"/>}
          />
           <Route
            path="/gaelle-boucherit/performances"
            element={<PerformancesGalery page="b-performances"/>}
          />

<Route
            path="/gaelle-boucherit/coups-de-coeur"
            element={<FriendsIndex page="b-friends"/>}
          />

<Route
            path="/gaelle-boucherit/contact"
            element={<ContactIndex page="b-contact"/>}
          />

<Route
            path="/gaelle-boucherit/newsletter"
            element={<NewsLetterIndex page="b-newsletter" openPolicyModal={openPolicyModal}/>}
          />

<Route
            path="/gaelle-boucherit/quit-newsletter/:token"
            element={<QuitNewsLetterIndex page="b-quit-newsletter"/>}
          /> {/* trop léger sur la sécurité ...*/}

          

          {/* Cie router */}
          <Route path="/cie" element={<IndexCie />} />
        </Routes>
        <Footer openPolicyModal={openPolicyModal} policyModalRef={policyModalRef} />
      </Router>

    </>
  );
}

export default App;
