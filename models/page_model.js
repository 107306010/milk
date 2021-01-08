const db = require('./connection_db');
const ing_cal = require('./ingredient_calculation');
module.exports = {
    //query all needed data()
    ingredientPage: function () {
        return new Promise((resolve, reject) => {
            db.query(`select quantity from material_storage where material_id=11;
            select quantity from material_storage where material_id=41;
            select quantity from material_storage where material_id=51;
            select SUM(quantity) AS year_demand from order_record  group by YEAR(order_time),product_id ;
            select carry_cost from material where product_id<>0 group by product_id order by product_id ASC;
            select order_cost from material where product_id<>0 group by product_id order by product_id ASC;
            select SUM(quantity) as season_demand  from order_record where product_id=1 group by MONTH(order_time) order by order_time DESC limit 4;
            select SUM(quantity) as season_demand  from order_record where product_id=2 group by MONTH(order_time) order by order_time DESC limit 4;
            select expiration_date from material_storage where material_id=11 ;
            select lead_time from supplier  order by material_id;
            select SUM(quantity) as month_demand from order_record  where product_id=1 group by MONTH(order_time) order by order_time DESC limit 1;
            select SUM(quantity) as month_demand from order_record  where product_id=2 group by MONTH(order_time) order by order_time DESC limit 1;
            select safety_stock_rate from material_storage order by material_id;`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                resolve(ing_cal(JSON.parse(JSON.stringify(rows))));

            })
        })
    },//query email setting
    ingredientSettingPage: function () {
        return new Promise((resolve, reject) => {
            db.query(`select setting_data from material_setting where type_id=1;
            select email from email_user order by email ASC;
            select repeat_or_not from email_user order by user_id ASC;
            select already_send from email_user order by user_id ASC;
            select count(email) as number from email_user order by user_id ASC;`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(JSON.parse(JSON.stringify(rows)));

            })
        })
    }, unsubPage: function () {
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
    ratePage: function () {
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
    couponPage: function () {
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
    },
    // 累積點數
    pointPage: function () {
        return new Promise((resolve, reject) => {
            // 不太知道要select什麼
            db.query(`SELECT points,dollars
            FROM point where id = 1;`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows[0])
            })
        })
    },
    // 單次訂購
    singlesubPage: function () {
        return new Promise((resolve, reject) => {
            db.query(`SELECT cust_id,name,email FROM customer,order_details 
            where cust_id=csutomer_id and single_or_not="yes";`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows);
            })
        })
    },
    cuspointPage: function () {
        return new Promise((resolve, reject) => {
            db.query(`SELECT cust_id,name,cumulative_points FROM customer,order_details 
            where cust_id=csutomer_id;`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(JSON.parse(JSON.stringify(rows)));
            })
        })
    },
    getCuspoint: function () {
        return new Promise((resolve, reject) => {
            db.query(`select points,dollars from point;`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(JSON.parse(JSON.stringify(rows)));
            })
        })
    }

}
