/*
SQLyog Enterprise - MySQL GUI v8.12 
MySQL - 5.5.5-10.1.21-MariaDB : Database - alexdev_qna
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`alexdev_qna` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `alexdev_qna`;

/*Table structure for table `qna_analyses` */

DROP TABLE IF EXISTS `qna_analyses`;

CREATE TABLE `qna_analyses` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `wizard_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `condition` text,
  `result` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `qna_analyses` */

insert  into `qna_analyses`(`id`,`wizard_id`,`name`,`condition`,`result`) values (3,2,'First one','{\"subjects\":[],\"calculations\":[{\"id\":1,\"operator\":\">\",\"value\":\"28\"}]}','Wow, It does look good.{{Calc1}} = {{Val1}}'),(4,2,'Real one?','{\"subjects\":[{\"id\":3,\"operator\":\">\",\"value\":\"15\"},{\"id\":2,\"operator\":\"==\",\"value\":\"No\"}],\"calculations\":[{\"id\":1,\"operator\":\"<\",\"value\":\"25\"}]}','You! Go away!'),(5,2,'Something new','{\"subjects\":[{\"id\":3,\"operator\":\">\",\"value\":\"10\"}],\"calculations\":[]}','Wow, it does work!\nYou can use this - {{A3}}'),(6,2,'Final Analysis Test?','{\"subjects\":[{\"id\":2,\"operator\":\"==\",\"value\":\"Yes\"}],\"calculations\":[{\"id\":1,\"operator\":\">\",\"value\":\"30\"}]}','Welcome!');

/*Table structure for table `qna_answers` */

DROP TABLE IF EXISTS `qna_answers`;

CREATE TABLE `qna_answers` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `result_id` int(10) NOT NULL,
  `subject_id` int(12) NOT NULL,
  `value` text NOT NULL,
  `estimation` float NOT NULL DEFAULT '100',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `qna_answers` */

insert  into `qna_answers`(`id`,`result_id`,`subject_id`,`value`,`estimation`) values (4,4,2,'Not sure, why?',0),(5,4,3,'29',0),(8,6,2,'Yes, absolutely true.',0),(9,6,3,'32',0);

/*Table structure for table `qna_calculations` */

DROP TABLE IF EXISTS `qna_calculations`;

CREATE TABLE `qna_calculations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `wizard_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `operator` varchar(3) NOT NULL,
  `factors` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `qna_calculations` */

insert  into `qna_calculations`(`id`,`wizard_id`,`name`,`operator`,`factors`) values (1,2,'1.5 times of your age.','+','[{\"coeff\":\"1\",\"id\":\"3\"},{\"coeff\":\"0.5\",\"id\":\"3\"}]');

/*Table structure for table `qna_results` */

DROP TABLE IF EXISTS `qna_results`;

CREATE TABLE `qna_results` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL DEFAULT '1',
  `wizard_id` int(10) DEFAULT NULL,
  `analysis` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `qna_results` */

insert  into `qna_results`(`id`,`user_id`,`wizard_id`,`analysis`) values (4,1,2,0),(6,2,2,0);

/*Table structure for table `qna_subjects` */

DROP TABLE IF EXISTS `qna_subjects`;

CREATE TABLE `qna_subjects` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) CHARACTER SET utf8 NOT NULL,
  `wizard_id` int(10) unsigned NOT NULL,
  `type_id` int(10) unsigned NOT NULL DEFAULT '1',
  `answers` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `qna_subjects` */

insert  into `qna_subjects`(`id`,`question`,`wizard_id`,`type_id`,`answers`) values (2,'Is that true?',2,1,'[{\"caption\":\"\",\"value\":\"\",\"weight\":\"0\",\"next\":\"3\"},{\"caption\":\"\",\"value\":\"\",\"weight\":\"0\",\"next\":\"3\"}]'),(3,'how old are you?',2,2,'[{\"caption\":\"\",\"value\":1,\"weight\":100,\"next\":null}]');

/*Table structure for table `qna_types` */

DROP TABLE IF EXISTS `qna_types`;

CREATE TABLE `qna_types` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `qna_types` */

insert  into `qna_types`(`id`,`type_name`,`value`) values (1,'Text Field','[{\"caption\":\"title\",\"value\":\"\",\"weight\":100}]'),(2,'Number Field','[{\"caption\":\"\",\"value\":1,\"weight\":100,\"next\":null}]'),(3,'Drop Down','[{\"caption\":\"One\",\"value\":\"one\",\"weight\":50,\"next\":null},{\"caption\":\"Two\",\"value\":\"two\",\"weight\":50,\"next\":null}]'),(4,'Multiple Choice','[{\"caption\":\"One\",\"value\":\"one\",\"weight\":50,\"next\":null},{\"caption\":\"Two\",\"value\":\"two\",\"weight\":50,\"next\":null}]'),(5,'Yes or No','[{\"caption\":\"Yes\",\"value\":\"yes\",\"weight\":100,\"next\":null},{\"caption\":\"No\",\"value\":\"no\",\"weight\":0,\"next\":null}]');

/*Table structure for table `qna_wizards` */

DROP TABLE IF EXISTS `qna_wizards`;

CREATE TABLE `qna_wizards` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'PK for QandA',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `starts_with` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `qna_wizards` */

insert  into `qna_wizards`(`id`,`name`,`starts_with`) values (2,'First Demo Wizard',2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
