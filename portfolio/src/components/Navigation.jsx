import React, { useEffect, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

const Navigation = ({ changeComponent }) => {
  const [navigationData, setNavData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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

  const preHandleClick = (id) => {
    if (pageTypes[id.index] !== undefined) {
      const destComp = pageTypes[id.index].charAt(0).toUpperCase() + pageTypes[id.index].slice(1);
      handleClick(destComp);
    } else {
      console.error('Ruh roh, Raggy!  No page!');
    }
  };

  const handleClick = (componentName) => {
    changeComponent(componentName);
    if (window.innerWidth <= 450) toggle();
  };

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {navigationData && navigationData.map((item, index) => (
              <NavItem key={item.id}>
                <NavLink href="#" onClick={() => preHandleClick({ index })}>
                  {item.name}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
