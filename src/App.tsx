import { Route, Routes } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import { ToastProvider } from './context/ToastContext';
import DemoBanner from './components/DemoBanner';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import HomePage from './pages/HomePage';
import TripDetailPage from './pages/TripDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ToastProvider>
      <ModalProvider>
        <a href="#main-content" className="skip-link">
          Перейти к основному содержанию
        </a>
        <DemoBanner />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trips/:slug" element={<TripDetailPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <ScrollManager />
      </ModalProvider>
    </ToastProvider>
  );
}

export default App;
