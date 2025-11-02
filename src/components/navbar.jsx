import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavbarComponent() {

    return (

        // Navigation bar fixed to top so it is present across the app
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Fake Store</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Link for Home */}
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        {/* Link for Product Listing */}
                        <LinkContainer to="/products">
                            <Nav.Link>Product Listings</Nav.Link>
                        </LinkContainer>

                        {/* Link for Add Product */}
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