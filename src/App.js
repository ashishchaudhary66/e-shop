import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';
import OrderSummary from './pages/OrderSummary';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderSummary />} />
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
