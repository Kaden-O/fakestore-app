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


    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading product details...</p>
            </Container>
        );
    }

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
                <Col md={5} className="text-center">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fluid
                        style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                </Col>
                <Col md={7}>
                    <h2 className="mb-3">{product.title}</h2>
                    <p className="text-muted fst-italic">Category: {product.category}</p>
                    <h4 className="text-success mb-3">${product.price}</h4>
                    <p>{product.description}</p>

                    <div className="mt-4">
                        <Button variant="primary" className="me-3">Add to Cart</Button>
                        <Button
                            variant="danger"
                            className="me-3"
                            onClick={() => navigate(`/products/${id}/delete`)}
                        >
                            Delete Product
                        </Button>
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