import { Route, Routes } from 'react-router-dom';
import './App.css';
import Container from './components/Container';
import Header from './components/Header';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/products" element={<Container />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
