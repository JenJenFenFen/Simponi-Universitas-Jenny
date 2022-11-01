-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2022 at 10:56 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simponi_jenny_university`
--

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `student_identity_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  `class_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lecturer_identity`
--

CREATE TABLE `lecturer_identity` (
  `id` int(11) NOT NULL,
  `user_login_email` varchar(100) NOT NULL,
  `nid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `country` varchar(50) NOT NULL,
  `date_birth` date NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `number_phone` varchar(50) NOT NULL,
  `last_education` varchar(50) NOT NULL,
  `photo` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `major`
--

CREATE TABLE `major` (
  `id` int(11) NOT NULL,
  `major_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `id` int(11) NOT NULL,
  `material_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rule`
--

CREATE TABLE `rule` (
  `id` int(11) NOT NULL,
  `rule_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rule`
--

INSERT INTO `rule` (`id`, `rule_name`) VALUES
(1, 'master'),
(2, 'lecturer'),
(3, 'student');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `lecturer_identity_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `day` varchar(20) NOT NULL,
  `clock` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_identity`
--

CREATE TABLE `student_identity` (
  `id` int(11) NOT NULL,
  `user_login_email` varchar(100) NOT NULL,
  `nim` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `country` varchar(50) NOT NULL,
  `date_birth` date NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `number_phone` varchar(50) NOT NULL,
  `last_education` varchar(50) NOT NULL,
  `major_last_education` varchar(50) NOT NULL,
  `major_id` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `photo` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `task_lecturer`
--

CREATE TABLE `task_lecturer` (
  `id` int(11) NOT NULL,
  `lecturer_identity_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `task_name` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `task_file` blob NOT NULL,
  `deadline` datetime NOT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `task_student`
--

CREATE TABLE `task_student` (
  `id` int(11) NOT NULL,
  `task_lecturer_id` int(11) NOT NULL,
  `task_file` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rule_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_identity_id` (`student_identity_id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indexes for table `lecturer_identity`
--
ALTER TABLE `lecturer_identity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nid` (`nid`),
  ADD KEY `user_login_email` (`user_login_email`);

--
-- Indexes for table `major`
--
ALTER TABLE `major`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rule`
--
ALTER TABLE `rule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lecturer_identity_id` (`lecturer_identity_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `student_identity`
--
ALTER TABLE `student_identity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nim` (`nim`),
  ADD KEY `user_login_email` (`user_login_email`),
  ADD KEY `major_id` (`major_id`);

--
-- Indexes for table `task_lecturer`
--
ALTER TABLE `task_lecturer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lecturer_identity_id` (`lecturer_identity_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `task_student`
--
ALTER TABLE `task_student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_lecturer_id` (`task_lecturer_id`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`email`),
  ADD KEY `rule_id` (`rule_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lecturer_identity`
--
ALTER TABLE `lecturer_identity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `major`
--
ALTER TABLE `major`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rule`
--
ALTER TABLE `rule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_identity`
--
ALTER TABLE `student_identity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_lecturer`
--
ALTER TABLE `task_lecturer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_student`
--
ALTER TABLE `task_student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`student_identity_id`) REFERENCES `student_identity` (`id`),
  ADD CONSTRAINT `class_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`);

--
-- Constraints for table `lecturer_identity`
--
ALTER TABLE `lecturer_identity`
  ADD CONSTRAINT `lecturer_identity_ibfk_1` FOREIGN KEY (`user_login_email`) REFERENCES `user_login` (`email`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`lecturer_identity_id`) REFERENCES `lecturer_identity` (`id`),
  ADD CONSTRAINT `schedule_ibfk_4` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`);

--
-- Constraints for table `student_identity`
--
ALTER TABLE `student_identity`
  ADD CONSTRAINT `student_identity_ibfk_1` FOREIGN KEY (`user_login_email`) REFERENCES `user_login` (`email`),
  ADD CONSTRAINT `student_identity_ibfk_2` FOREIGN KEY (`major_id`) REFERENCES `major` (`id`);

--
-- Constraints for table `task_lecturer`
--
ALTER TABLE `task_lecturer`
  ADD CONSTRAINT `task_lecturer_ibfk_2` FOREIGN KEY (`lecturer_identity_id`) REFERENCES `lecturer_identity` (`id`),
  ADD CONSTRAINT `task_lecturer_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`);

--
-- Constraints for table `task_student`
--
ALTER TABLE `task_student`
  ADD CONSTRAINT `task_student_ibfk_1` FOREIGN KEY (`task_lecturer_id`) REFERENCES `task_lecturer` (`id`);

--
-- Constraints for table `user_login`
--
ALTER TABLE `user_login`
  ADD CONSTRAINT `user_login_ibfk_1` FOREIGN KEY (`rule_id`) REFERENCES `rule` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
