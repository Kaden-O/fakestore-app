import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

function EditProduct() {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setError(null);
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                const product = response.data;

                setTitle(product.title);
                setPrice(product.price);
                setDescription(product.description);
                setCategory(product.category);
            } catch (err) {
                setError("Failed to load product details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setMessage(null);
        setError(null);

        try {
            const response = await axios.put(`https://fakestoreapi.com/products/${id}`, {
                title,
                price,
                description,
                category,
            });

            setMessage(`✅ Product "${response.data.title}" updated successfully!`);
        } catch (err) {
            setError("❌ Failed to update product. Please try again.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading product data...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5" style={{ maxWidth: "600px" }}>
            <h2 className="text-center mb-4">Edit Product</h2>

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Product Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    /> 
                </Form.Group>

                <div className="text-center">
                    <Button variant="success" type="submit" disabled={updating}>
                        {updating ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Updating...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </Form>
        
        </Container>
    );
}

export default EditProduct;