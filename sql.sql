-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.26 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 studentregistersystem 的数据库结构
CREATE DATABASE IF NOT EXISTS `studentregistersystem` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `studentregistersystem`;

-- 导出  表 studentregistersystem.s_class 结构
CREATE TABLE IF NOT EXISTS `s_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classStr` varchar(255) NOT NULL DEFAULT '' COMMENT '班级名称',
  `collegeId` int(11) DEFAULT NULL COMMENT '所属学院',
  `counselorId` int(11) NOT NULL DEFAULT '0' COMMENT '负责人',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='班级';

-- 正在导出表  studentregistersystem.s_class 的数据：2 rows
/*!40000 ALTER TABLE `s_class` DISABLE KEYS */;
INSERT INTO `s_class` (`id`, `classStr`, `collegeId`, `counselorId`) VALUES
	(1, '啊啊啊', 2, 1),
	(2, '2222', 2, 1);
/*!40000 ALTER TABLE `s_class` ENABLE KEYS */;

-- 导出  表 studentregistersystem.s_college 结构
CREATE TABLE IF NOT EXISTS `s_college` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `collegeStr` varchar(100) NOT NULL COMMENT '学院名称',
  `principal` varchar(50) NOT NULL COMMENT '负责人',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- 正在导出表  studentregistersystem.s_college 的数据：2 rows
/*!40000 ALTER TABLE `s_college` DISABLE KEYS */;
INSERT INTO `s_college` (`id`, `collegeStr`, `principal`) VALUES
	(1, '软件学院', '张三'),
	(2, '金融学院', '李四');
/*!40000 ALTER TABLE `s_college` ENABLE KEYS */;

-- 导出  表 studentregistersystem.s_counselor 结构
CREATE TABLE IF NOT EXISTS `s_counselor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `phone` varchar(255) NOT NULL DEFAULT '',
  `classId` int(11) NOT NULL DEFAULT '0' COMMENT '带领班级',
  `collegeId` int(11) NOT NULL DEFAULT '0' COMMENT '所属学院',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='教师';

-- 正在导出表  studentregistersystem.s_counselor 的数据：2 rows
/*!40000 ALTER TABLE `s_counselor` DISABLE KEYS */;
INSERT INTO `s_counselor` (`id`, `name`, `phone`, `classId`, `collegeId`) VALUES
	(1, 'user1', '13222222222', 1, 2),
	(2, 'user2', '11111', 1, 2);
/*!40000 ALTER TABLE `s_counselor` ENABLE KEYS */;

-- 导出  表 studentregistersystem.s_students 结构
CREATE TABLE IF NOT EXISTS `s_students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '姓名',
  `studentId` varchar(20) NOT NULL DEFAULT '' COMMENT '学号',
  `sex` tinyint(3) NOT NULL DEFAULT '0' COMMENT '性别',
  `age` int(6) NOT NULL DEFAULT '0',
  `phone` varchar(11) NOT NULL DEFAULT '0' COMMENT '电话',
  `idCard` varchar(20) NOT NULL DEFAULT '0' COMMENT '身份证',
  `collegeId` int(11) NOT NULL DEFAULT '0' COMMENT '学院',
  `vocationalId` int(11) DEFAULT NULL COMMENT '专业',
  `classId` int(11) NOT NULL DEFAULT '0' COMMENT '班级',
  `hostelId` int(11) NOT NULL DEFAULT '0' COMMENT '宿舍',
  `ethnic` varchar(20) NOT NULL DEFAULT '' COMMENT '民族',
  `birthPlace` varchar(60) NOT NULL DEFAULT '' COMMENT '生源地',
  `address` varchar(60) NOT NULL DEFAULT '' COMMENT '家庭地址',
  `graduate` varchar(60) NOT NULL DEFAULT '' COMMENT '毕业院校',
  `counselorId` int(11) NOT NULL DEFAULT '0' COMMENT '辅导员姓名',
  `counselorPhone` varchar(11) NOT NULL DEFAULT '' COMMENT '辅导员电话',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='学生信息';

