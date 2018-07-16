-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-07-2018 a las 20:19:09
-- Versión del servidor: 10.1.29-MariaDB
-- Versión de PHP: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `calendar`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `spDel_eliminarEvento` (IN `id` INT)  BEGIN
	DELETE FROM agenda WHERE AGE_ID = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spIns_agregarEvento` (IN `texto` VARCHAR(1000), IN `dateStart` DATETIME, IN `dateEnd` DATETIME)  BEGIN
	INSERT INTO agenda (AGE_TEXT, AGE_START, AGE_END) VALUES (texto, dateStart, dateEnd);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spMod_modificarEvento` (IN `id` INT, IN `texto` VARCHAR(1000), IN `dateStart` DATETIME, IN `dateEnd` DATETIME)  BEGIN
	UPDATE agenda SET AGE_TEXT = texto, AGE_START = dateStart, AGE_END = dateEnd WHERE AGE_ID = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spRec_eventos` ()  BEGIN
	SELECT AGE_ID AS id, AGE_TEXT AS title, DATE_FORMAT(AGE_START, '%Y-%m-%dT%H:%i:%s') AS 'start', DATE_FORMAT(AGE_END, '%Y-%m-%dT%H:%i:%s') AS 'end'  FROM agenda;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda`
--

CREATE TABLE `agenda` (
  `AGE_ID` int(11) NOT NULL,
  `AGE_TEXT` varchar(1000) NOT NULL,
  `AGE_START` datetime NOT NULL,
  `AGE_END` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `agenda`
--

INSERT INTO `agenda` (`AGE_ID`, `AGE_TEXT`, `AGE_START`, `AGE_END`) VALUES
(36, 'Node 2', '2018-07-17 08:00:00', '2018-07-17 10:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`AGE_ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agenda`
--
ALTER TABLE `agenda`
  MODIFY `AGE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
