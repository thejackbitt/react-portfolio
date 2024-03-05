import $ from 'jquery';
import React, { useState, useEffect } from 'react'

const MobileModeBtn = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme-mobile'));

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme-mobile') || 'light';
        setTheme(savedTheme);
        $(':root').attr('data-theme', savedTheme); 
    }, []);

    useEffect(() => {
        localStorage.setItem('theme-mobile', theme);
        $(':root').attr('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const buttonText = theme === 'light' ? 'Light Mode' : 'Dark Mode';

    return <button id='toggleBtnMobile' onClick={toggleTheme}>{buttonText}</button>
}

export default MobileModeBtn;