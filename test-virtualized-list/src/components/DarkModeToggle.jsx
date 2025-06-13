import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    }
    setDarkMode(!darkMode);
  };

  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
      <i className={darkMode ? 'uil uil-sun' : 'uil uil-moon'}></i>
    </button>
  );
};

export default DarkModeToggle;
