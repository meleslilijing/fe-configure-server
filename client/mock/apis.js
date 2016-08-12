var express = require('express');
var router = express.Router();

router.get('/miuser/info', function(req, res, next) {
	var sample = {
		"rtnCode": 0,
		"rtnMsg": "OK!",
		"data": {
			"cols": ["phone_number", "balance", "current_month_consumption", "current_total_calls_time", "current_traffic_amount", "consumption_rate", "business_code", "business_name", "status", "mno_code", "show_number_price", "order_packages", "current_traffic_amount_exclude_package", "op_status", "province_name", "city_name", "create_card_time", "activate_time", "withraw_applied", "balance_main"],
			"miid": "447162133",
			"bind_card": 0,
			"total": 42,
			"data": [
				["17088741514", 1000000, 0, 0, 0, 0, "X003", "任我行", 0, "CU", 500000, [], 0, 1, "广东", "江门", 1465872261920, 0, 0, 1000000, 1000, 0, -1, 1465056000000, 10000000, 1000000, 1469203200000, 1470294087958],
				["17186391574", 0, 0, 0, 0, 0, "X004", "任我行", 0, "CU", -1, [], 0, 1, "江苏", "苏州", 1467342106671, 0, 0, 0, 1, 1, -1, 1467342106669, 0, 1000000, 0, 1470294087996],
				["17184629934", 500000, 0, 0, 0, 0, "X004", "任我行", 0, "CU", -1, [], 0, 0, "河南", "洛阳", 1468386940421, 0, 0, 500000, 1000, 1, -1, 1468386940419, 500000, 1000000, 0, 1470294088034],
				["17012340594", 100000, 0, 0, 0, 0, "X102", "吃到饱", 0, "CT", -1, [], 0, 0, "浙江", "杭州", 1468821408272, 0, 0, 100000, 0, 1, -1, 1468821408269, 100000, 1000000, 0, 1470294088076],
				["17183461643", 10000000, 0, 0, 0, 0, "X004", "任我行", 0, "CU", -1, [], 0, 0, "江苏", "南京", 1470014276842, 0, 0, 10000000, 0, 0, -1, 0, 10000000, 1000000, 0, 1470294088119],
				["17090310514", -923728, 500000, 0, 0, 1, "X003", "任我行", 10, "CU", 500000, [], 0, 0, "北京", "北京市", 1441509750237, 1441509861790, 0, -923728, 0, 0, -1, 0, 0, 0, 0, 1470294088189],
				["17196322514", 459229, 0, 0, 0, 0, "X004", "任我行", 10, "CU", -1, [], 0, 0, "江苏", "南通", 1452762179678, 1452762189369, 0, 459229, 0, 0, -1, 0, 0, 0, 0, 1470294088228],
				["17187522514", 321485, 0, 0, 0, 0, "X004", "任我行", 10, "CU", -1, [], 0, 0, "广东", "惠州", 1453271564709, 1453359971780, 0, 321485, 0, 0, -1, 0, 0, 0, 0, 1470294088263],
				["17193401524", 941008, 0, 0, 0, 0, "X004", "任我行", 10, "CU", -1, [], 0, 0, "江苏", "徐州", 1453876054240, 1453877654276, 0, 941008, 0, 0, -1, 0, 0, 0, 0, 1470294088306],
				["17186451524", 962765, 0, 0, 0, 0, "X004", "任我行", 10, "CU", -1, [], 0, 0, "江苏", "无锡", 1453876231847, 1453877598802, 0, 962765, 0, 0, -1, 0, 0, 0, 0, 1470294088342],
				["17180131524", 888547, 0, 0, 0, 0, "X004", "任我行", 10, "CU", -1, [], 0, 0, "北京", "北京市", 1453881301395, 1453881443997, 0, 888547, 0, 0, -1, 0, 0, 0, 0, 1470294088382],
				["17186781524", 944923, 0, 0, 0, 0, "X004", "任我行", 10, "CU", -1, [], 0, 0, "山东", "青岛", 1453881486484, 1453882651254, 0, 944923, 0, 0, -1, 0, 0, 0, 0, 1470294088422],
				["17186761524", 943419, 0, 0, 0, 0, "X004", "任我行", 10, "CU", -1, [], 0, 0, "山东", "青岛", 1453881569503, 1453882663444, 0, 943419, 0, 0, -1, 0, 0, 0, 0, 1470294088460],
				["17197671524", 954317, 0, 0, 0, 0, "X004", "任我行", 10, "CU", -1, [], 0, 0, "广东", "珠海", 1453884240633, 1453885480450, 0, 954317, 0, 0, -1, 0, 0, 0, 0, 1470294088500]
			],
			"server_status": 0
		}
	};
	res.json(sample);
});

// router.post('/xxx', function(req, res, next) {
//
// })

module.exports = router;