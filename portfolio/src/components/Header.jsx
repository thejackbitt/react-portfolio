import ModeBtn from './ModeBtn.jsx'
import Navigation from './Navigation.jsx'

function Header({ changeComponent }) {
    return (
      <>
        <div id="headerRoot" className="container-fluid">
          <div className="row header-box justify-content-start align-items-center">
            <div className="col-md-6 d-none-sm">
                <h1 className="header-text">Jack Bittner</h1>
            </div>
            <div className="col-md-4 col-12 p-0">
            <Navigation changeComponent={changeComponent} />
    </div>
            <div className="col-md-2 d-none-sm d-flex justify-content-center align-items-center">
              <ModeBtn/>
            </div>
          </div>
        </div>
      </>
    )
}

export default Header