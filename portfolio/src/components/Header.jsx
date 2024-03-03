import ModeBtn from './ModeBtn.jsx'
import Navigation from './Navigation.jsx'

function Header({ changeComponent }) {
    return (
      <>
        <div className="container-fluid">
          <div className="row header-box justify-content-start align-items-center">
            <div className="col-6">
                <h1 className="header-text">Jack Bittner</h1>
            </div>
            <div className="col-4">
            <Navigation changeComponent={changeComponent} />
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