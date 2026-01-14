-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: kaffehaus
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kaffeehaus`
--

DROP TABLE IF EXISTS `kaffeehaus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kaffeehaus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `getraenk` varchar(100) DEFAULT NULL,
  `bewertung` int DEFAULT NULL,
  `kommentar` text,
  `gemeindeid_fk` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `gemeindeid_fk` (`gemeindeid_fk`),
  CONSTRAINT `kaffeehaus_ibfk_1` FOREIGN KEY (`gemeindeid_fk`) REFERENCES `gemeinde` (`id`) ON DELETE CASCADE,
  CONSTRAINT `kaffeehaus_chk_1` CHECK (((`bewertung` >= 1) and (`bewertung` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kaffeehaus`
--

LOCK TABLES `kaffeehaus` WRITE;
/*!40000 ALTER TABLE `kaffeehaus` DISABLE KEYS */;
INSERT INTO `kaffeehaus` VALUES (1,'Café Zürichberg','Zurichbergstr. 66, Zürich','Cappuccino',5,'Wunderbar mit Aussicht!',1),(2,'Starbucks Downtown','Bahnhofstr. 10, Zürich','Latte Macchiato',3,'Günstig gelegen aber laut',1),(3,'Café Central','Hauptstr. 45, Winterthur','Espresso',4,'Gemütlich, gutes Personal',2),(4,'Kaffeerösterei Berg','Schulhausstr. 12, Aarau','Filterkaffee',5,'Beste Bohnen in der Region!',3),(5,'Morning Glory','Marktpl. 8, Aarau','Cappuccino',4,'Frische Pasteteien',3);
/*!40000 ALTER TABLE `kaffeehaus` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-14 18:50:52
