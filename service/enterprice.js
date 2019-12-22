const mysql = require('mysql');
const config = require('../data/config')
var pool  = mysql.createPool({
    host     : config.database.HOST,
    prot     : config.prot,
    user     : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASE
});
let enterpriceServices = {
    query: function (sql, values="") {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    }, 
    findUserData: function (obj) { 
        let _sql = `select * from enterprice where enname=(?)  and  enpass=(?);`
        return enterpriceServices.query(_sql,obj)
    },
    // 判断可不可以发布
    selectStatus: function (obj) { 
        let _sql = `select * from enterprice where enterstatus=1  and  enname=(?);`
        return enterpriceServices.query(_sql,obj)
    },
    // 企业招聘信息
    findAllManageInfo: (obj) => {
        let _sql = "select * from enterpriceInfo where pid=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    findAllManageInfoSpec: (obj) => {
        let _sql = "select * from enterpriceInfo where id=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    removeRecruInfo: (obj) => {
        let _sql = "delete from enterpriceInfo where id=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    // 企业详细情况
    showInfoDetail: (obj) => {
        let _sql = "delete from enterpriceInfo where pid=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    UpdateUser: (obj) => {
        let _sql = "update user set password=(?) where username=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    logonUser: (obj) => {
        let _sql = "insert into enterprice(enname,enpass,enterpricename,enterstatus) values (?,?,?,?);"
        return enterpriceServices.query(_sql, obj)
    },
    enterpriceInfo: (obj) => {
        let _sql = "update enterprice set boos=(?),address=(?),enwelfare=(?),enterpriceSize=(?),enterstatus=(?) where enname=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    enterpricerecruit: (obj) => {
        let _sql = "insert into enterpriceInfo(pid,recruititle,describes,works,worksqualify,enterpriceSim,schoolqualify,salary) values(?,?,?,?,?,?,?,?)"
        return enterpriceServices.query(_sql, obj)
    },
    // 查找企业状态
    findEnterStatus: function (obj) { 
        let _sql = `select enterstatus from enterprice where  enname=(?);`
        return enterpriceServices.query(_sql,obj)
    },
    // 邮箱
    findUserAllData: (obj) => {
        let _sql = "select username,school,userstatus,realname,age,address,subject,email from user where id=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    findSomeInfo: (obj) => {
        let _sql = "select id,enterstatus from enterprice where enname=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    findSomeUserInfo: (obj) => {
        let _sql = "select * from enterpriceEmail where pid=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    removeEnEmail: (obj) => {
        let _sql = "delete from enterpriceEmail where id=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    // 查找企业招聘信息
    findEnterpid: (obj) => {
        let _sql = "select * from enterpriceInfo where pid=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    // 回复邮箱
    findSoInfo: (obj) => {
        let _sql = "select id from user where username=(?);"
        return enterpriceServices.query(_sql, obj)
    },
    sendUserMess: (obj) => {
        let _sql = "insert into useremail(pid,enname,content,recruittile) values (?,?,?,?)"
        return enterpriceServices.query(_sql, obj)
    },
}
module.exports = enterpriceServices;