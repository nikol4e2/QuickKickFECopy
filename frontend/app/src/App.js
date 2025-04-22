
import './App.css';
import { Route, Routes} from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import Home from "./components/homeComponents/home/Home";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/aboutUs/aboutUs";
import Registration from "./components/registration/Registration";

function App() {
  return (
    <div className="App">
        <Navbar />
      <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about-us" element={<AboutUs></AboutUs>}></Route>
          <Route path="/registration" element={<Registration></Registration>}></Route>
      </Routes>
        <Footer/>
    </div>
  );
}

export default App;
