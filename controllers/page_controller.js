const page = require('../models/page_model');
const send = require('../models/send_email');
var loadTimes = 0;
module.exports = {
    //首頁
    getIndex: function (req, res, next) {
        return res.render('index', {
        })

    },
    //選擇登入身分
    getIdentity: function (req, res, next) {
        return res.render('identity_page', {
        })

    },
    //顯示物料狀態頁面
    getIngredientPage: function (req, res, next) {
        return page.ingredientPage().then(result => {
            //當第一次載入頁面時會檢查需不需要自動寄出信件
            if (loadTimes == 0) {
                send();
            }
            res.render('ingredient', {
                milk: result[0],
                bottle_home: result[1],
                bottle_250ml: result[2],
                alert: false

            })
            loadTimes++;
            console.log(loadTimes);
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    //行銷人員登入頁面
    getMarketingLogIn: function (req, res, next) {
        return res.render('marketing_log_in', {
            alert: ''
        })

    },
    //作管人員登入頁面
    getProductionLogIn: function (req, res, next) {

        return res.render('production_log_in', {
            alert: ''
        })

    },
    //行銷人員首頁
    getMarketingHome: function (req, res, next) {
        return res.render('marketing_home', {

        })

    },
    //作管人員頁面
    getProductionHome: function (req, res, next) {
        return res.render('production_home', {
        })

    },
    //信箱儲存成功頁面
    getSaveSuccess: function (req, res, next) {
        return res.render('save_success', {
        })

    },
    //顯示物料設定頁面
    getIngredientSettingPage: function (req, res, next) {
        return page.ingredientSettingPage().then(result => {
            console.log(result[1]);
            return res.render('ingredientOrder_setting', {
                alertDays: result[0][0].setting_data,
                emails: result[1],
                repeat_or_not: result[2],
                already_send: result[3],
                emails_count: result[4][0].number
            })
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
            return;
        })
    }, getRateSettingPage: function (req, res, next) {
        page.ratePage().then(result => {
            res.render('rate_setting', {
                data: result
            })
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    getStatisticPage: function (req, res, next) {
        res.render('statistic', {
            table: false
        })
    },
    getCouponSettingPage: function (req, res, next) {
        page.couponPage().then(result => {
            res.render('coupon_setting', {
                data: result
            })
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    getUnsubPage: function (req, res, next) {
        page.unsubPage().then(result => {
            res.render('unsubscribe_cus', {
                data: result[0],
                coupon: result[1],
                success: false
            })
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    getPointSettingPage: function (req, res, next) {
        page.getCuspoint().then(result => {
            console.log(result)
            res.render('point_setting', {
                points: result[0].points,
                dollars: result[0].dollars
            })
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    getSinglesubPage: function (req, res, next) {
        page.singlesubPage().then(result => {
            //console.log(result)
            res.render('singlesubscribe_cus', {
                data: result,
            })
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    getcuspointPage: function (req, res, next) {
        page.cuspointPage().then(result => {
            var data = result;
            page.getCuspoint().then(result => {
                var point = result;
                res.render('cus_point', {
                    data: data,
                    point: point
                })
            }, (err) => {
                console.log(err)
                res.json({
                    result: err
                })
            })
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    getEpqSettingPage: function (req, res, next) {
        res.render('epq', {
            table: false
        })
    }

}
