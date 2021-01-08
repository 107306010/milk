const service = require('../models/service_model');
const createEmail = require('../models/create_email');
const page = require('../models/page_model');
const send = require('../models/send_email');
const mailservice2 = require('./email_2');
const mailservice = require('./email.js');
const cal_storage = require('./calculate_storage.js');
var milkData = []; var bottle_homeData = []; var bottle_250mlData = [];
module.exports = {
    postSendEmail: function (req, res, next) {
        page.ingredientPage().then(result => {
            milkData = result[0];
            bottle_homeData = result[1];
            bottle_250mlData = result[2];
            const email = {
                email: req.body.email,
                milkStorage: milkData[0],
                millkOrderAmount: milkData[1],
                millkOrderDate: milkData[2],
                homeBottleStorage: bottle_homeData[0],
                homeBottleOrderAmount: bottle_homeData[1],
                homeBottleOrderDate: bottle_homeData[2],
                _250mlBottleStorage: bottle_250mlData[0],
                _250mlBottleOrderAmount: bottle_250mlData[1],
                _250mlBottleorderDate: bottle_250mlData[2],

            };
            var alert = [];
            alert = createEmail.send(email, res);
        })
        //refresh page
        page.ingredientPage().then(result => {
            res.render('ingredient', {
                milk: result[0],
                bottle_home: result[1],
                bottle_250ml: result[2],
                // alert: alert[0],
                // alertText: alert[1]

            })
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })

        })

    },
    //物料設定頁面
    postIngredientSetting: function (req, res, next) {
        const alertDays = {
            setting_data: req.body.alertDays
        }
        const emailSetting = {
            email: req.body.email
            // repeat_or_not: req.body.repeat_or_not
        }


        service.alertDaysSettings(alertDays).then(result => {
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })

        service.clearEmailTable().then(result => {
            if (typeof req.body.email == 'undefined') {
                return res.redirect("/save_success");
            } else {
                //加迴圈有幾個就跑幾次
                for (var a = 0; a < req.body.email.length; a++) {
                    var emailLength = req.body.email.length;
                    if (!Array.isArray(req.body.email)) {
                        service.addEmailToTable(req.body.email).then(result => {
                            res.redirect("/save_success");
                            send();
                            return;

                        }, (err) => {
                            console.log(err)
                            res.json({
                                result: err
                            })
                        })
                        break;
                    } else {
                        service.addEmailToTable(req.body.email[a]).then(result => {
                            if (a > emailLength - 2) {
                                console.log("plpl");
                                res.redirect("/save_success");
                                send();
                                return;
                            }
                        }, (err) => {
                            console.log(err)
                            res.json({
                                result: err
                            })
                        })
                    }
                }
            }
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })

    },
    postLogIn: function (req, res, next) {

        var typeId = req.body.type_id;
        var account = {
            type_id: req.body.type_id,
            employee_account: req.body.account,
            employee_password: req.body.password
        };

        service.checkAccount(account).then(result => {
            if (result.length == 0 && typeId == 1) {
                res.render('marketing_log_in', {
                    alert: "帳號或密碼輸入錯誤，請重新輸入"
                })
            } else if (result.length == 0 && typeId == 2) {
                res.render('production_log_in', {
                    alert: "帳號或密碼輸入錯誤，請重新輸入"
                })
            } else {
                if (typeId == 1) {
                    res.redirect("/marketing_home");
                } else if (typeId == 2) {
                    res.redirect("/production_home");
                }
            }


        })
    }, postRateSetting: function (req, res, next) {
        const settingsValue = {
            keep_rate: req.body.keepRate,
            survive_rate: req.body.surviveRate
        }
        service.rateSettings(settingsValue).then(result => {

            res.redirect('rateSetting');

        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    postCouponSetting: function (req, res, next) {
        const settingsValue = {
            month_coupon_id: req.body.month,
            season_coupon_id: req.body.season,
            half_coupon_id: req.body.half,
            year_coupon_id: req.body.year
        }
        service.couponSettings(settingsValue).then(result => {
            res.redirect('couponSetting');
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    getStatistics: function (req, res, next) {
        const yearvalue = {
            year: req.body.year
        }
        service.statistics(yearvalue).then(result => {
            res.render('statistic', {
                keepRate: result[0],
                loseRate: result[1],
                surviveRate: result[2],
                prevkeepRate: result[3],
                settingRate: result[4],
                year: yearvalue.year,
                table: true
            })
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    sendEmails: function (req, res, next) {
        //store in array emails=>data[0], coupon=>data[1] 
        var data = Object.values(req.body)
        //data[[....],[....]]

        //send emails and render page
        mailservice(data, res)
    }, pointSetting: function (req, res, next) {
        const settingsValue = {
            points: req.body.point,
            dollars: req.body.discount
        }
        service.pointSettings(settingsValue).then(result => {
            res.redirect('pointSetting');
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    sendEmails2: function (req, res, next) {

        try {
            //store in array emails=>data[0], coupon=>data[1] 
            var data = Object.values(req.body)
            //data[[....],[....]]
            console.log(data[0])
            //send emails and render page
            mailservice2(data[0], res)

        } catch (error) {

        }
    }, getTotalRequired: function (req, res, next) {
        const dateObject = new Date()
        const month = dateObject.getMonth() + 1;
        const epqValue = {
            product_kind: req.body.product,
            select_duringYears: req.body.year_after - req.body.year_before + 1,
            now_month_before: dateObject.getFullYear() + '-' + dateObject.getMonth() + 1,
            now_month_after: dateObject.getFullYear() + '-' + dateObject.getMonth() + 2,
            month_before: '-' + dateObject.getMonth() + 1 + '-01',
            month_after: '-' + dateObject.getMonth() + 2 + '-01',
            year_before_first: req.body.year_before + '-' + dateObject.getMonth() + 1 + '-01',
            year_before_second: req.body.year_before + '-' + dateObject.getMonth() + 2 + '-01',
            year_after_first: req.body.year_after + '-' + dateObject.getMonth() + 1 + '-01',
            year_after_second: req.body.year_after + '-' + dateObject.getMonth() + 2 + '-01'
        }
        service.totalRequired(epqValue).then(result => {
            //res.redirect('/epq');
            var list = [];
            list = cal_storage.calculate_storage(result);
            console.log(result);
            res.render('epq', {
                predict_firstMonthOrder: result[0][0].predict_firstMonthOrder,
                predict_secondMonthOrder: result[1][0].predict_secondMonthOrder,
                promised_firstMonthOrder: result[2][0].promised_firstMonthOrder,
                promised_secondMonthOrder: result[3][0].promised_secondMonthOrder,
                product_storage: result[4][0].product_storage,
                EPQ: result[5][0].EPQ,
                month: month,
                List: list,
                table: true
            })
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    }






}
