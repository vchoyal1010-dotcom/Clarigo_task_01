import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login.jsx";
import Registration from "./Registration.jsx";
import Dashboard from "./Dashboard.jsx";
import Product from "./Product.jsx";
function App() {
  return (
    <BrowserRouter>

      <Routes>  

        <Route path="/" element={<Registration />} />

        <Route path="/login" element={<Login />} />

         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/product" element={<Product/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;