import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Login from "./Components/Login.jsx";
import Registration from "./Components/Registration.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import Product from "./Admin/Product.jsx";
import ProductUpdate from "./Admin/ProductUpdate.jsx";
import DeleteProduct from "./Admin/DeleteProduct.jsx";
import AdminDash from "./Admin/AdminDash.jsx";
import ShowAll from "./Admin/ShowAll.jsx";
import Userforgotpassword from "./Components/Userforgotpass.jsx";
import Addcategory from "./Admin/Addcategory.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";
import FavoriteProduct from "./Components/FavirateProduct.jsx";
import FAQ from "./Components/FAQ.jsx";
import Footer from "./Components/FooterPgae.jsx"
import PrivacyPolicy from "./Components/PrivacyPolicy.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactUs from "./Components/ContectUs.jsx";
import UserProfile from "./Components/UserProfile.jsx";
import MyOrders from "./Components/MyOrders.jsx";
import UpdateUser from "./Components/UpdateUser.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userforgotpass" element={<Userforgotpassword />} />
        <Route path="/cart" element={<ProductDetails />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contactUs" element={<ContactUs />} />
        
        
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
      
        <Route path="/adminDash" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDash />
          </ProtectedRoute>
        } />
        
        <Route path="/product" element={
          <ProtectedRoute requiredRole="admin">
            <Product />
          </ProtectedRoute>
        } />
        
        <Route path="/updateproduct" element={
          <ProtectedRoute requiredRole="admin">
            <ProductUpdate />
          </ProtectedRoute>
        } />
        
        <Route path="/deleteproduct" element={
          <ProtectedRoute requiredRole="admin">
            <DeleteProduct />
          </ProtectedRoute>
        } />
        
        <Route path="/showAll" element={
          <ProtectedRoute requiredRole="admin">
            <ShowAll />
          </ProtectedRoute>
        } />
        
        <Route path="/addcategory" element={
          <ProtectedRoute requiredRole="admin">
            <Addcategory />
          </ProtectedRoute>
        } />
        
        
        <Route path="/favorites" element={
          <ProtectedRoute>
            <FavoriteProduct />
          </ProtectedRoute>
        } />
        
        <Route path="/userProfile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
         <Route path="/editUserADD" element={
          <ProtectedRoute>
            <UpdateUser/>
          </ProtectedRoute>
        } />
        <Route path="/myorders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;