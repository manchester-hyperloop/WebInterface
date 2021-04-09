import {Col} from 'react-bootstrap';
import '../Styles/AdminPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import acceptImage from '../Images/check.png';
import declineImage from '../Images/Reject.png';
import titleImage from '../Images/HyperloopTitle.png'
import settingsImage from '../Images/settings.png'
import { useState } from 'react';

const AdminPage = ({currentPage}) => {
    const [requests, setRequests] = useState(["Request 1", "Request 2", "Request 3", "Request 4", "Request 5"]);
    const [users, setUsers] = useState(["User 1", "User 2", "User 3", "User 4"]);

    return (
        <div>
            <br/>
            <div style={{textAlign: "center", marginBottom: "5%"}}>
                <img src={titleImage}/>
            </div>
            <h2>{currentPage}</h2>
            <br/>
            <div>
                { currentPage == "User Requests" ?
                    <Col sm={6} className="m-auto shadow-lg p-3 mb-5 bg-white rounded" style={{backgroundColor: "#F5F5F5"}}>
                        {
                            requests.map((request, index) => (
                                <div style={{display: "flex"}}>
                                    <p> {index+1}. {request} </p> <img className="imgBtn" style={{maxWidth: "3.5%", height: "3.5%", marginLeft: "2%", marginTop: "1%"}} src={acceptImage}/> <img className="imgBtn" style={{maxWidth: "2.5%", height: "2.5%", marginLeft: "2%", marginTop: "1.5%"}} src={declineImage}/>
                                </div>
                            ))
                        }
                    </Col> : 
                    <Col sm={6} className="m-auto shadow-lg p-3 mb-5 bg-white rounded" style={{backgroundColor: "#F5F5F5"}}>
                        {
                            users.map((user, index) => (
                                <div style={{display: "flex"}}>
                                    <p> {index+1}. {user} </p> <img className="imgBtn" style={{maxWidth: "3.5%", height: "3.5%", marginLeft: "2%", marginTop: "1%"}} src={settingsImage}/> <img className="imgBtn" style={{maxWidth: "2.5%", height: "2.5%", marginLeft: "2%", marginTop: "1.5%"}} src={declineImage}/>
                                </div>
                            ))
                        }
                    </Col>
                }
             </div>
             <br/>
        </div>
    );
}

export default AdminPage;