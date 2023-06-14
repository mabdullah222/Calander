import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Calender</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto flex">
          <Link to="year" className='mx-5' style={{textDecorationLine:"none",color:"black"}}>Year</Link>
            <Link to="/" className='mx-5' style={{textDecorationLine:"none",color:"black"}}>Month</Link>
            <Link to="week" className='mx-5' style={{textDecorationLine:"none",color:"black"}}>Week</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;