-- 正在导出表  studentregistersystem.s_students 的数据：11 rows
/*!40000 ALTER TABLE `s_students` DISABLE KEYS */;
INSERT INTO `s_students` (`id`, `name`, `studentId`, `sex`, `age`, `phone`, `idCard`, `collegeId`, `vocationalId`, `classId`, `hostelId`, `ethnic`, `birthPlace`, `address`, `graduate`, `counselorId`, `counselorPhone`) VALUES
	(1, '张三', 'X1701918', 2, 20, '1321233333', '20022222222222222', 2, 1, 1, 22, '1', '重庆', '四川省成都市', '成都大学', 1, '13233333333'),
	(2, 'test', 'X1701919', 1, 22, '21312312', '4123124123', 1, 1, 1, 1, '2', 'sasdasd', 'asdasd', 'asdasdas', 1, '13222222222'),
	(5, 'test', '111', 2, 11, '11111111111', '111111111111111111', 1, 1, 1, 123, '5', '111', '111', '1111', 1, '13222222222'),
	(6, '二狗', 'Z22222222', 2, 19, '13222222222', '500000000000000000', 2, 1, 1, 114, '11', '北京', '北京', '北京大学', 1, '13222222222'),
	(7, 'test2222', '1111', 2, 111, '11111111111', '11111', 2, 1, 1, 111, '7', '111', '1111', '1111', 1, '1222222222'),
	(8, '111', '111', 2, 111, '111', '111', 2, 1, 1, 111, '7', '111', '11', '111', 1, '13222222222'),
	(9, '222', '2222', 1, 22, '2222', '22222', 1, 1, 1, 2222, '18', '2222', '2222', '2222', 1, '13222222222'),
	(10, '222', '2222', 1, 22, '2222', '22222', 1, 1, 1, 2222, '18', '2222', '2222', '2222', 1, '13222222222'),
	(11, '222', '2222', 1, 22, '2222', '22222', 1, 1, 1, 2222, '18', '2222', '2222', '2222', 1, '13222222222'),
	(17, '张三', 'X1701918', 2, 20, '1321233333', '20022222222222222', 2, 1, 1, 22, '1', '重庆', '四川省成都市', '成都大学', 1, '13222222222'),
	(18, 'asdasd', 'X1701918', 2, 20, '1321233333', '20022222222222222', 2, 1, 1, 22, '1', '重庆', '四川省成都市', '成都大学', 1, '13222222222');
/*!40000 ALTER TABLE `s_students` ENABLE KEYS */;

-- 导出  表 studentregistersystem.s_user 结构
CREATE TABLE IF NOT EXISTS `s_user` (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `username` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL,
  `phone` varchar(20) DEFAULT NULL COMMENT '电话',
  `email` varchar(30) DEFAULT NULL COMMENT '邮箱',
  `collegeId` int(255) DEFAULT NULL COMMENT '学院ID',
  `status` tinyint(8) NOT NULL COMMENT '启用状态',
  `accountType` tinyint(8) NOT NULL COMMENT '权限',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- 正在导出表  studentregistersystem.s_user 的数据：2 rows
/*!40000 ALTER TABLE `s_user` DISABLE KEYS */;
INSERT INTO `s_user` (`id`, `username`, `password`, `phone`, `email`, `collegeId`, `status`, `accountType`) VALUES
	(1, 'admin', '123456', '13212222222', 'jack@sina.com', 1, 1, 2),
	(2, 'zs', '123456', '13213333333', 'zs@126.com', 2, 1, 1);
/*!40000 ALTER TABLE `s_user` ENABLE KEYS */;

-- 导出  表 studentregistersystem.s_vocational 结构
CREATE TABLE IF NOT EXISTS `s_vocational` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vocationalStr` varchar(60) NOT NULL DEFAULT '' COMMENT '专业名称',
  `collegeId` int(11) NOT NULL DEFAULT '0' COMMENT '所属学院',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='专业';

-- 正在导出表  studentregistersystem.s_vocational 的数据：1 rows
/*!40000 ALTER TABLE `s_vocational` DISABLE KEYS */;
INSERT INTO `s_vocational` (`id`, `vocationalStr`, `collegeId`) VALUES
	(1, '软件工程', 2);
/*!40000 ALTER TABLE `s_vocational` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
