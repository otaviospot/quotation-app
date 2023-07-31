import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import {
  apiGetAllProducts,
  apiGetAllCategories,
  apiFilterProductsByCategory,
} from './services/apiService';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import { MyContext } from './MyContext';
import SingleProduct from './pages/SingleProduct';

function App() {
  const [allProducts, setAllProducts] = useState<any>({});
  const [cartProds, setCartProds] = useState<any>([]);
  const [allCategories, setAllCategories] = useState<any>({});
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const realBr = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const toastOptions: object = {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    progress: undefined,
    theme: 'light',
  };

  /* Fetch Back End Products Data */

  useEffect(() => {
    async function getAllProducts() {
      try {
        const backEndAllProducts = await apiGetAllProducts();

        setAllProducts(backEndAllProducts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getAllProducts();
  }, []);

  /* Fetch Local Storage Products Data */

  useEffect(() => {
    async function getLocalStorage() {
      const localStorageKeys = Object.keys(localStorage);
      if (localStorageKeys.length > 0) {
        const localStorageValues = localStorageKeys.map((key) =>
          JSON.parse(localStorage.getItem(key)!)
        );
        setCartProds(localStorageValues);
        setLoading(false);
      }
    }
    getLocalStorage();
  }, []);

  /* Fetch Back End Categories Data */

  useEffect(() => {
    async function getAllCategories() {
      try {
        const backEndAllCategories = await apiGetAllCategories();

        setAllCategories(backEndAllCategories);
      } catch (error) {
        console.log(error);
      }
    }

    getAllCategories();
  }, []);

  async function handleFilterProductsByCategories(categoryName: string) {
    setLoading(true);
    try {
      const backEndProductsFilteredByCategory =
        await apiFilterProductsByCategory(categoryName);

      setAllProducts(backEndProductsFilteredByCategory);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleShowAllProducts() {
    setLoading(true);
    try {
      const backEndAllProducts = await apiGetAllProducts();

      setAllProducts(backEndAllProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddToCart = (id: any) => {
    const product = allProducts.data.find((prod: any) => prod.id === id);
    const storageProd = localStorage.getItem(id);
    if (storageProd) {
      toast.warn('Produto já adicionado ao carrinho', toastOptions);
    } else {
      setCartProds([...cartProds, product]);
      localStorage.setItem(id, JSON.stringify(product));
      toast.success('Produto adicionado com sucesso', toastOptions);
    }
  };

  const handleRemoveFromCart = (id: any) => {
    const updatedCart = cartProds.filter((prod: any) => prod.id !== id);
    setCartProds([...updatedCart]);
    localStorage.removeItem(id);
    toast.success('Produto removido com sucesso', toastOptions);
  };

  const clearCart = () => {
    localStorage.clear();
    setCartProds([]);
    toast.success('Carrinho limpo com sucesso', toastOptions);
  };

  const handleOpenCart = () => {
    setOpenCart(!openCart);
  };

  return (
    <main className="pt-20">
      <MyContext.Provider
        value={{
          allProducts,
          setAllProducts,
          allCategories,
          setAllCategories,
          cartProds,
          setCartProds,
          handleShowAllProducts,
          handleAddToCart,
          handleRemoveFromCart,
          handleFilterProductsByCategories,
          clearCart,
          handleOpenCart,
          setOpenCart,
          openCart,
          realBr,
          loading,
          setLoading,
        }}
      >
        <ToastContainer />
        <Router>
          <Header />
          <Routes>
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </MyContext.Provider>
    </main>
  );
}

export default App;
