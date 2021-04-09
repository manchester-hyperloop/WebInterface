import './App.css';
import AdminPage from "./Components/AdminPage"
import Sidebar from "./Components/Sidebar"
import {Container, Row, Col} from "react-bootstrap";
import { useEffect, useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState("User Requests");

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage])

  return (
    <div className="App">
      <Container fluid className="Container">
                <Row>
                    <Col xs={3} id="sidebar-wrapper">      
                      <Sidebar setCurrentPage={setCurrentPage} />
                    </Col>
                    <Col  xs={9} id="page-content-wrapper">
                    <AdminPage currentPage = {currentPage}/>
                    </Col> 
                </Row>

      </Container>
    </div>
  );
}

export default App;
