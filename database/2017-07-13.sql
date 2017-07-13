alter table `qna`.`qna_results` 
   add column `address` varchar(128) NOT NULL after `id`, 
   add column `city` varchar(50) NOT NULL after `address`, 
   add column `state` varchar(50) NOT NULL after `city`, 
   add column `zip_code` varchar(10) NOT NULL after `state`


alter table `qna`.`qna_analyses` 
   change `result` `result` text(255) NULL 