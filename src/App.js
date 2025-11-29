import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import BackgroundExperience from './pages/BackgroundExperience';
import styles from './styles/App.module.scss';
import './assets/JosefinSans-Light.ttf';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/background-experience" element={<BackgroundExperience />} />
          <Route path="/dwp" element={<Navigate to="/" replace />} />
          {/* Catch-all for any unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;