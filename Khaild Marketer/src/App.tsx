import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './Page/Navbar';
import Footer from './Page/Footer';

import Home from './Page/Home';
import Contactus from './Page/contact-us';
import Whoweare from './Page/Who-we-are';

// Admin Pages
import Login from './Page/Admin/Login';
import Dashboard from './Page/Admin/Dashboard';

// Services
import Service01 from './Page/Service/Service01';
import Service02 from './Page/Service/Service02';
import Service03 from './Page/Service/Service03';
import Service04 from './Page/Service/Service04';
import Service05 from './Page/Service/Service05';
import Service06 from './Page/Service/Service06';
import Service07 from './Page/Service/Service07';
import Service08 from './Page/Service/Service08';
import Service09 from './Page/Service/Service09';
import Service10 from './Page/Service/Service10';
import Service11 from './Page/Service/Service11';
import Service12 from './Page/Service/Service12';
import Service13 from './Page/Service/Service13';
import Service14 from './Page/Service/Service14';

// services1
import Service1 from './Page/Service/Service01/Service1';
import Service2 from './Page/Service/Service01/Service2';
import Service3 from './Page/Service/Service01/Service3';
import Service4 from './Page/Service/Service01/Service4';
import Service5 from './Page/Service/Service01/Service5';
import Service6 from './Page/Service/Service01/Service6';
import Service7 from './Page/Service/Service01/Service7';
import Service8 from './Page/Service/Service01/Service8';
import Service9 from './Page/Service/Service01/Service9';
import Service10new from './Page/Service/Service01/Service10new';
import Service11new from './Page/Service/Service01/Service11new';
import Service12new from './Page/Service/Service01/Service12new';
import Service13new from './Page/Service/Service01/Service13new';
import Service14new from './Page/Service/Service01/Service14new';
import ServiceDetail from './Page/Admin/ServiceDetail';

// ✅ --- PROTECTED ROUTE COMPONENT ---
// Ensures users cannot type "/dashboard" in the URL without a token
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// ✅ Layout component (Navbar & Footer logic here)
function Layout() {
  const location = useLocation();

  // Paths where Navbar and Footer should not appear
  const hideLayoutPaths = ['/login', '/dashboard', '/Dashboard'];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/إتصل بنا" element={<Contactus />} />
        <Route path="/من نحن" element={<Whoweare />} />

        {/* services */}
        <Route path="/services/شراء العقار" element={<Service01 />} />
        <Route path="/services/بيع العقار" element={<Service02 />} />
        <Route path="/services/إيجار العقار" element={<Service03 />} />
        <Route path="/services/تشطيب العقار" element={<Service04 />} />
        <Route path="/services/تسليم واستلام العقار" element={<Service05 />} />
        <Route path="/services/النظام يجيب" element={<Service06 />} />
        <Route path="/services/خدمات التوثيق" element={<Service07 />} />
        <Route path="/services/خدمات التصوير العقاري" element={<Service08 />} />
        <Route path="/services/القسم النسائي" element={<Service09 />} />
        <Route path="/services/قسم التمويل العقاري" element={<Service10 />} />
        <Route path="/services/محكم معتمد" element={<Service11 />} />
        <Route path="/services/التقييم العقاري" element={<Service12 />} />
        <Route path="/services/تملّك الأجانب للعقارات" element={<Service13 />} />
        <Route path="/services/الوقف العقاري" element={<Service14 />} />

        {/* services1 */}
        <Route path="/services1/شراء العقار" element={<Service1 />} />
        <Route path="/services1/بيع العقار" element={<Service2 />} />
        <Route path="/services1/إيجار العقار" element={<Service3 />} />
        <Route path="/services1/تشطيب العقار" element={<Service4 />} />
        <Route path="/services1/تسليم واستلام العقار" element={<Service5 />} />
        <Route path="/services1/النظام يجيب" element={<Service6 />} />
        <Route path="/services1/خدمات التوثيق" element={<Service7 />} />
        <Route path="/services1/خدمات التصوير العقاري" element={<Service8 />} />
        <Route path="/services1/خدمات المحاماة" element={<Service9 />} />
        <Route path="/services1/قسم التمويل العقاري" element={<Service10new />} />
        <Route path="/services1/محكم معتمد" element={<Service11new />} />
        <Route path="/services1/التقييم العقاري" element={<Service12new />} />
        <Route path="/services1/تملّك الأجانب للعقارات" element={<Service13new />} />
        <Route path="/services1/الوقف العقاري" element={<Service14new />} />

        {/* admin */}
        <Route path="/login" element={<Login />} />
        <Route path="/service-detail/:serviceId" element={<ServiceDetail/>} />
        
        {/* ✅ NEW SECURE DASHBOARD ROUTE */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}