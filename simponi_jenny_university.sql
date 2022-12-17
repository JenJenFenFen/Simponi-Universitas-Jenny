-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2022 at 03:32 AM
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
  `class_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `student_identity_id`, `class_name`) VALUES
(14, 52, 'TI11'),
(15, 47, 'TI11'),
(16, 49, 'TI11'),
(17, 53, 'SI11'),
(18, 51, 'SI11'),
(19, 48, 'TK11'),
(20, 50, 'TK11');

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
  `major_last_education` varchar(100) NOT NULL,
  `photo` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lecturer_identity`
--

INSERT INTO `lecturer_identity` (`id`, `user_login_email`, `nid`, `name`, `gender`, `country`, `date_birth`, `address`, `status`, `number_phone`, `last_education`, `major_last_education`, `photo`) VALUES
(1, 'derry.alamsyah@gmail.com', 2022110001, 'Derry Alamsyah', 'Laki-Laki', 'Palembang', '1975-12-12', 'Jl. KHA Rasyid Siddik', 'Menikah', '082282017085', 'S3', 'Teknik Informatika', 0x466f746f2d526578792e6a7067),
(2, 'tinalia@gmail.com', 2022110002, 'Tinalia', 'Perempuan', 'Palembang', '1965-10-04', 'Jl. KM 12', 'Menikah', '082282017085', 'S2', 'Teknik Informatika', 0x466f746f2d4a656e6e792832292e6a706567),
(3, 'yohanes1305@gmail.com', 2022110003, 'Yohanes', 'Laki-Laki', 'Palembang', '1984-05-13', 'Jl. Rajawali No 15', 'Belum Menikah', '082282017085', 'S2', 'Sistem Informasi', 0x466f746f2d4b6576696e2e6a7067);

-- --------------------------------------------------------

--
-- Table structure for table `major`
--

