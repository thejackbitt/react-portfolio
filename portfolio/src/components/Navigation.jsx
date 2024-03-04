import React, { useEffect, useState, useRef } from 'react';

const Navigation = ({ changeComponent }) => {
  const [navigationData, setNavData] = useState(null)
  const menuIconRef = useRef(null)
  const menuListRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('./destinationDb.json')
      .then(response => response.json())
      .then(data => setNavData(data))
      .catch(error => console.error("Ruh roh, Raggy!  Can't get page destinations:", error));
  }, []);

  const [pageTypes, setPageTypes] = useState([]);

  useEffect(() => {
    if (navigationData) {
      const fetchJSONs = navigationData.map(navigationData =>
        fetch(navigationData.destination)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Ruh roh!  A rerror! ${response.status}`);
            }
            return response.json();
          })
      );

      Promise.all(fetchJSONs).then(jsons => {
        const loadedPageTypes = jsons.map(json => json[0].pageType);
        setPageTypes(loadedPageTypes);
        loadedPageTypes.forEach(pageType => console.log(pageType));
      }).catch(error => console.error("Ruh roh, Raggy.  Can't play fetch:", error));
    }
  }, [navigationData]);

  useEffect(() => {
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const menuIcon = menuIconRef.current;
    menuIcon.addEventListener('click', toggleMenu);

    return () => {
      menuIcon.removeEventListener('click', toggleMenu);
    };
  }, [menuOpen]);

  const scalar = navigationData ? (Math.floor(12 / navigationData.length)) < 1 ? 1 : Math.floor(12 / navigationData.length) : 1;

  const preHandleClick = (id) => {
    if (pageTypes[id.index] !== undefined) {
      const destComp = pageTypes[id.index].charAt(0).toUpperCase() + pageTypes[id.index].slice(1);
      handleClick(destComp);
    } else {
      console.error('Ruh roh, Raggy!  No page!');
    }
  }

  const handleClick = (componentName) => {
    changeComponent(componentName);
  };

  return (
    <>
      {/* Mobile Icons */}
      <div className="hamburger-menu">
        <img ref={menuIconRef} id="rotating-image" src="./hamburger_menu.svg" alt="Menu" className={menuOpen ? 'rotated' : ''} />
      </div>
      <div ref={menuListRef} className={`hamburger-menu-list ${menuOpen ? 'menu-open' : ''}`}>
          {navigationData && navigationData.map((item, index) => (
            <div key={item.id} className={`col-${scalar} nav-item d-flex justify-content-end align-items-center`}>
              <a className="noDec" onClick={() => preHandleClick({ index })}>
                <p className="header-item click-link">{item.name}</p>
              </a>
            </div>
          ))}
        </div>
      {/* Desktop Icons */}
        <div className="row top-bar">
          {navigationData && navigationData.map((item, index) => (
            <div key={item.id} className={`col-${scalar} nav-item d-flex justify-content-end align-items-center`}>
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
