import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import VirtualizedListPage from './Pages/VirtualizedListPage';
import PaginationPage from "./Pages/PaginationPage";
import './components/App.css'
import ProductCrudPage from './Pages/ProductCrudPage';
import '././components/DarkMode.css';
import UserRegisterForm from './components/UserRegisterForm';
import InfiniteScroll from './components/InfiniteScroll'
import CartPage from './Pages/CartPage';
import ExportCSV from './components/ExportCSV';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/virtualized-list" replace />} />
        <Route path="/virtualized-list" element={<VirtualizedListPage />} />
        <Route path="/pagination-hook" element={<PaginationPage />} />
        <Route path="/product-crud" element={<ProductCrudPage />} />
        <Route path="/user-register" element={<UserRegisterForm />} />
        <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/csv" element={<ExportCSV />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
