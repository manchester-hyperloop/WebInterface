import { Nav, Row } from "react-bootstrap";
import "../Styles/Sidebar.css";
import reqImage from '../Images/request.png';
import managerImage from '../Images/Manager.png';

const Sidebar = ({setCurrentPage}) => {
    return(
        <div className="mainContainer">
            <Nav className="flex-column" className="mainNav d-flex align-items-center">
                <div className="textContainer">
                <div className="navElement" onClick={() => setCurrentPage("User Requests")}>
                    <img src={reqImage} className="icon"/><a href="/home">User Requests</a>
                </div>
                <div className="navElement" style={{marginTop: "45%"}} onClick={() => setCurrentPage("User Manager")}>
                    <img src={managerImage} className="icon"/><a href="/home">User Manager</a>
                </div>
                </div>
            </Nav>
        </div>
    )
}

export default Sidebar;