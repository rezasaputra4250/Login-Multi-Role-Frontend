import React from 'react'; // Mengimpor React
import { createRoot } from 'react-dom/client'; // Mengimpor createRoot dari react-dom/client
import { Provider } from 'react-redux'; // Mengimpor Provider dari react-redux untuk menghubungkan Redux store ke komponen React
import { store } from './app/store'; // Mengimpor store Redux dari file store
import App from './App'; // Mengimpor komponen utama App
import "bulma/css/bulma.css"; // Mengimpor CSS dari framework Bulma untuk styling

import axios from "axios"; // Mengimpor axios untuk melakukan HTTP requests

axios.defaults.withCredentials = true; // Mengatur default axios untuk mengirimkan cookie dalam permintaan lintas asal

const container = document.getElementById('root'); // Mendapatkan elemen root dari DOM dengan ID 'root'
const root = createRoot(container); // Membuat root React menggunakan createRoot

// Merender komponen utama App yang dibungkus dalam Provider untuk menyediakan store Redux ke semua komponen di dalamnya
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
