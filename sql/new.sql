CREATE TABLE `pv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_ip` varchar(255) NOT NULL DEFAULT '',
  `view_title` varchar(255) NOT NULL DEFAULT '',
  `view_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;