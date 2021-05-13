-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2021 at 07:24 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_development`
--

-- --------------------------------------------------------

--
-- Table structure for table `completeds`
--

CREATE TABLE `completeds` (
  `id` int(11) NOT NULL,
  `driver` int(11) DEFAULT NULL,
  `passenger` int(11) DEFAULT NULL,
  `origin` geometry DEFAULT NULL,
  `destination` geometry DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ongoings`
--

CREATE TABLE `ongoings` (
  `id` int(11) NOT NULL,
  `driver` int(11) DEFAULT NULL,
  `passenger` int(11) DEFAULT NULL,
  `origin` geometry DEFAULT NULL,
  `destination` geometry DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210508144508-create-user.js'),
('20210510131341-create-ongoing.js'),
('20210510131702-create-completed.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `location` geometry DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `phone`, `type`, `location`, `createdAt`, `updatedAt`) VALUES
(1, 'sherlock@email.com', '$2b$10$cAoCzTuQGbi.gC1m.9KTEOGZb3zpObyeJTqwIEegnV6NwMFUJB63G', 'Sherlock Holmes', 0, 'client', 0x00000000010100000048e17a14ae475e4014ae47e17ad443c0, '2021-05-13 05:19:34', '2021-05-13 05:19:34'),
(2, 'john@email.com', '$2b$10$cs1q/42GabZVieAVpRwZN.T1poCcfiKl4pmvxHJK8vLOA/mUHrgYe', 'Mary Watson', 0, 'client', 0x000000000101000000e17a14ae47916340f6285c8fc2d540c0, '2021-05-13 05:20:26', '2021-05-13 05:20:26'),
(3, 'driver1@email.com', '$2b$10$SNd1qErU0U498GD5umt8E.jdw6nPKAd08y7Itvk.IgwY7/wDyJg12', 'Driver One', 0, 'driver', 0x000000000101000000ec51b81e855b6640ae47e17a148e41c0, '2021-05-13 05:21:29', '2021-05-13 05:21:29'),
(4, 'driver2@email.com', '$2b$10$i5EMAdvjTA5KoEyl8Ahez.oxub/nwRxA.QnplH.tmpD9x0mSRx3r2', 'Driver Two', 0, 'driver', 0x00000000010100000052b81e85eb7160400ad7a3703d0a46c0, '2021-05-13 05:21:59', '2021-05-13 05:21:59'),
(5, 'driver3@email.com', '$2b$10$kGRPa41QY5bU9rv21srcB.G2UZzE0GNUGqxYh3q8quVy4bTdzVUl2', 'Driver Three', 0, 'driver', 0x0000000001010000003d0ad7a370e56240f6285c8fc2d541c0, '2021-05-13 05:22:44', '2021-05-13 05:22:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `completeds`
--
ALTER TABLE `completeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ongoings`
--
ALTER TABLE `ongoings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `completeds`
--
ALTER TABLE `completeds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ongoings`
--
ALTER TABLE `ongoings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
