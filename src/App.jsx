import { lazy, Suspense } from 'react';
import Header from './components/layout/Header';
import Home from './pages/Home';
import './App.css';

// Lazy load page components
const About = lazy(() => import('./pages/About'));
const Donation = lazy(() => import('./pages/Donation'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="spinner"></div>
  </div>
);

function App() {
  return (
    <>
      <Header />
      <main className="app-main">
        <Home />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <Donation />
          <Contact />
          <Admin />
        </Suspense>
      </main>
      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025 WEMA Charity Foundation. All rights reserved.</p>
          <p className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <span> • </span>
            <a href="#terms">Terms of Service</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;