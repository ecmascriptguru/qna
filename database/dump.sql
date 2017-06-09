/*
SQLyog Enterprise - MySQL GUI v8.12 
MySQL - 5.5.5-10.1.21-MariaDB : Database - qna
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`qna` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `qna`;

/*Table structure for table `qna_answers` */

DROP TABLE IF EXISTS `qna_answers`;

CREATE TABLE `qna_answers` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `result_id` int(10) NOT NULL,
  `subject_id` int(12) NOT NULL,
  `value` text NOT NULL,
  `estimation` float NOT NULL DEFAULT '100',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `qna_answers` */

/*Table structure for table `qna_results` */

DROP TABLE IF EXISTS `qna_results`;

CREATE TABLE `qna_results` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL DEFAULT '1',
  `wizard_id` int(10) DEFAULT NULL,
  `analysis` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `qna_results` */

/*Table structure for table `qna_subjects` */

DROP TABLE IF EXISTS `qna_subjects`;

CREATE TABLE `qna_subjects` (
  `id` int(12) NOT NULL,
  `question` varchar(255) CHARACTER SET utf8 NOT NULL,
  `wizard_id` int(10) unsigned DEFAULT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `value` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `qna_subjects` */

/*Table structure for table `qna_types` */

DROP TABLE IF EXISTS `qna_types`;

CREATE TABLE `qna_types` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `qna_types` */

/*Table structure for table `qna_wizards` */

DROP TABLE IF EXISTS `qna_wizards`;

CREATE TABLE `qna_wizards` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'PK for QandA',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `qna_wizards` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
