const db = require('./connection_db');
const sta = require('./statistic')
module.exports = {
    rateSettings : function(value){
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
    }
}