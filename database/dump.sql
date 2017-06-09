/*
SQLyog Enterprise - MySQL GUI v8.12 
MySQL - 5.5.5-10.1.21-MariaDB : Database - qna
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`alexdev_qna` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `alexdev_qna`;

/*Table structure for table `qna_answers` */

DROP TABLE IF EXISTS `qna_answers`;

CREATE TABLE `qna_answers` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `result_id` int(10) NOT NULL,
  `subject_id` int(12) NOT NULL,
  `value` text NOT NULL,
  `estimation` float NOT NULL DEFAULT '100',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `qna_answers` */

insert  into `qna_answers`(`id`,`result_id`,`subject_id`,`value`,`estimation`) values (1,1,2,'none',40),(2,2,2,'none',40),(3,3,2,'none',40);

/*Table structure for table `qna_results` */

DROP TABLE IF EXISTS `qna_results`;

CREATE TABLE `qna_results` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL DEFAULT '1',
  `wizard_id` int(10) DEFAULT NULL,
  `analysis` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `qna_results` */

insert  into `qna_results`(`id`,`user_id`,`wizard_id`,`analysis`) values (2,1,2,80);

/*Table structure for table `qna_subjects` */

DROP TABLE IF EXISTS `qna_subjects`;

CREATE TABLE `qna_subjects` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) CHARACTER SET utf8 NOT NULL,
  `wizard_id` int(10) unsigned NOT NULL,
  `type_id` int(10) unsigned NOT NULL DEFAULT '1',
  `value` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `qna_subjects` */

insert  into `qna_subjects`(`id`,`question`,`wizard_id`,`type_id`,`value`) values (2,'Is that true?',2,1,'{\"caption\":\"title\",\"value\":\"\",\"weight\":100}');

/*Table structure for table `qna_types` */

DROP TABLE IF EXISTS `qna_types`;

CREATE TABLE `qna_types` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `qna_types` */

insert  into `qna_types`(`id`,`type_name`,`value`) values (1,'Text Field','{\"caption\":\"title\",\"value\":\"\",\"weight\":100}');

/*Table structure for table `qna_wizards` */

DROP TABLE IF EXISTS `qna_wizards`;

CREATE TABLE `qna_wizards` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'PK for QandA',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `qna_wizards` */

insert  into `qna_wizards`(`id`,`name`) values (2,'something'),(3,'something');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
