function classifyMonth(rows,list) {
    rows.forEach((val, index) => {
        if (val.last_buying_time.includes('/1/')) {
                            
            list[0]++
            
        }
        
        else if (val.last_buying_time.includes('/2/')) {
            
            list[1]++
            
        }
            
        else if (val.last_buying_time.includes('/3/')) {
            
            list[2]++
            
        }
            
        else if (val.last_buying_time.includes('/4/')) {
            
            list[3]++
            
        }
            
        else if (val.last_buying_time.includes('/5/')) {
            
            list[4]++
            
        }
            
        else if (val.last_buying_time.includes('/6/')) {
            
            list[5]++
            
        }
            
        else if (val.last_buying_time.includes('/7/')) {
            
            list[6]++
            
        }
            
        else if (val.last_buying_time.includes('/8/')) {
            
            list[7]++
            
        }
            
        else if (val.last_buying_time.includes('/9/')) {
            
            list[8]++
            
        }
            
        else if (val.last_buying_time.includes('/10/')) {
            
            list[9]++
            
        }
            
        else if (val.last_buying_time.includes('/11/')) {
            
            list[10]++
            
        }
            
        else {
            
            list[11]++
            
        }
    })
}
function countLoseRate(loseRate,notreorderlist,totalNum) {
    const r = notreorderlist
    notreorderlist.forEach((item, index) => {
                            
        if (index != 0) {
                                
            loseRate.push((r[index] / (totalNum - notreorderlist[index - 1])).toFixed(2))
                
            notreorderlist[index] = notreorderlist[index - 1] + item
                
        } else {
                
            loseRate.push((r[index] / totalNum).toFixed(2))
                
        }
                            
    })
        
}
function sta(rows) {
    // 1~12月中再訂購人數
    let reorderlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // 1~12月中不再訂購人數
    let notreorderlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // 去年1~12月中再訂購人數 
    let prevreorderlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // 去年1~12月中不再訂購人數
    let prevnotreorderlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    classifyMonth(rows[0],reorderlist)    
    
    classifyMonth(rows[1],notreorderlist)
    //如果前一年有資料
    if (rows[2].length != 0) {
        classifyMonth(rows[2],prevreorderlist)
    }
    
    if (rows[3].length != 0) {
        classifyMonth(rows[3],prevnotreorderlist)
    }

    if (rows[2].length != 0) {
        var totalNum = rows[0].length + rows[1].length
        var prevtotalNum = rows[2].length + rows[3].length
        //count this year rate
        var loseRate = []
        countLoseRate(loseRate,notreorderlist,totalNum)
    
        var keepRate = loseRate.map(item =>
                            
            (1 - item).toFixed(2)    
            
        )
        
        var surviveRate = notreorderlist.map(item => 
                            
            ((totalNum - item) / totalNum).toFixed(2)
            
        )
        //count prev year rate
        var prevloseRate = []
        countLoseRate(prevloseRate,prevnotreorderlist,prevtotalNum)
        
        var prevkeepRate = prevloseRate.map(item =>
                            
            (1 - item).toFixed(2)    
            
        )
        
        // var prevsurviveRate = prevnotreorderlist.map(item => 
                            
        //     ((prevtotalNum - item) / prevtotalNum).toFixed(2)
            
        //)
    //前一年沒資料    
    } else {
        var totalNum = rows[0].length + rows[1].length
        //count this year rate
        var loseRate = []
        
        countLoseRate(loseRate,notreorderlist,totalNum)
        
        var keepRate = loseRate.map(item =>
                            
            (1 - item).toFixed(2)    
            
        )
        
        var surviveRate = notreorderlist.map(item => 
                            
            ((totalNum - item) / totalNum).toFixed(2)
            
        )
        var prevkeepRate = ["無資料", "無資料", "無資料", "無資料", "無資料", "無資料", "無資料", "無資料", "無資料", "無資料", "無資料", "無資料"]
        // var prevloseRate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // var prevsurviveRate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    }

    let settingRate = rows[4][0].keep_rate

    return [keepRate,loseRate,surviveRate,prevkeepRate,settingRate]
}

module.exports = sta