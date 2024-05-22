import React from "react"; // Mengimpor React
import Navbar from "../components/Navbar"; // Mengimpor komponen Navbar
import Sidebar from "../components/Sidebar"; // Mengimpor komponen Sidebar

// Komponen Layout menerima children sebagai props
const Layout = ({ children }) => {
  return (
    <React.Fragment> {/* Membungkus elemen dengan React.Fragment */}
      <Navbar /> {/* Menampilkan komponen Navbar */}
      <div className="columns mt-6" style={{ minHeight: "100vh" }}> {/* Membuat div dengan kelas columns dan margin-top 6, serta tinggi minimum 100vh */}
        <div className="column is-2"> {/* Membuat kolom dengan lebar 2 kolom */}
          <Sidebar /> {/* Menampilkan komponen Sidebar */}
        </div>
        <div className="column has-background-light"> {/* Membuat kolom dengan latar belakang berwarna terang */}
          <main>{children}</main> {/* Menampilkan children yang diterima sebagai props di dalam elemen main */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout; // Mengekspor komponen Layout sebagai default
