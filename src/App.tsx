import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Slide } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import { apiGetAllProducts } from "./services/apiService";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { MyContext } from "./MyContext";
import SingleProduct from "./pages/SingleProduct";

function App() {
  const [allProducts, setAllProducts] = useState<any>({});
  const [cartProds, setCartProds] = useState<any>([]);

  const toastOptions: object = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    progress: undefined,
    theme: "light",
  };

  useEffect(() => {
    async function getAllProducts() {
      try {
        const backEndAllProducts = await apiGetAllProducts();

        setAllProducts(backEndAllProducts);
      } catch (error) {
        console.log(error);
      }
    }

    getAllProducts();
  }, []);

  useEffect(() => {
    async function getLocalStorage() {
      const localStorageKeys = Object.keys(localStorage);
      if (localStorageKeys.length > 0) {
        const localStorageValues = localStorageKeys.map((key) =>
          JSON.parse(localStorage.getItem(key)!)
        );
        setCartProds(localStorageValues);
      }
    }
    getLocalStorage();
  }, []);

  const handleAddToCart = (id: any) => {
    const product = allProducts.data.find((prod: any) => prod.id === id);
    const storageProd = localStorage.getItem(id);
    if (storageProd) {
      toast.warn("Produto já adicionado ao carrinho", toastOptions);
    } else {
      setCartProds([...cartProds, product]);
      localStorage.setItem(id, JSON.stringify(product));
      toast.success("Produto adicionado com sucesso", toastOptions);
    }
  };

  const handleRemoveFromCart = (id: any) => {
    const updatedCart = cartProds.filter((prod: any) => prod.id !== id);
    setCartProds([...updatedCart]);
    localStorage.removeItem(id);
    toast.success("Produto removido com sucesso", toastOptions);
  };

  const clearCart = () => {
    localStorage.clear();
    setCartProds([]);
    toast.success("Carrinho limpo com sucesso", toastOptions);
  };

  return (
    <>
      <MyContext.Provider
        value={{
          allProducts,
          setAllProducts,
          cartProds,
          setCartProds,
          handleAddToCart,
          handleRemoveFromCart,
          clearCart,
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
    </>
  );
}

export default App;
