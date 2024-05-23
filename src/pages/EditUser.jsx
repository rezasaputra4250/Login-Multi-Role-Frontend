import React, { useEffect } from "react"; // Mengimpor React dan hook useEffect
import Layout from "./Layout"; // Mengimpor komponen Layout
import FormEditUser from "../components/FormEditUser"; // Mengimpor komponen FormEditUser
import { useDispatch, useSelector } from "react-redux"; // Mengimpor hook useDispatch dan useSelector from react-redux
import { useNavigate } from "react-router-dom"; // Mengimpor hook useNavigate from react-router-dom
import { getMe } from "../features/authSlice"; // Mengimpor aksi getMe from authSlice

const EditUser = () => {
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch from hook useDispatch
  const navigate = useNavigate(); // Mendapatkan fungsi navigate from hook useNavigate
  const { isError, user } = useSelector((state) => state.auth); // Mengambil nilai isError dan user from state auth menggunakan useSelector

  useEffect(() => {
    dispatch(getMe()); // Memanggil aksi getMe saat komponen pertama kali dirender
  }, [dispatch]); // Efek ini akan dijalankan kembali jika dispatch berubah

  useEffect(() => {
    if (isError) {
      navigate("/"); // Navigasi ke halaman beranda jika terjadi kesalahan
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard"); // Navigasi ke halaman dashboard jika pengguna bukan admin
    }
  }, [isError, user, navigate]); // Efek ini akan dijalankan kembali jika isError, user, atau navigate berubah

  return (
    <Layout>
      <FormEditUser /> {/* Menampilkan komponen FormEditUser di dalam Layout */}
    </Layout>
  );
};

export default EditUser; // Mengekspor komponen EditUser sebagai default
