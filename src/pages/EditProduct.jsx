import React, { useEffect } from "react"; // Mengimpor React dan hook useEffect
import Layout dari "./Layout"; // Mengimpor komponen Layout
import FormEditProduct dari "../components/FormEditProduct"; // Mengimpor komponen FormEditProduct
import { useDispatch, useSelector } dari "react-redux"; // Mengimpor hook useDispatch dan useSelector dari react-redux
import { useNavigate } dari "react-router-dom"; // Mengimpor hook useNavigate dari react-router-dom
import { getMe } dari "../features/authSlice"; // Mengimpor aksi getMe dari authSlice

const EditProduct = () => {
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
      <FormEditProduct /> {/* Menampilkan komponen FormEditProduct di dalam Layout */}
    </Layout>
  );
};

export default EditProduct; // Mengekspor komponen EditProduct sebagai default
