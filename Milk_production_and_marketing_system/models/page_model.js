const db = require('./connection_db');
module.exports = {
    unsubPage: function(){
        return new Promise((resolve, reject) => {
            db.query(`SELECT cust_id,name,email,cumulative_month FROM customer,order_details 
            where cust_id=csutomer_id and reorder_or_not="no";
            SELECT month_coupon_id,season_coupon_id,half_coupon_id,year_coupon_id FROM settings
            where settings_id = 2`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows);
            })
        })
    },
    ratePage: function(){
        return new Promise((resolve, reject) => {
            //settings_id = 1 for coupon
            db.query(`SELECT survive_rate,keep_rate FROM settings where settings_id = 1;`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                    }
                resolve(rows[0])
            })
        })
    },
    couponPage: function(){
        return new Promise((resolve, reject) => {
            //settings_id = 2 for coupon
            db.query(`SELECT month_coupon_id,season_coupon_id,half_coupon_id,year_coupon_id 
            FROM settings where settings_id = 2;`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                    }
                resolve(rows[0])
            })
        })
    }
}