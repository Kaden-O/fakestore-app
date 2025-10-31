import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductListing() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
        <Container className="mt-5">
            <h2 className="text-center mb-4">Product Listings</h2>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Img
                                variant="top"
                                src={product.image}
                                alt={product.title}
                                style={{ height: "200px", objectFit: "contain", padding: "10px" }}
                            />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div>
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
                                <Card.Text className="fw-bold">${product.price}</Card.Text>
                                </div>
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