CREATE TABLE `major` (
  `id` int(11) NOT NULL,
  `study_program_id` int(11) NOT NULL,
  `major_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `major`
--

INSERT INTO `major` (`id`, `study_program_id`, `major_name`) VALUES
(1, 1, 'Teknik Informatika'),
(2, 1, 'Sistem Informasi'),
(3, 1, 'Teknik Komputer'),
(4, 2, 'Teknik Informatika'),
(5, 2, 'Sistem Informasi');

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `id` int(11) NOT NULL,
  `material_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `material`
--

INSERT INTO `material` (`id`, `material_name`) VALUES
(1, 'Pendidikan Agama'),
(2, 'Kalkulus I'),
(3, 'Kalkulus II'),
(4, 'Pengolahan Basis Data'),
(5, 'Pengolahan Website');

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
  `class` varchar(50) NOT NULL,
  `material_id` int(11) NOT NULL,
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
  `photo` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_identity`
--

INSERT INTO `student_identity` (`id`, `user_login_email`, `nim`, `name`, `gender`, `country`, `date_birth`, `address`, `status`, `number_phone`, `last_education`, `major_last_education`, `major_id`, `semester`, `photo`) VALUES
(47, 'fenjenjen@gmail.com', 2022250001, 'Jennyver Seztiani Luxman', 'Perempuan', 'Palembang', '1996-09-21', 'Jl. KHA Rasyid Siddik No 11-220', 'Belum Menikah', '082282017085', 'S1', 'Teknik Informatika', 4, 1, 0x466f746f2d4a656e6e792831292e6a7067),
(48, 'meganty@gmail.com', 2022230001, 'Meganty Manurung', 'Perempuan', 'Palembang', '1996-11-11', 'Jl. Rajawali No 15', 'Belum Menikah', '082282017085', 'S1', 'Teknik Informatika', 3, 1, 0x466f746f2d4d6567616e74792e6a7067),
(49, 'jefrynolastname@gmail.com', 2022250002, 'Jefry', 'Laki-Laki', 'Palembang', '1997-03-11', 'Jl. Candi Angsoko 2 No 210', 'Belum Menikah', '082282017085', 'S1', 'Teknik Informatika', 4, 1, 0x466f746f2d4a656672792e6a7067),
(50, 'rusdie@gmail.com', 2022230002, 'Rusdie Busdin', 'Laki-Laki', 'Palembang', '1995-05-04', 'Jl. A Rivai No 21', 'Belum Menikah', '082282017085', 'S1', 'Teknik Informatika', 3, 1, 0x466f746f2d5275736469652e6a7067),
(51, 'ezrarexy@gmail.com', 2022240001, 'Rexy Pradipta', 'Laki-Laki', 'Palembang', '1995-03-14', 'Jl. Angkatan 66 No 50A', 'Belum Menikah', '082282017085', 'S1', 'Sistem Informasi', 5, 1, 0x466f746f2d526578792e6a7067),
(52, 'rockyne@gmail.com', 2022250003, 'Rocky Novialdo Effendi', 'Laki-Laki', 'Palembang', '1995-11-25', 'Jl. Cinde No 1', 'Belum Menikah', '082282017085', 'S1', 'Teknik Komputer', 1, 1, 0x466f746f2d526f636b792e6a7067),
(53, 'kevinkristanto@gmail.com', 2022240002, 'Kevin Kristanto', 'Laki-Laki', 'Palembang', '1996-07-16', 'Jl. Celentang No 32', 'Menikah', '082282017085', 'S1', 'Teknik Komputer', 2, 1, 0x466f746f2d4b6576696e2e6a7067);

-- --------------------------------------------------------

--
-- Table structure for table `study_program`
--

CREATE TABLE `study_program` (
  `id` int(11) NOT NULL,
  `study_program_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `study_program`
--

INSERT INTO `study_program` (`id`, `study_program_name`) VALUES
(1, 'S1'),
(2, 'S2');

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
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`email`, `password`, `rule_id`) VALUES
('derry.alamsyah@gmail.com', 'simponi123', 2),
('ezrarexy@gmail.com', 'simponi123', 3),
('fenjenjen@gmail.com', 'simponi123', 3),
('jefrynolastname@gmail.com', 'simponi123', 3),
('kevinkristanto@gmail.com', 'simponi123', 3),
('meganty@gmail.com', 'simponi123', 3),
('rockyne@gmail.com', 'simponi123', 3),
('rusdie@gmail.com', 'simponi123', 3),
('tinalia@gmail.com', 'simponi123', 2),
('yohanes1305@gmail.com', 'simponi123', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_identity_id` (`student_identity_id`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `study_program_id` (`study_program_id`);

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
  ADD KEY `class_id` (`class`),
  ADD KEY `material_id` (`material_id`);

--
-- Indexes for table `student_identity`
--
ALTER TABLE `student_identity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nim` (`nim`),
  ADD UNIQUE KEY `user_login_email_2` (`user_login_email`),
  ADD UNIQUE KEY `nim_2` (`nim`),
  ADD UNIQUE KEY `user_login_email_3` (`user_login_email`),
  ADD KEY `user_login_email` (`user_login_email`),
  ADD KEY `major_id` (`major_id`);

--
-- Indexes for table `study_program`
--
ALTER TABLE `study_program`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `study_program_name` (`study_program_name`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `lecturer_identity`
--
ALTER TABLE `lecturer_identity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `major`
--
ALTER TABLE `major`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `study_program`
--
ALTER TABLE `study_program`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`student_identity_id`) REFERENCES `student_identity` (`id`);

--
-- Constraints for table `lecturer_identity`
--
ALTER TABLE `lecturer_identity`
  ADD CONSTRAINT `lecturer_identity_ibfk_1` FOREIGN KEY (`user_login_email`) REFERENCES `user_login` (`email`);

--
-- Constraints for table `major`
--
ALTER TABLE `major`
  ADD CONSTRAINT `major_ibfk_1` FOREIGN KEY (`study_program_id`) REFERENCES `study_program` (`id`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`lecturer_identity_id`) REFERENCES `lecturer_identity` (`id`),
  ADD CONSTRAINT `schedule_ibfk_5` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`);

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
