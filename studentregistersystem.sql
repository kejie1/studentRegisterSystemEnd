/*
 Navicat MySQL Data Transfer

 Source Server         : mydb
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : studentregistersystem

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 20/03/2022 18:55:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for s_class
-- ----------------------------
DROP TABLE IF EXISTS `s_class`;
CREATE TABLE `s_class`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classStr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '班级名称',
  `collegeId` int(11) NULL DEFAULT NULL COMMENT '所属学院',
  `counselorId` int(11) NOT NULL DEFAULT 0 COMMENT '负责人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '班级' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of s_class
-- ----------------------------
INSERT INTO `s_class` VALUES (1, '啊啊啊', 2, 1);
INSERT INTO `s_class` VALUES (2, '2222', 2, 1);

-- ----------------------------
-- Table structure for s_college
-- ----------------------------
DROP TABLE IF EXISTS `s_college`;
CREATE TABLE `s_college`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `collegeStr` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学院名称',
  `principal` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '负责人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of s_college
-- ----------------------------
INSERT INTO `s_college` VALUES (1, '软件学院', '张三');
INSERT INTO `s_college` VALUES (2, '金融学院', '李四');

-- ----------------------------
-- Table structure for s_counselor
-- ----------------------------
DROP TABLE IF EXISTS `s_counselor`;
CREATE TABLE `s_counselor`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `classId` int(11) NOT NULL DEFAULT 0 COMMENT '带领班级',
  `collegeId` int(11) NOT NULL DEFAULT 0 COMMENT '所属学院',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '教师' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of s_counselor
-- ----------------------------
INSERT INTO `s_counselor` VALUES (1, 'user1', '13222222222', 1, 2);
INSERT INTO `s_counselor` VALUES (2, 'user2', '11111', 1, 2);

-- ----------------------------
-- Table structure for s_hostel
-- ----------------------------
DROP TABLE IF EXISTS `s_hostel`;
CREATE TABLE `s_hostel`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hostelSex` tinyint(2) NOT NULL COMMENT '男女',
  `hostelBuild` int(8) NOT NULL COMMENT '楼栋',
  `hostelName` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宿舍号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of s_hostel
-- ----------------------------
INSERT INTO `s_hostel` VALUES (1, 2, 1, '1-102');
INSERT INTO `s_hostel` VALUES (2, 1, 2, '1-102');
INSERT INTO `s_hostel` VALUES (5, 1, 1, '1-101');

-- ----------------------------
-- Table structure for s_students
-- ----------------------------
DROP TABLE IF EXISTS `s_students`;
CREATE TABLE `s_students`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '姓名',
  `studentId` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '学号',
  `sex` tinyint(3) NOT NULL DEFAULT 0 COMMENT '性别',
  `age` int(6) NOT NULL DEFAULT 0,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '电话',
  `idCard` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '身份证',
  `collegeId` int(11) NOT NULL DEFAULT 0 COMMENT '学院',
  `vocationalId` int(11) NULL DEFAULT NULL COMMENT '专业',
  `classId` int(11) NOT NULL DEFAULT 0 COMMENT '班级',
  `hostelId` int(11) NOT NULL DEFAULT 0 COMMENT '宿舍',
  `ethnic` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '民族',
  `birthPlace` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '生源地',
  `address` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '家庭地址',
  `graduate` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '毕业院校',
  `counselorId` int(11) NOT NULL DEFAULT 0 COMMENT '辅导员姓名',
  `counselorPhone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '辅导员电话',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '学生信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of s_students
-- ----------------------------
INSERT INTO `s_students` VALUES (1, '张三', 'X1701918', 2, 20, '1321233333', '20022222222222222', 2, 1, 1, 22, '1', '重庆', '四川省成都市', '成都大学', 1, '13233333333');
INSERT INTO `s_students` VALUES (2, 'test', 'X1701919', 1, 22, '21312312', '4123124123', 1, 1, 1, 1, '2', 'sasdasd', 'asdasd', 'asdasdas', 1, '13222222222');
INSERT INTO `s_students` VALUES (5, 'test', '111', 2, 11, '11111111111', '111111111111111111', 1, 1, 1, 123, '5', '111', '111', '1111', 1, '13222222222');
INSERT INTO `s_students` VALUES (6, '二狗', 'Z22222222', 2, 19, '13222222222', '500000000000000000', 2, 1, 1, 114, '11', '北京', '北京', '北京大学', 1, '13222222222');
INSERT INTO `s_students` VALUES (7, 'test2222', '1111', 2, 111, '11111111111', '11111', 2, 1, 1, 111, '7', '111', '1111', '1111', 1, '1222222222');
INSERT INTO `s_students` VALUES (8, '111', '111', 2, 111, '111', '111', 2, 1, 1, 111, '7', '111', '11', '111', 1, '13222222222');
INSERT INTO `s_students` VALUES (9, '222', '2222', 1, 22, '2222', '22222', 1, 1, 1, 2222, '18', '2222', '2222', '2222', 1, '13222222222');
INSERT INTO `s_students` VALUES (10, '222', '2222', 1, 22, '2222', '22222', 1, 1, 1, 2222, '18', '2222', '2222', '2222', 1, '13222222222');
INSERT INTO `s_students` VALUES (11, '222', '2222', 1, 22, '2222', '22222', 1, 1, 1, 2222, '18', '2222', '2222', '2222', 1, '13222222222');
INSERT INTO `s_students` VALUES (17, '张三', 'X1701918', 2, 20, '1321233333', '20022222222222222', 2, 1, 1, 22, '1', '重庆', '四川省成都市', '成都大学', 1, '13222222222');
INSERT INTO `s_students` VALUES (18, 'asdasd', 'X1701918', 2, 20, '1321233333', '20022222222222222', 2, 1, 1, 22, '1', '重庆', '四川省成都市', '成都大学', 1, '13222222222');

-- ----------------------------
-- Table structure for s_user
-- ----------------------------
DROP TABLE IF EXISTS `s_user`;
CREATE TABLE `s_user`  (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `collegeId` int(255) NULL DEFAULT NULL COMMENT '学院ID',
  `status` tinyint(8) NOT NULL COMMENT '启用状态',
  `accountType` tinyint(8) NOT NULL COMMENT '权限',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of s_user
-- ----------------------------
INSERT INTO `s_user` VALUES (1, 'admin', '123456', '13212222222', 'jack@sina.com', 1, 1, 2);
INSERT INTO `s_user` VALUES (2, 'zs', '123456', '13213333333', 'zs@126.com', 2, 1, 1);

-- ----------------------------
-- Table structure for s_vocational
-- ----------------------------
DROP TABLE IF EXISTS `s_vocational`;
CREATE TABLE `s_vocational`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vocationalStr` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '专业名称',
  `collegeId` int(11) NOT NULL DEFAULT 0 COMMENT '所属学院',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '专业' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of s_vocational
-- ----------------------------
INSERT INTO `s_vocational` VALUES (1, '软件工程', 2);

SET FOREIGN_KEY_CHECKS = 1;
