-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2023 at 11:26 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `piping`
--

-- --------------------------------------------------------

--
-- Table structure for table `cml`
--

CREATE TABLE `cml` (
  `id_cml` int(11) NOT NULL,
  `line_number` varchar(50) NOT NULL,
  `cml_number` int(11) NOT NULL,
  `cml_description` varchar(50) NOT NULL,
  `actual_outside_diameter` float DEFAULT NULL,
  `design_thickness` float DEFAULT NULL,
  `structural_thickness` float DEFAULT NULL,
  `required_thickness` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cml`
--

INSERT INTO `cml` (`id_cml`, `line_number`, `cml_number`, `cml_description`, `actual_outside_diameter`, `design_thickness`, `structural_thickness`, `required_thickness`) VALUES
(1, '6-PL-J4N-01007', 1, 'Pipe', 168.3, 4.18564, 2.8, 4.18564),
(2, '6-PL-J4N-01007', 2, 'Elbow i', 168.3, 4.18564, 2.8, 4.18564),
(3, '6-PL-J4N-01007', 3, 'Elbow ii', 168.3, 4.18564, 2.8, 4.18564),
(4, '6-PL-J4N-01007', 4, 'Pipe', 168.3, 4.18564, 2.8, 4.18564),
(5, '6-PL-J4N-01007', 5, 'Pipe', 168.3, 4.18564, 2.8, 4.18564),
(6, '6-PL-J4N-01110', 1, 'Pipe', 168.3, 4.18564, 2.8, 4.18564),
(7, '6-PL-J4N-01110', 2, 'Tee i', 168.3, 4.18564, 2.8, 4.18564),
(8, '6-PL-J4N-01110', 3, 'Tee iii', 168.3, 4.18564, 2.8, 4.18564),
(9, '6-PL-J4N-01110', 4, 'Pipe', 168.3, 4.18564, 2.8, 4.18564);

-- --------------------------------------------------------

--
-- Table structure for table `info`
--

CREATE TABLE `info` (
  `id` int(11) NOT NULL,
  `line_number` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `pipe_from` varchar(50) NOT NULL,
  `pipe_to` varchar(50) NOT NULL,
  `drawing_number` varchar(50) NOT NULL,
  `service` varchar(50) NOT NULL,
  `material` varchar(50) NOT NULL,
  `inservice_date` date NOT NULL,
  `pipe_size` int(11) NOT NULL,
  `original_thickness` float NOT NULL,
  `stress` int(11) NOT NULL,
  `joint_efficiency` int(11) NOT NULL,
  `ca` int(11) NOT NULL,
  `design_life` int(11) NOT NULL,
  `design_pressure` int(11) NOT NULL,
  `operation_pressure` int(11) NOT NULL,
  `design_temperature` int(11) NOT NULL,
  `operating_temperature` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `info`
--

INSERT INTO `info` (`id`, `line_number`, `location`, `pipe_from`, `pipe_to`, `drawing_number`, `service`, `material`, `inservice_date`, `pipe_size`, `original_thickness`, `stress`, `joint_efficiency`, `ca`, `design_life`, `design_pressure`, `operation_pressure`, `design_temperature`, `operating_temperature`) VALUES
(1, '6-PL-J4N-01007', 'Dacon A', 'BLACK STARTCOOLED WELL FLUID FROM MDPP', 'TEST SEPARATOR,V-0111', 'MDA-D-B-26001-1-0-Rev00-2011', 'PL', 'Duplex Stainless Steelaaa', '0000-00-00', 6, 7, 20000, 1, 4, 25, 1015, 327, 140, 45),
(2, '6-PL-J4N-01110', 'Dacon B', 'BLACK STARTCOOLED WELL FLUID FROM MDPP ', 'TEST SEPARATOR,V-0111', 'MDA-D-B-26001-1-0-Rev00-2011', 'PL', 'Duplex Stainless Steel', '0000-00-00', 6, 7, 20000, 1, 3, 25, 1015, 327, 140, 59),
(3, '3-GC-J4N-10017', 'Dacon C', 'BLACK STARTCOOLED WELL FLUID FROM MDPP', 'TEST SEPARATOR,V-0111', 'B17-3-AMA-PR-005-0003', 'GC', 'Duplex Stainless Steel', '0000-00-00', 3, 5.48, 20000, 1, 3, 25, 1015, 623, 120, 73.27),
(4, '3-GC-J4N-10018', 'Dacon A', 'BLACK STARTCOOLED WELL FLUID FROM MDPP', 'TEST SEPARATOR,V-0111', 'B17-3-AMA-PR-005-0003', 'GC', 'Duplex Stainless Steel', '2020-01-01', 3, 5.48, 20000, 1, 3, 25, 1015, 623, 120, 73.27),
(5, '2-GC-J4N-10034', 'Dacon B', 'BLACK STARTCOOLED WELL FLUID FROM MDPP', 'TEST SEPARATOR,V-0111', 'B17-3-AMA-PR-005-0003', 'GC', 'Duplex Stainless Steel', '2020-01-01', 2, 3.91, 20000, 1, 3, 25, 1015, 623, 120, 73.27);

-- --------------------------------------------------------

--
-- Table structure for table `test_point`
--

CREATE TABLE `test_point` (
  `id_test` int(11) NOT NULL,
  `line_number` varchar(50) NOT NULL,
  `cml_number` int(11) DEFAULT NULL,
  `tp_number` int(11) NOT NULL,
  `tp_description` int(11) NOT NULL,
  `note` varchar(50) DEFAULT NULL,
  `id_cml` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test_point`
--

INSERT INTO `test_point` (`id_test`, `line_number`, `cml_number`, `tp_number`, `tp_description`, `note`, `id_cml`) VALUES
(1, '6-PL-J4N-01007', 1, 1, 0, NULL, 1),
(2, '6-PL-J4N-01007', 1, 2, 90, NULL, 1),
(3, '6-PL-J4N-01007', 1, 3, 180, NULL, 1),
(4, '6-PL-J4N-01007', 1, 4, 270, NULL, 1),
(5, '6-PL-J4N-01007', 2, 1, 0, NULL, 2),
(6, '6-PL-J4N-01007', 2, 2, 90, NULL, 2),
(7, '6-PL-J4N-01007', 2, 3, 180, NULL, 2),
(8, '6-PL-J4N-01007', 2, 4, 270, NULL, 2),
(9, '6-PL-J4N-01007', 3, 1, 0, NULL, 3),
(10, '6-PL-J4N-01007', 3, 2, 90, NULL, 3),
(11, '6-PL-J4N-01007', 3, 3, 180, NULL, 3),
(12, '6-PL-J4N-01007', 3, 4, 270, NULL, 3),
(13, '6-PL-J4N-01007', 4, 1, 0, NULL, 4),
(14, '6-PL-J4N-01007', 4, 2, 90, NULL, 4),
(15, '6-PL-J4N-01007', 4, 3, 180, NULL, 4),
(16, '6-PL-J4N-01007', 4, 4, 270, NULL, 4),
(17, '6-PL-J4N-01007', 5, 1, 0, NULL, 5),
(18, '6-PL-J4N-01007', 5, 2, 90, NULL, 5),
(19, '6-PL-J4N-01007', 5, 3, 180, NULL, 5),
(20, '6-PL-J4N-01007', 5, 4, 270, NULL, 5),
(21, '6-PL-J4N-01110', 1, 1, 0, NULL, 6),
(22, '6-PL-J4N-01110', 1, 2, 90, NULL, 6),
(23, '6-PL-J4N-01110', 1, 3, 180, NULL, 6),
(24, '6-PL-J4N-01110', 1, 4, 270, NULL, 6),
(25, '6-PL-J4N-01110', 2, 1, 0, NULL, 7),
(26, '6-PL-J4N-01110', 2, 2, 90, NULL, 7),
(27, '6-PL-J4N-01110', 2, 3, 180, NULL, 7),
(28, '6-PL-J4N-01110', 2, 4, 270, NULL, 7),
(29, '6-PL-J4N-01110', 3, 1, 0, NULL, 8),
(30, '6-PL-J4N-01110', 3, 2, 90, NULL, 8),
(31, '6-PL-J4N-01110', 3, 3, 180, NULL, 8),
(32, '6-PL-J4N-01110', 3, 4, 2703, NULL, 8),
(33, '6-PL-J4N-01110', 4, 1, 0, NULL, 9),
(34, '6-PL-J4N-01110', 4, 2, 90, NULL, 9),
(35, '6-PL-J4N-01110', 4, 3, 180, NULL, 9),
(36, '6-PL-J4N-01110', 4, 4, 270, '', 9);

-- --------------------------------------------------------

--
-- Table structure for table `thickness`
--

CREATE TABLE `thickness` (
  `id` int(11) NOT NULL,
  `line_number` varchar(50) NOT NULL,
  `cml_number` int(11) NOT NULL,
  `tp_number` int(11) NOT NULL,
  `inspection_date` date NOT NULL,
  `actual_thickness` float NOT NULL,
  `id_test` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `thickness`
--

INSERT INTO `thickness` (`id`, `line_number`, `cml_number`, `tp_number`, `inspection_date`, `actual_thickness`, `id_test`) VALUES
(1, '6-PL-J4N-01007', 1, 1, '2021-01-01', 6.5, 1),
(2, '6-PL-J4N-01007', 1, 1, '2022-01-01', 6.78, 1),
(3, '6-PL-J4N-01007', 1, 2, '2021-01-01', 6.99, 2),
(4, '6-PL-J4N-01007', 1, 2, '2022-01-01', 6.87, 2),
(5, '6-PL-J4N-01007', 1, 3, '2021-01-01', 6.63, 3),
(6, '6-PL-J4N-01007', 1, 3, '2022-01-01', 6.54, 3),
(7, '6-PL-J4N-01007', 1, 4, '2021-01-01', 6.77, 4),
(8, '6-PL-J4N-01007', 1, 4, '2022-01-01', 6.43, 4),
(9, '6-PL-J4N-01007', 2, 1, '2021-01-01', 6.5, 5),
(10, '6-PL-J4N-01007', 2, 1, '2022-01-01', 6.78, 5),
(11, '6-PL-J4N-01007', 2, 2, '2021-01-01', 6.99, 6),
(12, '6-PL-J4N-01007', 2, 2, '2022-01-01', 6.87, 6),
(13, '6-PL-J4N-01007', 2, 3, '2021-01-01', 6.63, 7),
(14, '6-PL-J4N-01007', 2, 3, '2022-01-01', 6.54, 7),
(15, '6-PL-J4N-01007', 2, 4, '2021-01-01', 6.77, 8),
(16, '6-PL-J4N-01007', 2, 4, '2022-01-01', 6.43, 8),
(17, '6-PL-J4N-01007', 3, 1, '2021-01-01', 6.5, 9),
(18, '6-PL-J4N-01007', 3, 1, '2022-01-01', 6.78, 9),
(19, '6-PL-J4N-01007', 3, 2, '2021-01-01', 6.99, 10),
(20, '6-PL-J4N-01007', 3, 2, '2022-01-01', 6.87, 10),
(21, '6-PL-J4N-01007', 3, 3, '2021-01-01', 6.63, 11),
(22, '6-PL-J4N-01007', 3, 3, '2022-01-01', 6.54, 11),
(23, '6-PL-J4N-01007', 3, 4, '2021-01-01', 6.77, 12),
(24, '6-PL-J4N-01007', 3, 4, '2022-01-01', 6.43, 12),
(25, '6-PL-J4N-01007', 4, 1, '2021-01-01', 6.5, 13),
(26, '6-PL-J4N-01007', 4, 1, '2022-01-01', 6.78, 13),
(27, '6-PL-J4N-01007', 4, 2, '2021-01-01', 6.99, 14),
(28, '6-PL-J4N-01007', 4, 2, '2022-01-01', 6.87, 14),
(29, '6-PL-J4N-01007', 4, 3, '2021-01-01', 6.63, 15),
(30, '6-PL-J4N-01007', 4, 3, '2022-01-01', 6.54, 15),
(31, '6-PL-J4N-01007', 4, 4, '2021-01-01', 6.77, 16),
(32, '6-PL-J4N-01007', 4, 4, '2022-01-01', 6.43, 16),
(33, '6-PL-J4N-01007', 5, 1, '2021-01-01', 6.5, 17),
(34, '6-PL-J4N-01007', 5, 1, '2022-01-01', 6.78, 17),
(35, '6-PL-J4N-01007', 5, 2, '2021-01-01', 6.99, 18),
(36, '6-PL-J4N-01007', 5, 2, '2022-01-01', 6.87, 18),
(37, '6-PL-J4N-01007', 5, 3, '2021-01-01', 6.63, 19),
(38, '6-PL-J4N-01007', 5, 3, '2022-01-01', 6.54, 19),
(39, '6-PL-J4N-01007', 5, 4, '2021-01-01', 6.77, 20),
(40, '6-PL-J4N-01007', 5, 4, '2022-01-01', 6.43, 20),
(41, '6-PL-J4N-01110', 1, 1, '2021-01-01', 6.5, 21),
(42, '6-PL-J4N-01110', 1, 1, '2022-01-01', 6.78, 21),
(43, '6-PL-J4N-01110', 1, 2, '2021-01-01', 6.99, 22),
(44, '6-PL-J4N-01110', 1, 2, '2022-01-01', 6.87, 22),
(45, '6-PL-J4N-01110', 1, 3, '2021-01-01', 6.63, 23),
(46, '6-PL-J4N-01110', 1, 3, '2022-01-01', 6.54, 23),
(47, '6-PL-J4N-01110', 1, 4, '2021-01-01', 6.77, 24),
(48, '6-PL-J4N-01110', 1, 4, '2022-01-01', 6.43, 24),
(49, '6-PL-J4N-01110', 2, 1, '2021-01-01', 6.5, 25),
(50, '6-PL-J4N-01110', 2, 1, '2022-01-01', 6.78, 25),
(51, '6-PL-J4N-01110', 2, 2, '2021-01-01', 6.99, 26),
(52, '6-PL-J4N-01110', 2, 2, '2022-01-01', 6.87, 26),
(53, '6-PL-J4N-01110', 2, 3, '2021-01-01', 6.63, 27),
(54, '6-PL-J4N-01110', 2, 3, '2022-01-01', 6.54, 27),
(55, '6-PL-J4N-01110', 2, 4, '2021-01-01', 6.77, 28),
(56, '6-PL-J4N-01110', 2, 4, '2022-01-01', 6.43, 28),
(57, '6-PL-J4N-01110', 3, 1, '2021-01-01', 6.5, 29),
(58, '6-PL-J4N-01110', 3, 1, '2022-01-01', 6.78, 29),
(59, '6-PL-J4N-01110', 3, 2, '2021-01-01', 6.99, 30),
(60, '6-PL-J4N-01110', 3, 2, '2022-01-01', 6.87, 30),
(61, '6-PL-J4N-01110', 3, 3, '2021-01-01', 6.63, 31),
(62, '6-PL-J4N-01110', 3, 3, '2022-01-01', 6.54, 31),
(63, '6-PL-J4N-01110', 3, 4, '2021-01-01', 6.77, 32),
(64, '6-PL-J4N-01110', 3, 4, '2022-01-01', 6.43, 32),
(65, '6-PL-J4N-01110', 4, 1, '2021-01-01', 6.5, 33),
(66, '6-PL-J4N-01110', 4, 1, '2022-01-01', 6.78, 33),
(67, '6-PL-J4N-01110', 4, 2, '2021-01-01', 6.99, 34),
(68, '6-PL-J4N-01110', 4, 2, '2022-01-01', 6.87, 34),
(69, '6-PL-J4N-01110', 4, 3, '2021-01-01', 6.63, 35),
(70, '6-PL-J4N-01110', 4, 3, '2022-01-01', 6.54, 35),
(71, '6-PL-J4N-01110', 4, 4, '2021-01-01', 6.77, 36),
(72, '6-PL-J4N-01110', 4, 4, '2022-01-01', 6.43, 36);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cml`
--
ALTER TABLE `cml`
  ADD PRIMARY KEY (`id_cml`),
  ADD KEY `line_number` (`line_number`),
  ADD KEY `cml_number` (`cml_number`),
  ADD KEY `id` (`id_cml`);

--
-- Indexes for table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `line_number` (`line_number`);

--
-- Indexes for table `test_point`
--
ALTER TABLE `test_point`
  ADD PRIMARY KEY (`id_test`),
  ADD KEY `line_number` (`line_number`),
  ADD KEY `cml_number` (`cml_number`),
  ADD KEY `tp_number` (`tp_number`),
  ADD KEY `id_cml` (`id_cml`),
  ADD KEY `id_test` (`id_test`);

--
-- Indexes for table `thickness`
--
ALTER TABLE `thickness`
  ADD PRIMARY KEY (`id`),
  ADD KEY `line_number` (`line_number`),
  ADD KEY `cml_number` (`cml_number`,`tp_number`),
  ADD KEY `tp_number` (`tp_number`),
  ADD KEY `id_test` (`id_test`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cml`
--
ALTER TABLE `cml`
  MODIFY `id_cml` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `info`
--
ALTER TABLE `info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `test_point`
--
ALTER TABLE `test_point`
  MODIFY `id_test` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `thickness`
--
ALTER TABLE `thickness`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cml`
--
ALTER TABLE `cml`
  ADD CONSTRAINT `cml_ibfk_1` FOREIGN KEY (`line_number`) REFERENCES `info` (`line_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `test_point`
--
ALTER TABLE `test_point`
  ADD CONSTRAINT `test_point_ibfk_1` FOREIGN KEY (`line_number`) REFERENCES `info` (`line_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `test_point_ibfk_2` FOREIGN KEY (`id_cml`) REFERENCES `cml` (`id_cml`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thickness`
--
ALTER TABLE `thickness`
  ADD CONSTRAINT `thickness_ibfk_4` FOREIGN KEY (`line_number`) REFERENCES `info` (`line_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `thickness_ibfk_5` FOREIGN KEY (`id_test`) REFERENCES `test_point` (`id_test`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
