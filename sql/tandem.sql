DROP TABLE IF EXISTS `data`;
CREATE TABLE `data` (
  `start` int NOT NULL,
  `end` int NOT NULL,
  `lenght` int NOT NULL,
  `period` int NOT NULL,
  `copies` float NOT NULL,
  `errors` int NOT NULL,
  `mathes` int NOT NULL,
  `percent` float NOT NULL,
  `id` int NOT NULL,
  `sdata` char(60) NOT NULL,
  `edata` char(60) NOT NULL,
  KEY `pointer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `inputdesc`;
CREATE TABLE `inputdesc` (
  `id` int NOT NULL auto_increment,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `dna_sequence`;
CREATE TABLE `dna_sequence` (
    `id` int NOT NULL auto_increment,
    `dna` varchar(255) NOT NULL,
    PRIMARY KEY  (`id`)
);