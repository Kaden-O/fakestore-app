Fakestore Project 

A full-stack-simulated React CRUD application that interacts with the FakeStoreAPI.  
Users can view, add, edit, and delete products in a clean, responsive UI built with React Bootstrap.

---

# Features

## Navigation & Routing
- Built with React Router DOM
- Top-fixed responsive Navbar with navigation links
- Collapses into hamburger icon for mobile view and is mobile responsive
- Routes for:
  - `/` → Home page  
  - `/products` → Product Listings  
  - `/products/:id` → Product Details  
  - `/add-product` → Add Product  
  - `/products/:id/edit` → Edit Product  
  - `/products/:id/delete` → Delete Product  

---

## Home Page
- Hero section with background image and welcome text  
- “View Products” button navigates directly to the product listings page

---

## Product Listings
- Fetches products from FakeStoreAPI
- Displays items in a responsive grid using React Bootstrap Cards
- Includes loading and error states
- “View Details” button navigates to the detailed product page

---

## Product Details
- Displays detailed information about a single product
- Uses useParams() to extract the product ID from the URL
- Handles loading and error messages
- Buttons for:
  - **Add to Cart**
  - **Edit Product** → navigates to edit form
  - **Delete Product** → navigates to confirmation modal

---

## Add Product
- Form built with React Bootstrap
- Fields: Title, Price, Description, Category
- Submits new product data via POST request to FakeStoreAPI
- Displays success or error messages on submission  

---

## Edit Product
- Fetches existing product data via GET
- Pre-fills the form with current details
- Sends PUT request to FakeStoreAPI to simulate update
- Displays success message upon submission

---

## Delete Product
- Confirmation modal ensures safe deletion
- Sends DELETE request to FakeStoreAPI
- Displays success message and redirects to product listings