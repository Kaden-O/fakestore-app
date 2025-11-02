import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get's the information for a single product
    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
            setProduct(response.data);
        } catch (err) {
            setError("Failed to load product details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

// Handles loading states
    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading product details...</p>
            </Container>
        );
    }
// Handles error messages
    if (error) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="danger">{error}</Alert>
                <Button variant="primary" onClick={fetchProduct}>Retry</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row>
                {/* This Col is for displaying the product image */}
                <Col md={5} className="text-center">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fluid
                        style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                </Col>
                {/* This Col is for displaying the product title, description, category, and price. As well as buttons. */}
                <Col md={7}>
                    <h2 className="mb-3">{product.title}</h2>
                    <p className="text-muted fst-italic">Category: {product.category}</p>
                    <h4 className="text-success mb-3">${product.price}</h4>
                    <p>{product.description}</p>

                    <div className="mt-4">
                        {/* Button to add to cart */}
                        <Button variant="primary" className="me-3">Add to Cart</Button>
                        {/* Button to delete the product */}
                        <Button
                            variant="danger"
                            className="me-3"
                            onClick={() => navigate(`/products/${id}/delete`)}
                        >
                            Delete Product
                        </Button>
                        {/* Button to edit the product */}
                        <Button variant="warning" onClick={() => navigate(`/products/${id}/edit`)}>
                            Edit Product
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetails;