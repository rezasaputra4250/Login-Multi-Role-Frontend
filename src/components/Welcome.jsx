import React from "react"; // Mengimpor React
import { useSelector } from "react-redux"; // Mengimpor useSelector dari react-redux untuk mengakses state Redux

const Welcome = () => {
  const { user } = useSelector((state) => state.auth); // Mengambil data pengguna dari state Redux menggunakan useSelector

  return (
    <div>
      <h1 className="title">Dashboard</h1> {/* Menampilkan judul dashboard */}
      <h2 className="subtitle">
        Welcome Back <strong>{user && user.name}</strong> {/* Menampilkan pesan selamat datang dengan nama pengguna */}
      </h2>
    </div>
  );
};

export default Welcome; // Ekspor komponen Welcome agar dapat digunakan di tempat lain dalam aplikasi
