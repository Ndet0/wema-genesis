import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';

// Lazy load components for better performance
const About = lazy(() => import('./components/About'));
const Donation = lazy(() => import('./components/Donation'));
const Contact = lazy(() => import('./components/Contact'));
const Admin = lazy(() => import('./components/Admin'));

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