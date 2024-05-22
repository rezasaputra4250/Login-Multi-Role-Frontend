import React, { useEffect } from "react"; // Mengimpor React dan useEffect dari react
import Layout from "./Layout"; // Mengimpor komponen Layout
import ProductList from "../components/ProductList"; // Mengimpor komponen ProductList
import { useDispatch, useSelector } from "react-redux"; // Mengimpor hooks dari react-redux
import { useNavigate } from "react-router-dom"; // Mengimpor useNavigate dari react-router-dom
import { getMe } from "../features/authSlice"; // Mengimpor action getMe dari authSlice

// Komponen Products
const Products = () => {
  const dispatch = useDispatch(); // Mendapatkan dispatch dari useDispatch
  const navigate = useNavigate(); // Mendapatkan navigate dari useNavigate
  const { isError } = useSelector((state) => state.auth); // Mengambil nilai isError dari state auth

  // Menggunakan useEffect untuk memanggil dispatch getMe ketika komponen pertama kali di-render
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // Menggunakan useEffect untuk melakukan navigasi jika terjadi error
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout> {/* Menampilkan komponen Layout */}
      <ProductList /> {/* Menampilkan komponen ProductList */}
    </Layout>
  );
};

export default Products; // Mengekspor komponen Products sebagai default
