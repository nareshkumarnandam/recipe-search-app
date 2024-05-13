import React,{ useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

const App = () => {
  const[darkMode, setDarkMode] = useState(true);
  return (
    <div className='App'>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Home darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  )
}

export default App