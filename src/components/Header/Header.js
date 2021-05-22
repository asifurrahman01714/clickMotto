import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../images/logo.png';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header  navbar-light bg-light">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#" style={{fontSize : '30px', fontWeight : 'bold'}}>
                                <img src={logo} alt="" />
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Explore</Link>
                                </li>
                                
                                <li className="nav-item">
                                <a className="nav-link active" href="#">Discover</a>
                                </li>

                                <li className="nav-item">
                                <a className="nav-link active" href="#">For Professionals</a>
                                </li>

                                <li className="nav-item">
                                <a className="nav-link active" href="#">Contact</a>
                                </li>
                                <li className="nav-item">
                                    {loggedInUser.email ? <a className="nav-link active" href="#">{loggedInUser.name || <Link to="/login"><button class="btn btn-danger" type="button">LogOut</button></Link>}</a> 
                                    : <Link to="/login"><button class="btn btn-danger" type="button">Login</button></Link>
                                    }
                                </li>
                            </ul>
                            
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;