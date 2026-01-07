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
import Service10 from './Page/Service/Service10';
import Service11 from './Page/Service/Service11';
import Service12 from './Page/Service/Service12';
import Service13 from './Page/Service/Service13';
import Service14 from './Page/Service/Service14';




function App() {
  return (
    <Router>
      <Navbar/>     
      <Routes>
        <Route path="/" element={< Home/>} />
        <Route path="/إتصل بنا" element={<Contactus/>} />
        <Route path="/services/بيع العقار" element={<Service02/>} />
        <Route path="/services/شراء العقار" element={<Service01/>} />
        <Route path="/services/إيجار العقار" element={<Service03/>} />
        <Route path="/services/تشطيب العقار" element={<Service04/>} />
        <Route path="/services/تسليم واستلام العقار" element={<Service05/>} />
        <Route path="/services/النظام يجيب" element={<Service06/>} />
        <Route path="/services/خدمات التوثيق" element={<Service07/>} />
        <Route path="/services/خدمات التصوير العقاري" element={<Service08/>} />
        <Route path="/services/القسم النسائي" element={<Service09/>} />
        <Route path="/services/محكم معتمد" element={<Service11/>} />
        <Route path="/services/قسم التمويل العقاري" element={<Service10/>} />
        <Route path="/services/التقييم العقاري" element={<Service12/>} />
        <Route path="/services/تملّك الأجانب للعقارات" element={<Service13/>} />
        <Route path="/services/الوقف العقاري" element={<Service14/>} />
        <Route path="/من نحن" element={<Whoweare/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

