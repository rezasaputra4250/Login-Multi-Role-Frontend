import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddProduct from "../components/FormAddProduct";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddProduct = () => {
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari hook useDispatch
  const navigate = useNavigate(); // Mendapatkan fungsi navigate dari hook useNavigate
  const { isError } = useSelector((state) => state.auth); // Mengambil nilai isError dari state auth menggunakan useSelector

  useEffect(() => {
    dispatch(getMe()); // Memanggil aksi getMe saat komponen pertama kali dirender
  }, [dispatch]); // Efek ini akan dijalankan kembali jika dispatch berubah

  useEffect(() => {
    if (isError) {
      navigate("/"); // Navigasi ke halaman beranda jika terjadi kesalahan
    }
  }, [isError, navigate]); // Efek ini akan dijalankan kembali jika isError atau navigate berubah

  return (
    <Layout>
      <FormAddProduct /> {/* Menampilkan komponen FormAddProduct di dalam Layout */}
    </Layout>
  );
};

export default AddProduct; // Mengekspor komponen AddProduct sebagai default
