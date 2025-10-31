import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavbarComponent() {

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Fake Store</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/products">
                            <Nav.Link>Product Listings</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/add-product">
                            <Nav.Link>Add Product</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};

export default NavbarComponent;