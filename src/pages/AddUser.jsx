import React, { useEffect } from "react"; // Mengimpor React dan hook useEffect
import Layout from "./Layout"; // Mengimpor komponen Layout
import FormAddUser from "../components/FormAddUser"; // Mengimpor komponen FormAddUser
import { useDispatch, useSelector } from "react-redux"; // Mengimpor hook useDispatch dan useSelector dari react-redux
import { useNavigate } from "react-router-dom"; // Mengimpor hook useNavigate dari react-router-dom
import { getMe } from "../features/authSlice"; // Mengimpor aksi getMe dari authSlice

const AddUser = () => {
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari hook useDispatch
  const navigate = useNavigate(); // Mendapatkan fungsi navigate dari hook useNavigate
  const { isError, user } = useSelector((state) => state.auth); // Mengambil nilai isError dan user dari state auth menggunakan useSelector

  useEffect(() => {
    dispatch(getMe()); // Memanggil aksi getMe saat komponen pertama kali dirender
  }, [dispatch]); // Efek ini akan dijalankan kembali jika dispatch berubah

  useEffect(() => {
    if (isError) {
      navigate("/"); // Navigasi ke halaman beranda jika terjadi kesalahan
    }
    if (user && user.roleId !== 1) {
      navigate("/dashboard"); // Navigasi ke dashboard jika user tidak memiliki peran admin
    }
  }, [isError, user, navigate]); // Efek ini akan dijalankan kembali jika isError, user, atau navigate berubah
  
  return (
    <Layout>
      <FormAddUser /> {/* Menampilkan komponen FormAddUser di dalam Layout */}
    </Layout>
  );
};

export default AddUser; // Mengekspor komponen AddUser sebagai default
