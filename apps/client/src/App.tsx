// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/add-product" element={<AddProduct />} />
        
      </Routes>
    </Router>
  );
};

export default App;
