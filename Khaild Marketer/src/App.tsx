import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Page/Navbar';
import Footer from './Page/Footer';
import Home from './Page/Home';
import Contactus from './Page/contact-us';
import Service01 from './Page/Service/Service01';
import Service02 from './Page/Service/Service02';
import Service03 from './Page/Service/Service03';
import Service04 from './Page/Service/Service04';
import Service05 from './Page/Service/Service05';
import Whoweare from './Page/Who-we-are';




function App() {
  return (
    <Router>
      <Navbar/>     
      <Routes>
        <Route path="/" element={< Home/>} />
        <Route path="/إتصل بنا" element={<Contactus/>} />
        <Route path="/services/sell" element={<Service02/>} />
        <Route path="/services/buy" element={<Service01/>} />
        <Route path="/services/rent" element={<Service03/>} />
        <Route path="/services/finish" element={<Service04/>} />
        <Route path="/services/handover" element={<Service05/>} />
        <Route path="/من نحن" element={<Whoweare/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;