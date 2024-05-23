import React, { useEffect } from "react"; // Mengimpor React dan useEffect dari react
import Layout from "./Layout"; // Mengimpor komponen Layout
import Userlist from "../components/Userlist"; // Mengimpor komponen Userlist
import { useDispatch, useSelector } from "react-redux"; // Mengimpor hooks dari react-redux
import { useNavigate } from "react-router-dom"; // Mengimpor useNavigate dari react-router-dom
import { getMe } from "../features/authSlice"; // Mengimpor action getMe dari authSlice

// Komponen Users
const Users = () => {
  const dispatch = useDispatch(); // Mendapatkan dispatch dari useDispatch
  const navigate = useNavigate(); // Mendapatkan navigate dari useNavigate
  const { isError, user } = useSelector((state) => state.auth); // Mengambil nilai isError dan user dari state auth

  // Menggunakan useEffect untuk memanggil dispatch getMe ketika komponen pertama kali di-render
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // Menggunakan useEffect untuk melakukan navigasi berdasarkan kondisi error dan peran pengguna
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.roleId !== 1) {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout> {/* Menampilkan komponen Layout */}
      <Userlist /> {/* Menampilkan komponen Userlist */}
    </Layout>
  );
};

export default Users; // Mengekspor komponen Users sebagai default
