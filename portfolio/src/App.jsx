import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Article from './components/Article.jsx';
import Document from './components/Document.jsx';
import Form from './components/Form.jsx';
import Portfolio from './components/Portfolio.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('Portfolio');

  const changeComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  const getComponent = () => {
    switch (activeComponent) {
      case 'Article':
        return <Article />;
      case 'Document':
        return <Document />;
      case 'Form':
        return <Form />;
      case 'Portfolio':
      default:
        return <Portfolio />;
    }
  };

  return (
    <>
      <div className='container-fluid d-flex flex-column view'>
        <Header changeComponent={changeComponent} />
        <div className='container d-flex flex-fill'>
          {getComponent()}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
