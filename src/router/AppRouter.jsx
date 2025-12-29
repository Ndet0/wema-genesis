import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Donation from '../pages/Donation';
import Contact from '../pages/Contact';
import Admin from '../pages/Admin';
import Success from '../pages/Success';
import Cancel from '../pages/Cancel';
import Layout from '../components/layout/Layout';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}