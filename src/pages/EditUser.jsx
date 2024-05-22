import React, { useEffect } from "react"; // Mengimpor React dan hook useEffect
import Layout dari "./Layout"; // Mengimpor komponen Layout
import FormEditUser dari "../components/FormEditUser"; // Mengimpor komponen FormEditUser
import { useDispatch, useSelector } dari "react-redux"; // Mengimpor hook useDispatch dan useSelector dari react-redux
import { useNavigate } dari "react-router-dom"; // Mengimpor hook useNavigate dari react-router-dom
import { getMe } dari "../features/authSlice"; // Mengimpor aksi getMe dari authSlice

const EditUser = () => {
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
