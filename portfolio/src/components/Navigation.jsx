import React, { useEffect, useState } from 'react';
import navigationData from '../destinationDb.json';

const Navigation = ({ changeComponent }) => {
  const [pageTypes, setPageTypes] = useState([]);

  useEffect(() => {
    const importJSONs = navigationData.map(navigationData =>
      import(/* @vite-ignore */`${navigationData.destination}`).then(module => module.default)
    );

    Promise.all(importJSONs).then(jsons => {
      const loadedPageTypes = jsons.map(json => json[0].pageType);
      setPageTypes(loadedPageTypes);

      loadedPageTypes.forEach(pageType => console.log(pageType));
    }).catch(error => console.error("Error loading JSONs:", error));
  }, []);

  const scalar = (Math.floor(12 / navigationData.length)) < 1 ? 1 : Math.floor(12 / navigationData.length);

  const preHandleClick = (id) => {
    // console.log(pageTypes[id.index])
    const destComp = pageTypes[id.index].charAt(0).toUpperCase() + pageTypes[id.index].slice(1);
    // console.log(destComp)
    handleClick(destComp);
  }

  const handleClick = (componentName) => {
    changeComponent(componentName);
  };

  return (
    <>
      <div className="row">
        {navigationData.map((item, index) => (
          <div key={item.id} className={`col-${scalar} d-flex justify-content-end align-items-center`}>
            <a className="noDec" onClick={() => preHandleClick({index})}>
              <p className="header-item click-link">{item.name}</p>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navigation;
