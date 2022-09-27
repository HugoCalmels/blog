import {
  BrowserRouter as Router,

  Route,
  Routes,

} from "react-router-dom";

import Index from "./Index"


const BlogRouter = () => {
  return (
    <>
       <Routes>
        <Route path="/gaelle-boucherit" element={<Index />} />
        </Routes>
    </>
  )
}

export default BlogRouter