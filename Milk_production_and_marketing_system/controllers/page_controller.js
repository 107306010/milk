const page = require('../models/page_model')
module.exports = {
    getRateSettingPage : function(req,res,next){
        page.ratePage().then(result =>{
            res.render('rate_setting', {
                data : result
            })
        },(err) =>{
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    getStatisticPage : function(req,res,next){
        res.render('statistic',{
            table : false
        })
    },
    getCouponSettingPage: function (req, res, next) {
        page.couponPage().then(result =>{
            res.render('coupon_setting', {
                data : result
            })
        },(err) =>{
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    getUnsubPage: function (req, res, next) {
        page.unsubPage().then(result =>{
            res.render('unsubscribe_cus', {
                data: result[0],
                coupon: result[1],
                success:false
            })
        },(err) =>{
            console.log(err)
            res.json({
                result: err
            })
        })
    }
}