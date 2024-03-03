import React from 'react';
import navigationData from '../destinationDb.json';

const Navigation = ({ changeComponent }) => {

  const scalar = (Math.floor(12 / navigationData.length)) < 1 ? 1 : Math.floor(12 / navigationData.length);

  const handleClick = (componentName) => {
    changeComponent(componentName);
  };

  return (
    <>
      <div className="row">
        {navigationData.map((item, index) => (
          <div key={item.id} className={`col-${scalar} d-flex justify-content-end align-items-center`}>
            <a className="noDec" onClick={() => handleClick(modules[`path${index}`])}>
              <p className="header-item click-link">{item.name}</p>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navigation;