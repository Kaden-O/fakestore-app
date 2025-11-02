import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductListing() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetches products from FakeStoreAPI
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response.data);
        } catch (err) {
            setError("Failed to fetch products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Fetches products on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/products/${id}`);
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading products...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="danger">{error}</Alert>
                <Button variant="primary" onClick={fetchProducts}>Retry</Button>
            </Container>
        );
    }

    return (

        // Displays products in a visually structered layout 
        <Container className="mt-5">
            <h2 className="text-center mb-4">Product Listings</h2>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            {/* Show's Image */}
                            <Card.Img
                                variant="top"
                                src={product.image}
                                alt={product.title}
                                style={{ height: "200px", objectFit: "contain", padding: "10px" }}
                            />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div>
                                    {/* Show's Title */}
                                <Card.Title
                                    style={{
                                        fontSize: "1rem",
                                        height: "3rem",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {product.title}
                                </Card.Title>
                                {/* Show's Price */}
                                <Card.Text className="fw-bold">${product.price}</Card.Text>
                                </div>
                                {/* Button to navigate to Product Details page */}
                                <Button
                                    variant="primary"
                                    onClick={() => handleViewDetails(product.id)}
                                >
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );

}

export default ProductListing;