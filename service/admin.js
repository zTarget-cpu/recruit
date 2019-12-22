const mysql = require('mysql');
const config = require('../data/config')
var pool  = mysql.createPool({
    host     : config.database.HOST,
    prot     : config.prot,
    user     : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASE
});
let adminServices = {
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
        let _sql = `select * from admin where adminname=(?)  and  password=(?);`
        return adminServices.query(_sql,obj)
    },
    findUserAllData: function (obj) { 
        let _sql = `select username,school,id from user;`
        return adminServices.query(_sql,obj)
    },
    findEnterAllData: function (obj) { 
        let _sql = `select enname,enterpricename,id from enterprice;`
        return adminServices.query(_sql,obj)
    },
    findAdAllData: function (obj) { 
        let _sql = `select id,adTitle,adtime  from advert;`
        return adminServices.query(_sql,obj)
    },
    findAdAllDataLen: function (obj) { 
        let _sql = `select count(*) as leng  from advert;`
        return adminServices.query(_sql,obj)
    },
    // 显示用户所有信息
    findUserAllInfo: function (obj) { 
        let _sql = `select username,school,realname,age,address,subject,email,userstatus  from user where id=(?);`
        return adminServices.query(_sql,obj)
    },
    // 查找部分信息
    findEnterSomeInfo: function (obj) { 
        let _sql = `select enname,enterpricename,address,enwelfare,boos,enterpriceSize,enterstatus  from enterprice where id=(?);`
        return adminServices.query(_sql,obj)
    },
    // 删除用户操作
    deleteUserId:  function (obj) { 
        let _sql = `select id  from user where username=(?);`
        return adminServices.query(_sql,obj)
    },
    // 查找所有广告信息
    findAdAllInfo: function (obj) { 
        let _sql = `select * from advert where id=(?);`
        return adminServices.query(_sql,obj)
    },
    deleteUserEmData:  function (obj) { 
        let _sql = `delete from goodword where pid=(?)`
        return adminServices.query(_sql,obj)
    },
    deleteUserWordData:  function (obj) { 
        let _sql = `delete from useremail where pid=(?)`
        return adminServices.query(_sql,obj)
    },
    deleteUserData:  function (obj) { 
        let _sql = `delete from user where username=(?)`
        return adminServices.query(_sql,obj)
    },



    // 删除企业操作
    deleteEnterId:  function (obj) { 
        let _sql = `select id  from enterprice where enname=(?);`
        return adminServices.query(_sql,obj)
    },
    deleteEnterEm:  function (obj) { 
        let _sql = `delete from enterpriceemail where pid=(?)`
        return adminServices.query(_sql,obj)
    },
    deleteEnterInfo:  function (obj) { 
        let _sql = `delete from enterpriceInfo where pid=(?)`
        return adminServices.query(_sql,obj)
    },
    deleteEnterData:  function (obj) { 
        let _sql = `delete from enterprice where enname=(?)`
        return adminServices.query(_sql,obj)
    },




    deleteAdData:  function (obj) { 
        let _sql = `delete from advert where id=(?)`
        return adminServices.query(_sql,obj)
    },
    insertad:  function (obj) { 
        let _sql = `insert into advert(adTitle,adSource,adtime,adContent) values (?,?,?,?);`
        return adminServices.query(_sql,obj)
    },
}
module.exports = adminServices;