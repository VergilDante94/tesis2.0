-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: gestion_servicios
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('13e9f725-ce7c-419f-88c3-5ac2ec99e5ed','04e85238c13bb9f11dba4a79fcfafbdb979b2bf8501d27978af421202669fb6a','2025-03-26 11:54:17.414','20250326115417_add_impuestos_to_factura',NULL,NULL,'2025-03-26 11:54:17.266',1),('150421a5-3efe-437e-be8a-b5822a542954','dcf552ff685aa0292bbc04536af2f4f414205dcbc73aff2ef82b37f019cf36b3','2025-04-04 11:02:09.677','20250404110209_add_order_type_and_venta_relation',NULL,NULL,'2025-04-04 11:02:09.554',1),('30eddf2c-46c3-4de1-9cb6-446de9628cc1','5549cdc18d2c2f7534e10627ea49d230b43330682dce804613d64b3e8828aa81','2025-03-18 11:09:17.764','20250318110917_add_direccion_telefono_to_usuario',NULL,NULL,'2025-03-18 11:09:17.726',1),('50d9dd88-40e9-44e7-afaf-37e0f6c5924f','481350454a006571a6fe2a453066cd0f68f37b701bfea31211fc547dfd176f25','2025-03-13 08:07:43.495','20250313080722_add_tipo_servicio',NULL,NULL,'2025-03-13 08:07:43.472',1),('64f1fd9b-391d-4906-98ac-5c1fab06afc9','1ebcc8d88c9b0af35014cf4f416840d2c9552995209590cee35ef2ec9f1c57b9','2025-04-04 10:47:42.757','20250404104742_add_store_models',NULL,NULL,'2025-04-04 10:47:42.416',1),('69c6d183-f03c-4824-847d-57c389277820','2ed3b2bbc44ba88a193dd000b157a6eed95e37ef132124ae1d652eb37475568d','2025-03-13 08:07:52.734','20250313080752_',NULL,NULL,'2025-03-13 08:07:52.721',1),('772016b0-f158-4bb9-99b4-a87fc2189bbb','b3a6e98e15f62435101885b550efe99c75fa78bd8e1099f1215a1378a7fda776','2025-04-02 11:37:01.328','20250402113701_add_fecha_programada',NULL,NULL,'2025-04-02 11:37:01.291',1),('b0448b43-38be-4b0d-8244-c47a22f21bfb','ec71b5f6ae072b100e7d28515a7f1125a030e0270872ebae0793f95d2952d140','2025-03-12 11:01:01.589','20250308090040_init',NULL,NULL,'2025-03-12 11:01:01.054',1),('b99cb1ce-344e-477a-afdd-c42c2f4675b2','ecc4a4689671a0cad21870062dceab9ff2ce960825eee6b1799f04b6a1a74364','2025-03-26 12:00:55.933','20250326120055_remove_impuestos_from_factura',NULL,NULL,'2025-03-26 12:00:55.866',1),('bd75284b-a8d9-4a26-8ee1-248131febb6b','999c43ed433dcd5a23103b72ae8f59e84af87f22e1fcc12a8505353da5262e5e','2025-03-20 10:01:22.200','20250320100122_add_active_flag_to_users',NULL,NULL,'2025-03-20 10:01:22.172',1),('c20a4e25-476b-4c2d-9bb5-6bae3acebb7e','e6142a8d73ae6702d71b50a5fe8cb8bffa0f91aa8b9cda513651791f4a942df5','2025-03-13 08:18:41.555','20250313081841_remove_duracion_horas',NULL,NULL,'2025-03-13 08:18:41.533',1),('d39d5990-3f45-48fe-bc83-b0c90aa3e09c','0f63b151c28ffc31d87d518cbcce5cfd9f5ca43d9a585bf54a95cf0233bda3b1','2025-03-12 11:01:01.635','20250308102449_add_duracion_horas_to_servicio',NULL,NULL,'2025-03-12 11:01:01.592',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Disco Duros','','2025-04-04 11:50:19.481','2025-04-06 09:47:26.597'),(3,'Perifericos','Teclado, Mause','2025-04-06 10:26:44.760','2025-04-06 10:26:44.760');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarioId` int NOT NULL,
  `direccion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Cliente_usuarioId_key` (`usuarioId`),
  CONSTRAINT `Cliente_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (2,5,'delegacion guane','762882'),(3,6,'delegacion','225223');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalleventa`
--

DROP TABLE IF EXISTS `detalleventa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalleventa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ventaId` int NOT NULL,
  `productoId` int NOT NULL,
  `cantidad` int NOT NULL,
  `precioUnitario` double NOT NULL,
  `subtotal` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `DetalleVenta_ventaId_fkey` (`ventaId`),
  KEY `DetalleVenta_productoId_fkey` (`productoId`),
  CONSTRAINT `DetalleVenta_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `producto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DetalleVenta_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `venta` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleventa`
--

LOCK TABLES `detalleventa` WRITE;
/*!40000 ALTER TABLE `detalleventa` DISABLE KEYS */;
INSERT INTO `detalleventa` VALUES (1,4,2,1,25,25,'2025-04-06 13:05:15.959','2025-04-06 13:05:15.959'),(2,5,2,1,25,25,'2025-04-07 08:53:30.821','2025-04-07 08:53:30.821'),(3,6,1,1,100,100,'2025-04-07 11:19:18.923','2025-04-07 11:19:18.923'),(4,7,2,1,25,25,'2025-04-07 11:19:42.457','2025-04-07 11:19:42.457'),(5,8,1,1,100,100,'2025-04-07 11:26:42.525','2025-04-07 11:26:42.525'),(6,8,2,1,25,25,'2025-04-07 11:26:42.525','2025-04-07 11:26:42.525'),(7,9,1,1,100,100,'2025-04-07 11:37:57.216','2025-04-07 11:37:57.216'),(8,9,2,1,25,25,'2025-04-07 11:37:57.216','2025-04-07 11:37:57.216'),(9,10,1,1,100,100,'2025-04-08 09:22:02.854','2025-04-08 09:22:02.854'),(10,10,2,1,25,25,'2025-04-08 09:22:02.854','2025-04-08 09:22:02.854'),(11,11,1,1,100,100,'2025-04-08 09:28:50.634','2025-04-08 09:28:50.634'),(12,11,2,1,25,25,'2025-04-08 09:28:50.634','2025-04-08 09:28:50.634');
/*!40000 ALTER TABLE `detalleventa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ordenId` int NOT NULL,
  `subtotal` double NOT NULL,
  `total` double NOT NULL,
  `fechaEmision` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `estado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDIENTE',
  `archivoPath` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firmaCliente` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firmaAdmin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `facturas_ordenId_key` (`ordenId`),
  CONSTRAINT `facturas_ordenId_fkey` FOREIGN KEY (`ordenId`) REFERENCES `orden` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` VALUES (7,18,750,750,'2025-04-04 09:16:43.084','PENDIENTE','/facturas/factura_18_1743758203083.pdf',NULL,NULL,'2025-04-04 09:16:43.093','2025-04-04 09:16:43.093');
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacion`
--

DROP TABLE IF EXISTS `notificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarioId` int NOT NULL,
  `mensaje` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `leida` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Notificacion_usuarioId_fkey` (`usuarioId`),
  CONSTRAINT `Notificacion_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
INSERT INTO `notificacion` VALUES (3,5,'Nueva orden creada #3','2025-03-21 09:07:53.040',0),(4,5,'Nueva orden creada #4','2025-03-21 09:18:45.069',0),(5,5,'Nueva orden creada #5','2025-03-21 10:07:04.822',0),(6,5,'Se ha generado la factura #2 para tu orden #5','2025-03-21 10:07:04.902',0),(7,5,'Nueva orden creada #6','2025-03-21 10:20:50.067',0),(8,5,'Se ha generado la factura #3 para tu orden #6','2025-03-21 10:20:50.138',0),(9,5,'Nueva orden creada #7','2025-03-21 10:55:39.285',0),(11,5,'Nueva orden creada #9','2025-03-25 09:06:04.620',0),(12,5,'La orden #9 ha sido cancelada','2025-03-25 09:25:42.034',0),(13,5,'La orden #8 ha sido cancelada','2025-03-25 09:25:48.426',0),(14,5,'La orden #7 ha sido cancelada','2025-03-25 09:25:50.471',0),(15,6,'Nueva orden creada #10','2025-03-25 10:00:55.982',0),(16,6,'La orden #10 ha sido cancelada','2025-03-25 11:11:39.425',0),(17,6,'Nueva orden creada #11','2025-03-25 11:45:53.074',0),(18,6,'El estado de la orden #11 ha cambiado a EN_PROCESO','2025-03-26 10:25:10.782',0),(19,6,'El estado de la orden #11 ha cambiado a COMPLETADA','2025-03-26 10:25:26.611',0),(20,5,'El estado de la orden #6 ha cambiado a EN_PROCESO','2025-03-26 10:27:26.363',0),(21,5,'El estado de la orden #6 ha cambiado a COMPLETADA','2025-03-26 10:48:49.027',0),(22,5,'El estado de la orden #5 ha cambiado a EN_PROCESO','2025-03-26 10:55:33.810',0),(23,5,'El estado de la orden #5 ha cambiado a COMPLETADA','2025-03-26 10:55:37.674',0),(24,5,'El estado de la orden #4 ha cambiado a EN_PROCESO','2025-03-26 10:56:16.511',0),(25,5,'El estado de la orden #4 ha cambiado a COMPLETADA','2025-03-26 10:56:21.900',0),(26,5,'Nueva orden creada #12','2025-03-26 11:11:53.281',0),(27,5,'El estado de la orden #12 ha cambiado a EN_PROCESO','2025-03-26 11:13:05.084',0),(28,5,'El estado de la orden #12 ha cambiado a COMPLETADA','2025-03-26 11:13:12.779',0),(29,5,'Nueva orden creada #13','2025-03-26 12:24:11.349',0),(30,5,'El estado de la orden #13 ha cambiado a PROGRAMADA','2025-03-26 12:24:34.775',0),(31,5,'El estado de la orden #13 ha cambiado a EN_PROCESO','2025-03-26 12:24:39.513',0),(32,5,'El estado de la orden #13 ha cambiado a COMPLETADA','2025-03-26 12:24:42.063',0),(33,5,'Nueva orden creada #14','2025-03-27 02:28:06.516',0),(34,5,'El estado de la orden #14 ha cambiado a EN_PROCESO','2025-03-27 02:28:51.997',0),(35,5,'El estado de la orden #14 ha cambiado a COMPLETADA','2025-03-27 02:28:56.875',0),(36,5,'Nueva orden creada #15','2025-04-02 09:38:45.641',0),(37,5,'La orden #15 ha sido cancelada','2025-04-02 11:20:34.834',0),(38,5,'Nueva orden creada #16','2025-04-02 11:20:59.122',0),(39,5,'Nueva orden creada #17','2025-04-04 09:15:20.100',0),(40,5,'Nueva orden creada #18','2025-04-04 09:16:43.055',0),(41,5,'El estado de la orden #18 ha cambiado a EN_PROCESO','2025-04-04 09:35:40.069',0),(42,5,'El estado de la orden #18 ha cambiado a COMPLETADA','2025-04-04 09:35:44.171',0),(43,5,'La orden #20 ha sido cancelada','2025-04-07 11:19:32.110',0),(44,5,'La orden #23 ha sido cancelada','2025-04-07 11:37:32.996',0);
/*!40000 ALTER TABLE `notificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden`
--

DROP TABLE IF EXISTS `orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clienteId` int NOT NULL,
  `fecha` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `estado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `fechaProgramada` datetime(3) DEFAULT NULL,
  `tipo` enum('SERVICIO','COMPRA') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SERVICIO',
  `ventaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Orden_ventaId_key` (`ventaId`),
  KEY `Orden_clienteId_fkey` (`clienteId`),
  CONSTRAINT `Orden_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Orden_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `venta` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden`
--

LOCK TABLES `orden` WRITE;
/*!40000 ALTER TABLE `orden` DISABLE KEYS */;
INSERT INTO `orden` VALUES (18,2,'2025-04-04 09:16:43.045','COMPLETADA','','2025-04-15 09:16:00.000','SERVICIO',NULL),(25,2,'2025-04-08 09:22:02.859','PENDIENTE','Compra de productos: 1x Seagate BarraCuda - Disco duro interno de 2 TB, 1x Teclado retroiluminado de impresi├│n grande, teclado de computadora con cable USB',NULL,'COMPRA',10),(26,2,'2025-04-08 09:28:50.638','PENDIENTE','Compra de productos: 1x Seagate BarraCuda - Disco duro interno de 2 TB, 1x Teclado retroiluminado de impresi├│n grande, teclado de computadora con cable USB',NULL,'COMPRA',11);
/*!40000 ALTER TABLE `orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenservicio`
--

DROP TABLE IF EXISTS `ordenservicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordenservicio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ordenId` int NOT NULL,
  `servicioId` int NOT NULL,
  `cantidad` int NOT NULL,
  `precioUnitario` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrdenServicio_ordenId_fkey` (`ordenId`),
  KEY `OrdenServicio_servicioId_fkey` (`servicioId`),
  CONSTRAINT `OrdenServicio_ordenId_fkey` FOREIGN KEY (`ordenId`) REFERENCES `orden` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `OrdenServicio_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `servicio` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenservicio`
--

LOCK TABLES `ordenservicio` WRITE;
/*!40000 ALTER TABLE `ordenservicio` DISABLE KEYS */;
INSERT INTO `ordenservicio` VALUES (27,18,19,5,150);
/*!40000 ALTER TABLE `ordenservicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `precio` double NOT NULL,
  `imagen` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoriaId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `Producto_categoriaId_fkey` (`categoriaId`),
  CONSTRAINT `Producto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Seagate BarraCuda - Disco duro interno de 2 TB','Seagate BarraCuda - Disco duro interno de 2 TB, SATA de 3.5 pulgadas 6 Gb / s, 7200 RPM, 256 MB cach├®, 3.5 pulgadas, embalaje libre de frustraci├│n (ST2000DM008 / ST2000DMZ08)\r\n\r\nEstilo: HDD - 3.5 pulgadas\r\nCapacidad de almacenamiento digital	2 TB',100,'D:\\Tesis2.0\\public\\uploads\\productos\\1743934608047.jpg',1,'2025-04-04 12:05:00.247','2025-04-08 09:18:22.347',1),(2,'Teclado retroiluminado de impresi├│n grande, teclado de computadora con cable USB','Teclado retroiluminado de impresi├│n grande, teclado de computadora con cable USB silencioso, teclado de tama├▒o completo con LED iluminado blanco compatible para escritorio con Windows',25,'D:\\Tesis2.0\\public\\uploads\\productos\\1743935312701.jpg',3,'2025-04-06 10:28:32.733','2025-04-08 09:18:28.235',1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicio`
--

DROP TABLE IF EXISTS `servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precioBase` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `estado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVO',
  `updatedAt` datetime(3) NOT NULL,
  `tipo` enum('POR_HORA','POR_CANTIDAD') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicio`
--

LOCK TABLES `servicio` WRITE;
/*!40000 ALTER TABLE `servicio` DISABLE KEYS */;
INSERT INTO `servicio` VALUES (19,'Instalacion de equipos','Instalacion de Equipos 5514',150,'2025-03-13 16:01:57.709','ACTIVO','2025-03-20 16:21:42.017','POR_CANTIDAD'),(24,'Videoconferencias','Videoconferencias',120,'2025-03-14 11:36:57.958','ACTIVO','2025-03-14 11:36:57.958','POR_HORA'),(25,'Mantenimiento Preventivo','Mantenimiento',150,'2025-03-15 01:27:21.989','ACTIVO','2025-03-15 01:27:21.989','POR_HORA');
/*!40000 ALTER TABLE `servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productoId` int NOT NULL,
  `cantidad` int NOT NULL,
  `minimo` int NOT NULL DEFAULT '5',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Stock_productoId_key` (`productoId`),
  CONSTRAINT `Stock_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `producto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (1,1,8,5,'2025-04-04 12:05:00.247','2025-04-08 09:28:50.639'),(2,2,8,5,'2025-04-06 10:28:32.733','2025-04-08 09:28:50.640');
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajador`
--

DROP TABLE IF EXISTS `trabajador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trabajador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarioId` int NOT NULL,
  `posicion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `departamento` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Trabajador_usuarioId_key` (`usuarioId`),
  CONSTRAINT `Trabajador_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajador`
--

LOCK TABLES `trabajador` WRITE;
/*!40000 ALTER TABLE `trabajador` DISABLE KEYS */;
/*!40000 ALTER TABLE `trabajador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasena` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` enum('ADMIN','CLIENTE','TRABAJADOR') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `createdBy` int DEFAULT NULL,
  `direccion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Usuario_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Administrador','admin@example.com','$2b$10$fNAD8UwVhy0J31huk7b.W.AX5JmLcGz.0MImhW2dxRJFVGSppXZI2','ADMIN','2025-03-12 11:06:41.773','2025-03-21 10:31:19.927',NULL,'Ave Borrego. Edif 94','55237964',1),(5,'Cliente','cliente@example.com','$2b$10$fBUeE8cmbZ5iOu8Dz8ZCwuEyACJnsbHIOncpWPmiViQpG95q4BLh6','CLIENTE','2025-03-20 10:08:19.827','2025-03-20 16:20:52.908',NULL,'delegacion guane','762882',1),(6,'Cliente 2','cliente2@example.com','$2b$10$mwVp0VxgnEjnHStJSa6ut.tKZRiNNP/.NWtJXgZFoc4o80NJXnDTi','CLIENTE','2025-03-20 11:14:54.852','2025-03-20 11:14:54.852',1,'delegacion','225223',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clienteId` int NOT NULL,
  `fecha` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `total` double NOT NULL,
  `estado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDIENTE',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Venta_clienteId_fkey` (`clienteId`),
  CONSTRAINT `Venta_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (4,2,'2025-04-06 13:05:15.959',25,'PENDIENTE','2025-04-06 13:05:15.959','2025-04-06 13:05:15.959'),(5,2,'2025-04-07 08:53:30.821',25,'PENDIENTE','2025-04-07 08:53:30.821','2025-04-07 08:53:30.821'),(6,2,'2025-04-07 11:19:18.923',100,'PENDIENTE','2025-04-07 11:19:18.923','2025-04-07 11:19:18.923'),(7,2,'2025-04-07 11:19:42.457',25,'PENDIENTE','2025-04-07 11:19:42.457','2025-04-07 11:19:42.457'),(8,2,'2025-04-07 11:26:42.525',125,'PENDIENTE','2025-04-07 11:26:42.525','2025-04-07 11:26:42.525'),(9,2,'2025-04-07 11:37:57.216',125,'PENDIENTE','2025-04-07 11:37:57.216','2025-04-07 11:37:57.216'),(10,2,'2025-04-08 09:22:02.854',125,'PENDIENTE','2025-04-08 09:22:02.854','2025-04-08 09:22:02.854'),(11,2,'2025-04-08 09:28:50.634',125,'PENDIENTE','2025-04-08 09:28:50.634','2025-04-08 09:28:50.634');
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-08  2:29:19
