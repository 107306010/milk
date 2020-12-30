const express = require('express');
const router = express.Router();

const get = require('../controllers/page_controller');
const service = require('../controllers/service_controller');

router.route("/rateSetting")
    .get(get.getRateSettingPage)
    .post(service.postRateSetting);
router.route("/statistic")
    .get(get.getStatisticPage)
    .post(service.getStatistics)
router.route("/couponSetting")
    .get(get.getCouponSettingPage)
    .post(service.postCouponSetting)
router.route("/unsub")
    .get(get.getUnsubPage)
    .post(service.sendEmails)    
module.exports = router;
