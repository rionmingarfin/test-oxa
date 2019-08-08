-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 08 Agu 2019 pada 05.20
-- Versi server: 10.3.16-MariaDB
-- Versi PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `badge`
--

CREATE TABLE `badge` (
  `id` int(11) NOT NULL,
  `no_badge` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `badge`
--

INSERT INTO `badge` (`id`, `no_badge`, `name`, `level`) VALUES
(1, 1, 'RT', 1),
(2, 2, 'RW', 3),
(3, 3, 'LURAH', 5),
(4, 4, 'CAMAT', 7),
(5, 5, 'BUPATI', 9),
(6, 6, 'GUBERNUR', 11),
(7, 7, 'PRESIDEN', 15);

-- --------------------------------------------------------

--
-- Struktur dari tabel `levels`
--

CREATE TABLE `levels` (
  `id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `check_in` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `levels`
--

INSERT INTO `levels` (`id`, `level`, `check_in`) VALUES
(1, 1, '10'),
(2, 2, '20'),
(17, 3, '30'),
(18, 4, '40'),
(19, 5, '50'),
(20, 6, '60'),
(21, 7, '70'),
(25, 8, '80'),
(26, 9, '90'),
(27, 10, '100'),
(28, 11, '110'),
(29, 12, '120'),
(30, 13, '130'),
(31, 14, '140'),
(32, 15, '150');

-- --------------------------------------------------------

--
-- Struktur dari tabel `level_user`
--

CREATE TABLE `level_user` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `total_level` varchar(50) NOT NULL,
  `no_badge` int(50) NOT NULL,
  `total_check_in` varchar(100) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `level_user`
--

INSERT INTO `level_user` (`id`, `id_user`, `total_level`, `no_badge`, `total_check_in`, `date`) VALUES
(6, 13, '4', 3, '33', '2019-07-07'),
(7, 15, '2', 2, '11', '2019-07-07'),
(8, 16, '1', 1, '1', '2019-07-07'),
(9, 17, '1', 1, '2', '2019-07-08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES
(13, 'dimas', 'dimas@gmail.com', '0087d99132'),
(15, 'ayi', 'ayi@gmail.com', '0597dd'),
(16, 'andre', 'andre@gmail.com', '0580d08224'),
(17, 'dany', 'dany@gmail.com', '008fda89');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `badge`
--
ALTER TABLE `badge`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `level_user`
--
ALTER TABLE `level_user`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `badge`
--
ALTER TABLE `badge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT untuk tabel `level_user`
--
ALTER TABLE `level_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
