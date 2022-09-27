import { BrowserRouter as Router } from "react-router-dom";
import BlogRouter from "./blog/BlogRouter";
import CieRouter from "./cie/CieRouter";


function App() {
  return (
    <>
      <Router>
  

        <BlogRouter />
        <CieRouter />
      </Router>
    </>
  );
}

export default App;
