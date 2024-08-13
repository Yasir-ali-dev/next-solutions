import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../index.css";

function Header() {
  return (
    <Navbar expand="lg" className="roboto">
      <Container fluid>
      <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Brand href="#" className='px-3  cursive-fonts'>
        <p className='lead light-purple-color'>
          Next Solutions
        </p>
        </Navbar.Brand>
        <Navbar.Collapse className='d-flex justify-content-evenly' id="navbarScroll">
          <Nav
            className="my-2 flex my-lg-0"
            style={{ maxHeight: '100px' }}
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Products</Nav.Link>
            <Nav.Link href="#">
              About us
            </Nav.Link>
          </Nav>
          <div className="d-flex gap-2">
            <button className='btn-custom'>Log in</button>
            <button className='btn-custom-light'>Sign up</button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;