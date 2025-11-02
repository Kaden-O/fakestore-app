import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button, Container, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

function DeleteProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [showModal, setShowModal] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError("Failed to load product details. Please try again.");
            }
        };

        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);

        // Allows users to delete a product
        try {
            await axios.delete(`https://fakestoreapi.com/products/${id}`);
            
            // Displays success message letting user know product has been deleted successfully
            setMessage("✅ Product deleted successfully!");

            // Automatically re-directs users back to Product Listing page
            setTimeout(() => navigate("/products"), 2000);
        } catch (err) {
            setError("❌ Failed to delete product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        navigate(`/products/${id}`);
    };

    return (
        <Container className="mt-5">
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            {/* Confirmation Modal before deletion */}
            {!message && product && (
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>
                            Are you sure you want to delete <strong>{product.title}</strong>?<br />
                            This action cannot be undone.
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete} disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
}

export default DeleteProduct;