export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid ">
                <a className="navbar-brand medium-header-fonts " href="#">biblio</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item ">
                    <a className="nav-link active medium-header-fonts" aria-current="page" href="#">BOOKS</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link medium-header-fonts" href="/lists">LIST</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link medium-header-fonts" href="#">ABOUT</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>

    )

}
