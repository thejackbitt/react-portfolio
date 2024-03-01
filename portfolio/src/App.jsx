import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Article from './components/Article.jsx'
import Document from './components/Document.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

function App() {

  return (
    <>
    <div className='container-fluid d-flex flex-column view'>
    <Header/>
    <div className='container d-flex flex-fill'>
      <Document/>
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default App
