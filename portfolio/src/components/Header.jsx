import ModeBtn from './ModeBtn.jsx'

function Header() {
    return (
      <>
        <div className="container-fluid">
          <div className="row header-box justify-content-start align-items-center">
            <div className="col-6">
                <h1 className="header-text">Jack Bittner</h1>
            </div>
            <div className="col-1 d-flex justify-content-end align-items-center">
                <a id='portfolioA' className='noDec'>
                    <p className="header-item">About Me</p>
                </a>
            </div>
            <div className="col-1 d-flex justify-content-end align-items-center">
                <a id='portfolioA' className='noDec'>
                    <p className="header-item">Resume</p>
                </a>
            </div>
            <div className="col-1 d-flex justify-content-end align-items-center">
                <a id='portfolioA' className='noDec'>
                    <p className="header-item">Portfolio</p>
                </a>
            </div>
            <div className="col-1 d-flex justify-content-end align-items-center">
                <a id='contactA' className='noDec'>
                    <p className="header-item">Contact</p>
                </a>
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
                <ModeBtn/>
            </div>
          </div>
        </div>
      </>
    )
}

export default Header