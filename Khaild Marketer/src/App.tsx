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
import Service06 from './Page/Service/Service06';
import Service07 from './Page/Service/Service07';
import Service08 from './Page/Service/Service08';
import Service09 from './Page/Service/Service09';




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
        <Route path="/services/other" element={<Service06/>} />
        <Route path="/services/New" element={<Service07/>} />
        <Route path="/services/handovernew" element={<Service08/>} />
        <Route path="/services/inspection" element={<Service09/>} />
        <Route path="/من نحن" element={<Whoweare/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;