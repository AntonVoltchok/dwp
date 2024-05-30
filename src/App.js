import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import './assets/JosefinSans-Light.ttf';
import './styles/App.scss';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
  return (
    <div className="App">
      <ParallaxProvider>
        <Router>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
          {/* <Footer /> */}
        </Router>
      </ParallaxProvider>
    </div>
  );
}

export default App;
