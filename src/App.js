import { Route, Routes } from 'react-router-dom';
import './App.css';
import Container from './components/Container';
import Header from './components/Header';
import ProductDetails from './components/ProductDetails';
import Orders from './components/Orders';
import OrderSummary from './components/OrderSummary';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/products" element={<Container />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderSummary />} />
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
