-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 14, 2025 lúc 01:01 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `meta_ads`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ads`
--

CREATE TABLE `ads` (
  `id` int(11) NOT NULL,
  `ad_set_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `ad` varchar(255) NOT NULL,
  `adSetName` varchar(255) DEFAULT NULL,
  `deliveryStatus` enum('Active','Off') NOT NULL,
  `deliveryDescription` text DEFAULT NULL,
  `bidStrategycost` varchar(255) DEFAULT NULL,
  `bidStrategyDescription` text DEFAULT NULL,
  `budgetCost` varchar(255) DEFAULT NULL,
  `budgetDescription` text DEFAULT NULL,
  `lastSignificantEdit` date DEFAULT NULL,
  `attributionSetting` varchar(255) DEFAULT NULL,
  `resultsCost` varchar(255) DEFAULT NULL,
  `resultsDescription` text DEFAULT NULL,
  `reach` varchar(255) DEFAULT NULL,
  `impressions` varchar(255) DEFAULT NULL,
  `costPerResultCst` varchar(255) DEFAULT NULL,
  `costPrRsultDscription` text DEFAULT NULL,
  `qualityRankingTitle` enum('Average','Above average','Below average') DEFAULT NULL,
  `qualityRankingRescription` text DEFAULT NULL,
  `engagementRteRankingTitle` enum('Average','Above average','Below average') DEFAULT NULL,
  `engagementRateRankingDescription` text DEFAULT NULL,
  `amountSpent` varchar(255) DEFAULT NULL,
  `endsOngoing` tinyint(1) NOT NULL,
  `endsDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ad_sets`
--

CREATE TABLE `ad_sets` (
  `id` int(11) NOT NULL,
  `campaign_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `adSet` varchar(255) NOT NULL,
  `deliveryStatus` enum('Active','Off') NOT NULL,
  `deliveryDescription` text DEFAULT NULL,
  `bidStrategyCost` varchar(255) DEFAULT NULL,
  `bidStrategyDescription` text DEFAULT NULL,
  `lastSignificantEdit` date DEFAULT NULL,
  `attributionSetting` varchar(255) DEFAULT NULL,
  `resultsCost` varchar(255) DEFAULT NULL,
  `resultsDescription` text DEFAULT NULL,
  `reach` varchar(255) DEFAULT NULL,
  `impressions` varchar(255) DEFAULT NULL,
  `costPerResultCost` varchar(255) DEFAULT NULL,
  `costPerResultDescription` text DEFAULT NULL,
  `amountSpent` varchar(255) DEFAULT NULL,
  `endsOngoing` tinyint(1) NOT NULL,
  `endsDate` date DEFAULT NULL,
  `scheduleFrom` date DEFAULT NULL,
  `scheduleTo` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `business`
--

CREATE TABLE `business` (
  `id` int(10) NOT NULL,
  `accountName` varchar(255) NOT NULL,
  `reach` varchar(255) NOT NULL,
  `impressions` varchar(255) NOT NULL,
  `frequency` varchar(255) NOT NULL,
  `amountSpent` varchar(255) NOT NULL,
  `attributionSetting` varchar(255) NOT NULL,
  `messaginConversationStarted` varchar(255) NOT NULL,
  `CostPerMessagingConversationStarted` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `business`
--

INSERT INTO `business` (`id`, `accountName`, `reach`, `impressions`, `frequency`, `amountSpent`, `attributionSetting`, `messaginConversationStarted`, `CostPerMessagingConversationStarted`) VALUES
(2, 'Test', '100', '4500', '1.5', '150000', 'Multiple attribution settings', '95', '16000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `campaigns`
--

CREATE TABLE `campaigns` (
  `id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `campaign` varchar(255) NOT NULL,
  `deliveryStatus` enum('Active','Off') NOT NULL,
  `deliveryDescription` text DEFAULT NULL,
  `bidStrategy` enum('highest volume','Using ad set bid strategy') NOT NULL,
  `budgetCost` varchar(255) DEFAULT NULL,
  `budgetDescription` text DEFAULT NULL,
  `attributionSetting` varchar(255) DEFAULT NULL,
  `resultsCost` varchar(255) DEFAULT NULL,
  `resultsDescription` text DEFAULT NULL,
  `reach` varchar(255) DEFAULT NULL,
  `impressions` varchar(255) DEFAULT NULL,
  `costPerResultCost` varchar(255) DEFAULT NULL,
  `costPerResultDescription` text DEFAULT NULL,
  `amountSpent` varchar(255) DEFAULT NULL,
  `endsOngoing` tinyint(1) NOT NULL,
  `endsDate` date DEFAULT NULL,
  `business_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `campaigns`
--

INSERT INTO `campaigns` (`id`, `status`, `campaign`, `deliveryStatus`, `deliveryDescription`, `bidStrategy`, `budgetCost`, `budgetDescription`, `attributionSetting`, `resultsCost`, `resultsDescription`, `reach`, `impressions`, `costPerResultCost`, `costPerResultDescription`, `amountSpent`, `endsOngoing`, `endsDate`, `business_id`) VALUES
(1, 1, 'Campaigns test', 'Active', '1 recommendation', 'highest volume', '150000', 'Daily', '7-day click or 1-day view', '22', 'Messaging conversations started', '5000', '11000', '16000', 'Per post engagement', '300000', 1, NULL, 2),
(2, 0, 'Campaigns test1', 'Active', '1 recommendation', 'highest volume', '150000', 'Daily', '7-day click or 1-day view', '22', 'Messaging conversations started', '5000', '11000', '16000', 'Per post engagement', '300000', 0, NULL, 2),
(3, 0, 'Campaigns test1', 'Active', '1 recommendation', 'highest volume', '150000', 'Daily', '7-day click or 1-day view', '22', 'Messaging conversations started', '5000', '11000', '16000', 'Per post engagement', '300000', 0, NULL, 2),
(4, 0, 'Campaigns test1', 'Active', '1 recommendation', 'highest volume', '150000', 'Daily', '7-day click or 1-day view', '22', 'Messaging conversations started', '5000', '11000', '16000', 'Per post engagement', '300000', 0, '2025-04-13', 2);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ad_set_id` (`ad_set_id`);

--
-- Chỉ mục cho bảng `ad_sets`
--
ALTER TABLE `ad_sets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campaign_id` (`campaign_id`);

--
-- Chỉ mục cho bảng `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_campaigns_business` (`business_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `ad_sets`
--
ALTER TABLE `ad_sets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `business`
--
ALTER TABLE `business`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `ads`
--
ALTER TABLE `ads`
  ADD CONSTRAINT `ads_ibfk_1` FOREIGN KEY (`ad_set_id`) REFERENCES `ad_sets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `ad_sets`
--
ALTER TABLE `ad_sets`
  ADD CONSTRAINT `ad_sets_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `campaigns`
--
ALTER TABLE `campaigns`
  ADD CONSTRAINT `fk_campaigns_business` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
