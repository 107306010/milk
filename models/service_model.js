const db = require('./connection_db');
const sta = require('./statistic');
module.exports = {
    alertDaysSettings: function (value) {
        return new Promise((resolve, reject) => {
            // 更新資料庫 提醒時間
            db.query('UPDATE material_setting SET ? WHERE type_id=1', value, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows[0]);
            })
        })
    },
    clearEmailTable: function () {
        return new Promise((resolve, reject) => {
            // 清空資料庫
            db.query('delete from email_user', function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows[0]);
            })
        })
    },
    addEmailToTable: function (value) {
        return new Promise((resolve, reject) => {
            // 新增Email
            db.query('insert into email_user (email) values (?);', value, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows[0]);
            })
        })
    },
    checkAccount: function (value) {
        return new Promise((resolve, reject) => {
            // 登入
            db.query(`select * from employee where type_id=${value.type_id} and employee_account='${value.employee_account}' and employee_password='${value.employee_password}';`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(JSON.parse(JSON.stringify(rows)));
            })
        })
    }, rateSettings: function (value) {
        return new Promise((resolve, reject) => {
            // 更新資料庫 settings_id = 1 for 存活留存率
            db.query('UPDATE settings SET ? WHERE settings_id=1', value, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows[0]);
            })
        })
    },
    statistics: function (value) {
        return new Promise((resolve, reject) => {
            // 取得統計資料
            db.query(`SELECT * FROM order_details WHERE reorder_or_not="yes" and last_buying_time LIKE "${value.year}%";
                SELECT * FROM order_details WHERE reorder_or_not="no" and last_buying_time LIKE "${value.year}%";
                SELECT * FROM order_details WHERE reorder_or_not="yes" and last_buying_time LIKE "${value.year - 1}%";
            SELECT * FROM order_details WHERE reorder_or_not="no" and last_buying_time LIKE "${value.year - 1}%";
            SELECT keep_rate FROM settings where settings_id = 1;`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                //rows[0] 查詢年 有續訂
                //rows[1] 查詢年 沒續訂
                //rows[2] 查詢年-1 有續訂
                //rows[3] 查詢年-1 沒續訂
                //rows[4] 設定值
                resolve(sta(rows));
                console.log(rows)
            })
        })
    },
    couponSettings: function (value) {
        return new Promise((resolve, reject) => {
            // 更新資料庫 settings_id = 2 for coupon
            db.query('UPDATE settings SET ? WHERE settings_id=2', value, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows[0]);
            })
        })
    },
    pointSettings: function (value) {
        return new Promise((resolve, reject) => {
            // 更新資料庫 settings_id = 2 for coupon\
            //cumulative_points怎麼設定
            db.query('UPDATE point SET ? WHERE id=1', value, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows[0]);
            })
        })
    },
    // table: order_for_month
    // 拿到 預測訂購(月) (還沒除選幾年)   >>>   最後要/4 變成預測訂購(週)
    totalRequired: function (value) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT sum(quantity)/(${value.select_duringYears}*4) as predict_firstMonthOrder FROM order_for_month 
            where product_id LIKE "${value.product_kind}%" and order_time LIKE '%${value.month_before}%' and order_time 
            between CAST("${value.year_before_first}%" AS DATE) and CAST("${value.year_after_first}%" AS DATE);
            SELECT sum(quantity)/(${value.select_duringYears}*4) as predict_secondMonthOrder FROM order_for_month 
            where product_id LIKE "${value.product_kind}%" and order_time LIKE '%${value.month_after}%' and order_time 
            between CAST("${value.year_before_second}%" AS DATE) and CAST("${value.year_after_second}%" AS DATE);
            SELECT sum(quantity)/4 as promised_firstMonthOrder FROM order_record 
            where product_id LIKE "${value.product_kind}%" and order_time LIKE '%${value.now_month_before}%';
            SELECT sum(quantity)/4 as promised_secondMonthOrder FROM order_record 
            where product_id LIKE "${value.product_kind}%" and order_time LIKE '%${value.now_month_after}%';
            SELECT quantity as product_storage FROM product_storage 
            where product_id LIKE "${value.product_kind}%";
            SELECT EPQ as EPQ FROM settings_for_EPQ 
            where pro_id LIKE "${value.product_kind}%";`
                , function (err, rows) {
                    if (err) {
                        console.log(err);
                        reject(rows);
                        return;
                    }
                    resolve(JSON.parse(JSON.stringify(rows)));  // >>

                })
        })
    },// table: settings_for_route
    // 更新路徑
    routeSettings: function (value) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE settings_for_route SET route="${value.customer_route}" WHERE route_id=1;`, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows);  // >>
            })
        })
    }



}
