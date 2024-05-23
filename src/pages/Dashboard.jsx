import React, { useEffect } from "react"; // Mengimpor React dan hook useEffect
import Layout from "./Layout"; // Mengimpor komponen Layout
import Welcome from "../components/Welcome"; // Mengimpor komponen Welcome
import { useDispatch, useSelector } from "react-redux"; // Mengimpor hook useDispatch dan useSelector from react-redux
import { useNavigate } from "react-router-dom"; // Mengimpor hook useNavigate from react-router-dom
import { getMe } from "../features/authSlice"; // Mengimpor aksi getMe from authSlice

const Dashboard = () => {
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch from hook useDispatch
  const navigate = useNavigate(); // Mendapatkan fungsi navigate from hook useNavigate
  const { isError } = useSelector((state) => state.auth); // Mengambil nilai isError from state auth menggunakan useSelector

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
      <Welcome /> {/* Menampilkan komponen Welcome di dalam Layout */}
    </Layout>
  );
};

export default Dashboard; // Mengekspor komponen Dashboard sebagai default
