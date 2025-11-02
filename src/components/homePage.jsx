import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const handleGoToProducts = () => {
        navigate("/products");
    };

    const backgroundImageUrl ="https://www.shutterstock.com/image-photo/flat-lay-composition-different-cleaning-600nw-2459685097.jpg"

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
            }}
        >
        <Container className="home-container text-center">
            <Row className="justify-content-center">
                <Col md={8}>
                {/* Welcome message and introduction to the store */}
                    <h1 className="mb-4">Welcome to the Fake Store 🛍️</h1>
                    <p className="lead fw-semibold">Discover the best products for all your needs from clothes 
                        to the best home accessories and everything inbetween!
                    </p>
                    <p>Browse products and discover what you've always been waiting for!</p>

                    {/* Button to navigate to Product Listing page */}
                    <Button variant="primary" size="lg" className="mt-3" onClick={handleGoToProducts}>View Products</Button>
                </Col>
            </Row>
        </Container>
        </div>
    );       
}

export default HomePage;