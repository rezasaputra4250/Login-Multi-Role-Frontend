import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari 'react'
import axios from "axios"; // Mengimpor axios untuk melakukan HTTP requests
import { Link } from "react-router-dom"; // Mengimpor Link dari 'react-router-dom' untuk navigasi antar halaman

const Userlist = () => {
  const [users, setUsers] = useState([]); // Membuat state 'users' dan fungsi 'setUsers' untuk menyimpan data pengguna

  useEffect(() => {
    getUsers(); // Memanggil fungsi getUsers saat komponen Userlist pertama kali dirender
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users"); // Mengambil data pengguna dari API
    setUsers(response.data); // Menyimpan data pengguna ke dalam state 'users'
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`); // Menghapus pengguna berdasarkan ID
    getUsers(); // Memperbarui daftar pengguna setelah penghapusan
  };

  return (
    <div>
      <h1 className="title">Users</h1> {/* Menampilkan judul halaman */}
      <h2 className="subtitle">List of Users</h2> {/* Menampilkan subjudul */}
      <Link to="/users/add" className="button is-primary mb-2"> {/* Tombol untuk menambahkan pengguna baru */}
        Add New
      </Link>
      <table className="table is-striped is-fullwidth"> {/* Tabel untuk menampilkan daftar pengguna */}
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Menggunakan map untuk menampilkan setiap pengguna dalam tabel */}
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td> {/* Nomor urut */}
              <td>{user.name}</td> {/* Nama pengguna */}
              <td>{user.email}</td> {/* Email pengguna */}
              <td>{user.role}</td> {/* Peran pengguna */}
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info" // Tombol untuk mengedit pengguna
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-small is-danger" // Tombol untuk menghapus pengguna
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist; // Ekspor komponen Userlist agar dapat digunakan di tempat lain dalam aplikasi
