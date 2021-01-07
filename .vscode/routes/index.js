var express = require('express');
var router = express.Router();

const get = require('../controllers/page_controller');
const service = require('../controllers/service_controller');

router.route("/ingredient")
  .get(get.getIngredientPage)
  .post(service.postSendEmail);

router.route("/ingredientSetting")
  .get(get.getIngredientSettingPage)
  .post(service.postIngredientSetting);

router.route("/marketing_log_in")
  .get(get.getMarketingLogIn)
  .post(service.postLogIn);
router.route("/production_log_in")
  .get(get.getProductionLogIn)
  .post(service.postLogIn);
router.route("/marketing_home")
  .get(get.getMarketingHome)
router.route("/production_home")
  .get(get.getProductionHome)
router.route("/save_success")
  .get(get.getSaveSuccess)
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
router.route("/pointSetting")
  .get(get.getPointSettingPage)
  .post(service.pointSetting)
router.route("/sinsub")
  .get(get.getSinglesubPage)
  .post(service.sendEmails2)
router.route("/")
  .get(get.getIndex)
router.route("/identity")
  .get(get.getIdentity)
router.route("/EPQ")
  .get(get.getEpqSettingPage)
  .post(service.getTotalRequired)
router.route("/custpoint")
  .get(get.getcuspointPage)


module.exports = router;
