-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 16, 2024 at 11:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fasanicebox-stud`
--

-- --------------------------------------------------------

--
-- Table structure for table `TLS_COK_DLA_campuses`
--

CREATE TABLE `TLS_COK_DLA_campuses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TLS_COK_DLA_criteria`
--

CREATE TABLE `TLS_COK_DLA_criteria` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `weight` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TLS_COK_DLA_users`
--

CREATE TABLE `TLS_COK_DLA_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','TEACHER','STUDENT') NOT NULL DEFAULT 'STUDENT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `TLS_COK_DLA_users`
--

INSERT INTO `TLS_COK_DLA_users` (`id`, `email`, `password`, `role`) VALUES
(1, 'admin@icam.fr', '$2b$12$ztUzJ18JKXOYb3qf.FUlrufl/vpwgZAgtJMwwQzdXJA4hQcOu5hRy', 'STUDENT'),
(2, 'kamel.hamidat@icam.fr', '$2b$12$drwbwVGrZHV4eezd434x9eF0YVmo53o5b3tZtmGekO0J4PfJ7l0fy', 'STUDENT');

-- --------------------------------------------------------

--
-- Table structure for table `TLS_COK_DLA_votes`
--

CREATE TABLE `TLS_COK_DLA_votes` (
  `user_id` int(11) NOT NULL,
  `campus_id` int(11) NOT NULL,
  `criterion_id` int(11) NOT NULL,
  `mark` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `TLS_COK_DLA_campuses`
--
ALTER TABLE `TLS_COK_DLA_campuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `TLS_COK_DLA_criteria`
--
ALTER TABLE `TLS_COK_DLA_criteria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `TLS_COK_DLA_users`
--
ALTER TABLE `TLS_COK_DLA_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `TLS_COK_DLA_votes`
--
ALTER TABLE `TLS_COK_DLA_votes`
  ADD PRIMARY KEY (`user_id`,`campus_id`,`criterion_id`),
  ADD KEY `criterion_id` (`criterion_id`),
  ADD KEY `campus_id` (`campus_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `TLS_COK_DLA_campuses`
--
ALTER TABLE `TLS_COK_DLA_campuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TLS_COK_DLA_criteria`
--
ALTER TABLE `TLS_COK_DLA_criteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TLS_COK_DLA_users`
--
ALTER TABLE `TLS_COK_DLA_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `TLS_COK_DLA_votes`
--
ALTER TABLE `TLS_COK_DLA_votes`
  ADD CONSTRAINT `tls_cok_dla_votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `TLS_COK_DLA_users` (`id`),
  ADD CONSTRAINT `tls_cok_dla_votes_ibfk_2` FOREIGN KEY (`campus_id`) REFERENCES `tls_cok_dla_campuses` (`id`),
  ADD CONSTRAINT `tls_cok_dla_votes_ibfk_3` FOREIGN KEY (`criterion_id`) REFERENCES `TLS_COK_DLA_criteria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
