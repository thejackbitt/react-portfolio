import React, { useEffect, useState, useRef } from "react";
import MobileModeBtn from "./MobileModeBtn.jsx";

const Navigation = ({ changeComponent }) => {
  const [navigationData, setNavData] = useState(null);
  const menuIconRef = useRef(null);
  const menuListRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("./destinationDb.json")
      .then((response) => response.json())
      .then((data) => setNavData(data))
      .catch((error) =>
        console.error("Ruh roh, Raggy!  Can't get page destinations:", error)
      );
  }, []);

  const [pageTypes, setPageTypes] = useState([]);

  useEffect(() => {
    if (navigationData) {
      const fetchJSONs = navigationData.map((navigationData) =>
        fetch(navigationData.destination).then((response) => {
          if (!response.ok) {
            throw new Error(`Ruh roh!  A rerror! ${response.status}`);
          }
          return response.json();
        })
      );

      Promise.all(fetchJSONs)
        .then((jsons) => {
          const loadedPageTypes = jsons.map((json) => json[0].pageType);
          setPageTypes(loadedPageTypes);
          loadedPageTypes.forEach((pageType) => console.log(pageType));
        })
        .catch((error) =>
          console.error("Ruh roh, Raggy.  Can't play fetch:", error)
        );
    }
  }, [navigationData]);

  useEffect(() => {
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const menuIcon = menuIconRef.current;
    menuIcon.addEventListener("click", toggleMenu);

    return () => {
      menuIcon.removeEventListener("click", toggleMenu);
    };
  }, [menuOpen]);

  const scalar = navigationData
    ? Math.floor(12 / navigationData.length) < 1
      ? 1
      : Math.floor(12 / navigationData.length)
    : 1;

  const preHandleClick = (id) => {
    if (pageTypes[id.index] !== undefined) {
      const destComp =
        pageTypes[id.index].charAt(0).toUpperCase() +
        pageTypes[id.index].slice(1);
      handleClick(destComp);
      setMenuOpen(false);
    } else {
      console.error("Ruh roh, Raggy! No page!");
    }
  };

  const handleClick = (componentName) => {
    changeComponent(componentName);
  };

  return (
    <>
      {/* Mobile Icons */}
      <div className='d-flex'>
        <h1 className="mobile-header-text">Jack Bittner</h1>
        <div className="hamburger-menu">
          <svg
            ref={menuIconRef}
            id="rotating-image"
            alt="Menu"
            className={menuOpen ? "rotated" : ""}
            data-name="burger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 548.8 398.29"
          >
            <path
              className="cls-1"
              d="m37.53,75.14h410.77c18.91,0,37.86.31,56.77,0,.27,0,.54,0,.81,0,19.62,0,38.41-17.25,37.5-37.5-.91-20.32-16.48-37.5-37.5-37.5H95.11C76.2.14,57.25-.17,38.34.14c-.27,0-.54,0-.81,0C17.92.14-.88,17.38.03,37.64s16.48,37.5,37.5,37.5h0Z"
            />
            <path
              className="cls-1"
              d="m42.93,236.65h410.77c18.91,0,37.86.31,56.77,0,.27,0,.54,0,.81,0,19.62,0,38.41-17.25,37.5-37.5s-16.48-37.5-37.5-37.5H100.51c-18.91,0-37.86-.31-56.77,0-.27,0-.54,0-.81,0-19.62,0-38.41,17.25-37.5,37.5s16.48,37.5,37.5,37.5h0Z"
            />
            <path
              className="cls-1"
              d="m37.53,398.16h410.77c18.91,0,37.86.31,56.77,0,.27,0,.54,0,.81,0,19.62,0,38.41-17.25,37.5-37.5-.91-20.32-16.48-37.5-37.5-37.5H95.11c-18.91,0-37.86-.31-56.77,0-.27,0-.54,0-.81,0-19.62,0-38.41,17.25-37.5,37.5.91,20.32,16.48,37.5,37.5,37.5h0Z"
            />
          </svg>
        </div>
        <div
          ref={menuListRef}
          className={`hamburger-menu-list ${menuOpen ? "menu-open" : ""}`}
        >
          {navigationData &&
            navigationData.map((item, index) => (
              <div
                key={item.id}
                className={`nav-item d-flex justify-content-end align-items-center`}
              >
                <a className="noDec" onClick={() => preHandleClick({ index })}>
                  <p className="header-item click-link">{item.name}</p>
                  <hr/>
                </a>
              </div>
            ))}
          <MobileModeBtn />
        </div>
      </div>
      {/* Desktop Icons */}
      <div className="row top-bar">
        {navigationData &&
          navigationData.map((item, index) => (
            <div
              key={item.id}
              className={`col-${scalar} nav-item d-flex justify-content-end align-items-center`}
            >
              <a className="noDec" onClick={() => preHandleClick({ index })}>
                <p className="header-item click-link">{item.name}</p>
              </a>
            </div>
          ))}
      </div>
    </>
  );
};

export default Navigation;
