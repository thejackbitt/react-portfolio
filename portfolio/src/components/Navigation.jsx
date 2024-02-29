import React from 'react';
import navigationData from '../destinationDb.json';

const Navigation = () => {

    const scalar = (Math.floor(12 / navigationData.length)) < 1 ? 1 : Math.floor(12 / navigationData.length);

  return (
    <>
      <div className="row">
        {navigationData.map((item) => (
          <div key={item.id} className={`col-${scalar} d-flex justify-content-end align-items-center`}>
            <a id={item.id} className="noDec">
              <p className="header-item click-link">{item.name}</p>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navigation;