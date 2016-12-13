-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2016 at 08:16 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sep2`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE IF NOT EXISTS `courses` (
`cid` int(11) NOT NULL,
  `cname` varchar(500) NOT NULL,
  `clength` varchar(500) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`cid`, `cname`, `clength`) VALUES
(1, 'IT specializing in SE', '4 years');

-- --------------------------------------------------------

--
-- Table structure for table `lecturers`
--

CREATE TABLE IF NOT EXISTS `lecturers` (
  `lid` int(11) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lecturers`
--

INSERT INTO `lecturers` (`lid`, `uid`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `lecture_instance`
--

CREATE TABLE IF NOT EXISTS `lecture_instance` (
`ilid` int(11) NOT NULL,
  `location` varchar(500) NOT NULL,
  `time` datetime NOT NULL,
  `lid` int(11) NOT NULL,
  `sbid` int(11) NOT NULL,
  `enroll` varchar(500) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `lecture_instance`
--

INSERT INTO `lecture_instance` (`ilid`, `location`, `time`, `lid`, `sbid`, `enroll`) VALUES
(1, 'B502', '2016-10-31 10:30:00', 1, 1, 'pass123');

-- --------------------------------------------------------

--
-- Table structure for table `l_question`
--

CREATE TABLE IF NOT EXISTS `l_question` (
`l_id` int(11) NOT NULL,
  `question` varchar(500) NOT NULL,
  `c_answer` varchar(500) NOT NULL,
  `w_answer1` varchar(500) NOT NULL,
  `w_answer2` varchar(500) NOT NULL,
  `w_answer3` varchar(500) NOT NULL,
  `ilid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE IF NOT EXISTS `students` (
`stid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `ilid` int(11) NOT NULL,
  `cid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE IF NOT EXISTS `subjects` (
`sbid` int(11) NOT NULL,
  `sname` varchar(500) NOT NULL,
  `year` varchar(50) NOT NULL,
  `semester` int(10) NOT NULL,
  `cid` int(11) NOT NULL,
  `lid` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`sbid`, `sname`, `year`, `semester`, `cid`, `lid`) VALUES
(1, 'SEP', '3', 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `s_question`
--

CREATE TABLE IF NOT EXISTS `s_question` (
`s_id` int(11) NOT NULL,
  `question` varchar(500) NOT NULL,
  `answer` varchar(500) NOT NULL,
  `ilid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`uid` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `password`, `email`) VALUES
(1, 'username1', 'password1', 'lecturer@sliit.lk');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
 ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `lecturers`
--
ALTER TABLE `lecturers`
 ADD PRIMARY KEY (`lid`);

--
-- Indexes for table `lecture_instance`
--
ALTER TABLE `lecture_instance`
 ADD PRIMARY KEY (`ilid`);

--
-- Indexes for table `l_question`
--
ALTER TABLE `l_question`
 ADD PRIMARY KEY (`l_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
 ADD PRIMARY KEY (`stid`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
 ADD PRIMARY KEY (`sbid`);

--
-- Indexes for table `s_question`
--
ALTER TABLE `s_question`
 ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `lecture_instance`
--
ALTER TABLE `lecture_instance`
MODIFY `ilid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `l_question`
--
ALTER TABLE `l_question`
MODIFY `l_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
MODIFY `stid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
MODIFY `sbid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `s_question`
--
ALTER TABLE `s_question`
MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
