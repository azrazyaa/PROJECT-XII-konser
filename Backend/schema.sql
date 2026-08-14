CREATE DATABASE IF NOT EXISTS konser_ticket_db;
USE konser_ticket_db;

-- 1. Tabel Users (Menampung Admin & Pelanggan)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Tabel Artists (Penyanyi / Artis Konser)
CREATE TABLE artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    photo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tambahkan IF NOT EXISTS agar tidak error jika dijalankan ulang
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artist_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    venue VARCHAR(150) NOT NULL,
    event_date DATETIME NOT NULL,
    banner_url VARCHAR(255),
    is_closed TINYINT DEFAULT 0, -- Tanpa (1) agar tidak warning
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);

-- 4. Tabel Ticket Categories (Kelas Tiket, Harga & Kuota)
CREATE TABLE ticket_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    name VARCHAR(50) NOT NULL, -- Contoh: VIP, Cat 1, Festival
    price DECIMAL(12, 2) NOT NULL,
    quota INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- 5. Tabel Orders (Header Transaksi & Status)
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_code VARCHAR(50) UNIQUE NOT NULL, -- Contoh: ORD-20260803-001
    total_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('pending', 'paid', 'cancelled', 'expired') DEFAULT 'pending',
    expired_at DATETIME NOT NULL, -- Masa berlaku pembayaran (Automatic Expiration)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Tabel Order Details (Rincian Item Tiket)
CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    ticket_category_id INT NOT NULL,
    qty INT NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_category_id) REFERENCES ticket_categories(id) ON DELETE CASCADE
);

-- 7. Tabel Payment Verifications (Bukti Bayar & Verifikasi Admin)
CREATE TABLE payment_verifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNIQUE NOT NULL,
    payment_proof_url VARCHAR(255) NOT NULL,
    verified_by INT NULL, -- ID Admin yang menolak/menyetujui
    verified_at DATETIME NULL,
    notes VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 8. Tabel Tickets (E-Ticket Unik untuk QR Code Mobile)
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_detail_id INT NOT NULL,
    ticket_code VARCHAR(100) UNIQUE NOT NULL, -- String/UUID acak
    is_used TINYINT(1) DEFAULT 0, -- 0: Belum di-scan, 1: Sudah masuk venue
    scanned_at DATETIME NULL,
    FOREIGN KEY (order_detail_id) REFERENCES order_details(id) ON DELETE CASCADE
);

