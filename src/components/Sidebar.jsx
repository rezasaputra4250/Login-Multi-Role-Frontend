import React from "react"; // Mengimpor React
import { NavLink, useNavigate } from "react-router-dom"; // Mengimpor NavLink dan useNavigate dari 'react-router-dom'
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5"; // Mengimpor ikon dari react-icons
import { useDispatch, useSelector } from "react-redux"; // Mengimpor useDispatch dan useSelector dari 'react-redux'
import { LogOut, reset } from "../features/authSlice"; // Mengimpor aksi LogOut dan reset dari authSlice

const Sidebar = () => {
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari redux
  const navigate = useNavigate(); // Mendapatkan fungsi navigate dari react-router-dom
  const { user } = useSelector((state) => state.auth); // Mendapatkan informasi pengguna dari state

  // Fungsi untuk logout pengguna
  const logout = () => {
    dispatch(LogOut()); // Memanggil aksi LogOut untuk logout pengguna
    dispatch(reset()); // Memanggil aksi reset untuk mengembalikan state ke nilai awal
    navigate("/"); // Mengarahkan pengguna ke halaman login setelah logout
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow"> {/* Sidebar */}
        <p className="menu-label">General</p> {/* Label menu */}
        <ul className="menu-list"> {/* Daftar menu */}
          <li>
            <NavLink to={"/dashboard"}> {/* Link menuju halaman Dashboard */}
              <IoHome /> Dashboard {/* Ikon dan teks menu */}
            </NavLink>
          </li>
          <li>
            <NavLink to={"/products"}> {/* Link menuju halaman Products */}
              <IoPricetag /> Products {/* Ikon dan teks menu */}
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && ( {/* Menampilkan menu admin hanya jika pengguna memiliki peran admin */}
          <div>
            <p className="menu-label">Admin</p> {/* Label menu */}
            <ul className="menu-list"> {/* Daftar menu */}
              <li>
                <NavLink to={"/users"}> {/* Link menuju halaman Users */}
                  <IoPerson /> Users {/* Ikon dan teks menu */}
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Settings</p> {/* Label menu */}
        <ul className="menu-list"> {/* Daftar menu */}
          <li>
            <button onClick={logout} className="button is-white"> {/* Tombol logout */}
              <IoLogOut /> Logout {/* Ikon dan teks tombol */}
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar; // Ekspor komponen Sidebar agar dapat digunakan di tempat lain dalam aplikasi
