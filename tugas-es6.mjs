
// ==========================================
// TUGAS PRAKTIKUM MANDIRI ES6
// Pengolahan Data Transaksi Belanja
// ==========================================

// 1. Membuat array berisi 6 data transaksi
const transaksiBelanja = [
    { id: 1, barang: "Beras", harga: 15000, qty: 2, kategori: "Makanan" },
    { id: 2, barang: "Minyak Goreng", harga: 18000, qty: 1, kategori: "Makanan" },
    { id: 3, barang: "Sabun Mandi", harga: 5000, qty: 3, kategori: "Kebutuhan" },
    { id: 4, barang: "Gula", harga: 14000, qty: 2, kategori: "Makanan" },
    { id: 5, barang: "Sampo", harga: 12000, qty: 1, kategori: "Kebutuhan" },
    { id: 6, barang: "Susu", harga: 20000, qty: 2, kategori: "Minuman" },
    { id: 7, barang: "Deterjen", harga: 7000, qty: 5, kategori: "Kebutuhan" },
    { id: 8, barang: "Teh", harga: 10000, qty: 3, kategori: "Minuman" },
    { id: 9, barang: "Kopi", harga: 25000, qty: 1, kategori: "Minuman" },
    { id: 10, barang: "Roti", harga: 8000, qty: 4, kategori: "Makanan" }
];

// 2. Menentukan kategori yang ingin disaring
const kategoriDipilih = "Makanan";

// 3. Menggunakan filter() dan destructuring
const hasilFilter = transaksiBelanja.filter(
    ({ kategori }) => kategori === kategoriDipilih
);

// 4. Menggunakan map() untuk menghitung subtotal
const hasilSubtotal = transaksiBelanja.map(
    ({ id, barang, harga, qty, kategori }) => ({
        id,
        barang,
        harga,
        qty,
        kategori,
        subtotal: harga * qty
    })
);

// 5. Menggunakan reduce() untuk menghitung total keseluruhan
const totalBelanja = hasilSubtotal.reduce(
    (total, { subtotal }) => total + subtotal,
    0
);

// 6. Menghitung total berdasarkan kategori yang dipilih
const totalKategori = hasilFilter
    .map(({ harga, qty }) => harga * qty)
    .reduce((total, subtotal) => total + subtotal, 0);

// 7. Menampilkan hasil program
console.log("==================================");
console.log("       DATA TRANSAKSI BELANJA");
console.log("==================================");

console.log("\nA. DATA SELURUH TRANSAKSI");
console.table(transaksiBelanja);

console.log("\nB. HASIL FILTER KATEGORI:", kategoriDipilih);
console.table(hasilFilter);

console.log("\nC. HASIL PERHITUNGAN SUBTOTAL");
console.table(hasilSubtotal);

console.log("\nD. TOTAL BELANJA KESELURUHAN");
console.log("Rp" + totalBelanja.toLocaleString("id-ID"));

console.log("\nE. TOTAL BELANJA KATEGORI", kategoriDipilih);
console.log("Rp" + totalKategori.toLocaleString("id-ID"));

console.log("==================================");
