const service = require('../models/service_model');
const mailservice = require('./email')

module.exports = {
    postRateSetting : function(req, res, next){
        const settingsValue = {
            keep_rate : req.body.keepRate,
            survive_rate : req.body.surviveRate
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
    postCouponSetting : function(req, res, next){
        const settingsValue = {
            month_coupon_id : req.body.month,
            season_coupon_id: req.body.season,
            half_coupon_id: req.body.half,
            year_coupon_id: req.body.year
        }
        service.couponSettings(settingsValue).then(result =>{
            res.redirect('couponSetting');
        },(err) =>{
            console.log(err)
            res.json({
                result: err
            })
        })
    },
    getStatistics: function (req, res, next) {
        const yearvalue = {
            year : req.body.year
        }
        service.statistics(yearvalue).then(result =>{
            res.render('statistic', {
                keepRate : result[0],
                loseRate : result[1],
                surviveRate: result[2],
                prevkeepRate: result[3],
                settingRate:result[4],
                year : yearvalue.year,
                table : true
            })
        },(err) =>{
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
        mailservice(data,res)
    }

}