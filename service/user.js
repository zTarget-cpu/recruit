const mysql = require('mysql');
const config = require('../data/config');
const fs = require('fs');
var pool  = mysql.createPool({
    host     : config.database.HOST,
    prot     : config.prot,
    user     : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASE
});
let userServices = {
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
        let _sql = `select * from user where username=(?)  and  password=(?);`
        return userServices.query(_sql,obj)
    },
    // 显示信息
    findAllUserInfo: function (obj) { 
        let _sql = `select username,school,realname,age,address,subject,email,userstatus from user where username=(?);`
        return userServices.query(_sql,obj)
    },
    // 添加用户信息
    addUserSpecInfo: function (obj) { 
        let _sql = `update user set realname=(?),age=(?),address=(?),subject=(?),email=(?),userstatus=1 where username =(?)`
        return userServices.query(_sql,obj)
    },
    // 热门企业模块
    findEnterData: function (obj) { 
        let _sql = `select enterpricename,recruititle,boos,enterpriceSize from enterprice a,enterpriceInfo b where a.id=b.pid limit ?,4;`
        return userServices.query(_sql,obj)
    },

    // 企业 数量
    findEnLeng: function () { 
        let _sql = `select count(*) as leng from enterpriceInfo;`
        return userServices.query(_sql)
    },

    
    findAllEnterData: function (obj) { 
        let _sql = `select  enterpricename,recruititle,address,enwelfare,boos,describes, works,worksqualify,enterpriceSim,schoolqualify,salary from enterprice a,enterpriceInfo b where a.enterpricename=(?) and b.recruititle=(?) limit 0,5;`
        return userServices.query(_sql,obj)
    },
    // 企业信息分页
    findSomeEnterDatalen: function (obj) { 
        let _sql = `select  count(*) as leng from enterpriceInfo where recruititle=(?);`
        return userServices.query(_sql,obj)
    },
    // 导航栏 公司
    findAEnterData: function (obj) { 
        let _sql = `select  a.enterpricename,b.recruititle,a.address,b.enterpriceSim,b.schoolqualify,b.salary,a.enterpriceSize from enterprice a,enterpriceInfo b where a.id=b.pid limit ?,9;`
        return userServices.query(_sql,obj)
    },
    findAEnterDataLen: function () { 
        let _sql = `select  count(*) as leng from enterprice a,enterpriceInfo b where a.id=b.pid;`
        return userServices.query(_sql)
    },
    // 导航栏 职位
    findAnEnterData: function (obj) { 
        let _sql = `select  enterpricename,recruititle,address,enterpriceSim,schoolqualify,salary,enterpriceSize from enterprice a,enterpriceInfo b where a.id=b.pid limit ?,5;`
        return userServices.query(_sql,obj)
    },
    findSomeEnterData: function (obj) { 
        let _sql = `select  enterpricename,recruititle,address,enterpriceSim,schoolqualify,salary,enterpriceSize from enterprice a,enterpriceInfo b where b.recruititle=(?) and a.id=b.pid limit ?,5;`
        return userServices.query(_sql,obj)
    },
    // 广告
    findAllAdData: function (obj) { 
        let _sql = `select  * from advert limit ?,5;`
        return userServices.query(_sql,obj)
    },
    findAllAdDetailData: function (obj) { 
        let _sql = `select  * from advert where id=(?);`
        return userServices.query(_sql,obj)
    },
    findAllAdDataLen: function (obj) { 
        let _sql = `select  count(*) as leng from advert;`
        return userServices.query(_sql,obj)
    },




    logonUser: (obj) => {
        let _sql = "insert into user(username,password,school,userstatus) values (?,?,?,?);"
        return userServices.query(_sql, obj)
    },
    UpdateUser: (obj) => {
        let _sql = "update user set password=(?) where username=(?);"
        return userServices.query(_sql, obj)
    },
    insertResume: (obj) => {
        let _sql = "update user set resume=(?) where username=(?);"
        return userServices.query(_sql, obj)
    },

    // 职位 排序操作 6个..
    findRegAll: function (obj) { 
        let _sql = `select a.enterpricename,b.recruititle,a.address,b.enterpriceSim,b.schoolqualify,b.salary,a.enterpriceSize from enterprice a,enterpriceInfo b where a.id=b.pid and b.schoolqualify=(?) and b.salary>=(?) and b.salary<(?) limit ?,5;`
        return userServices.query(_sql,obj)
    },
    findRegAllLen: function (obj) { 
        let _sql = `select count(*) as leng from enterprice a,enterpriceInfo b where a.id=b.pid and b.schoolqualify=(?) and b.salary>=(?) and b.salary<(?);`
        return userServices.query(_sql,obj)
    },
    findRegSchool: function (obj) { 
        let _sql = `select a.enterpricename,b.recruititle,a.address,b.enterpriceSim,b.schoolqualify,b.salary,a.enterpriceSize from enterprice a,enterpriceInfo b where a.id=b.pid and b.schoolqualify=(?) limit ?,5;`
        return userServices.query(_sql,obj)
    },
    findRegSchoolLen: function (obj) { 
        let _sql = `select count(*) as leng from enterprice a,enterpriceInfo b where a.id=b.pid and b.schoolqualify=(?);`
        return userServices.query(_sql,obj)
    },
    findRegSalary: function (obj) { 
        let _sql = `select a.enterpricename,b.recruititle,a.address,b.enterpriceSim,b.schoolqualify,b.salary,a.enterpriceSize from enterprice a,enterpriceInfo b where a.id=b.pid and b.salary>=(?) and b.salary<(?) limit ?,5;`
        return userServices.query(_sql,obj)
    },
    findRegSalaryLen: function (obj) { 
        let _sql = `select count(*) as leng from enterprice a,enterpriceInfo b where a.id=b.pid and b.salary>=(?) and b.salary<(?);`
        return userServices.query(_sql,obj)
    },
    // 职位 有keywork 3个..
    findRegAllKey: function (obj) { 
        let _sql = `select a.enterpricename,b.recruititle,a.address,b.enterpriceSim,b.schoolqualify,b.salary,a.enterpriceSize from enterprice a,enterpriceInfo b where a.id=b.pid and b.schoolqualify=(?) and b.salary>=(?) and b.salary<(?) and  recruititle=(?) limit ?,5;`
        return userServices.query(_sql,obj)
    },
    findRegAllKeyLen: function (obj) { 
        let _sql = `select count(*) as leng from enterprice a,enterpriceInfo b where a.id=b.pid and b.schoolqualify=(?) and b.salary>=(?) and b.salary<(?) and  b.recruititle=(?);`
        return userServices.query(_sql,obj)
    },
    findRegSchoolKey: function (obj) { 
        let _sql = `select a.enterpricename,b.recruititle,a.address,b.enterpriceSim,b.schoolqualify,b.salary,a.enterpriceSize from enterprice a,enterpriceInfo b where a.id=b.pid and b.schoolqualify=(?) and  b.recruititle=(?) limit ?,5;`
        return userServices.query(_sql,obj)
    },
    findRegSchoolKeyLen: function (obj) { 
        let _sql = `select count(*) as leng from enterprice a,enterpriceInfo b where b.schoolqualify=(?) and  b.recruititle=(?);`
        return userServices.query(_sql,obj)
    },
    findRegSalaryKey: function (obj) { 
        let _sql = `select a.enterpricename,b.recruititle,a.address,b.enterpriceSim,b.schoolqualify,b.salary,a.enterpriceSize from enterprice a,enterpriceInfo b where a.id=b.pid and b.salary>=(?) and b.salary<(?) and  b.recruititle=(?) limit ?,5;`
        return userServices.query(_sql,obj)
    },
    findRegSalaryKeyLen: function (obj) { 
        let _sql = `select count(*) as leng from enterprice a,enterpriceInfo b where a.id=b.pid and b.salary>=(?) and b.salary<(?) and  b.recruititle=(?);`
        return userServices.query(_sql,obj)
    },

    // 公司 1个
    findRegEnter: function (obj) { 
        let _sql = `select a.enterpricename,b.recruititle,a.address,b.enterpriceSim,b.schoolqualify,b.salary,a.enterpriceSize from enterprice a,enterpriceInfo b where a.id=b.pid and a.enterpriceSize>=(?) and a.enterpriceSize<=(?) limit ?,9;`
        return userServices.query(_sql,obj)
    },
    findRegEnterLen: function (obj) { 
        let _sql = `select count(*) as leng from enterprice a,enterpriceInfo b where a.id=b.pid and a.enterpriceSize>=(?) and a.enterpriceSize<=(?);`
        return userServices.query(_sql,obj)
    },

    // 收藏
    findUserId:  function (obj) { 
        let _sql = `select id from user where username=(?)`;
        return userServices.query(_sql,obj)
    },
    setCollect:  function (obj) { 
        let _sql = `insert into goodWord(pid,enterpricename,recruititle) values (?,?,?);`
        return userServices.query(_sql,obj)
    },
    removeCollect:  function (obj) { 
        let _sql = `delete from goodWord where pid=(?) and enterpricename=(?) and recruititle=(?);`
        return userServices.query(_sql,obj)
    },
    findSel:  function (obj) { 
        let _sql = `select * from goodWord where pid=(?) and enterpricename=(?) and recruititle=(?);`
        return userServices.query(_sql,obj)
    },
    findAllInfo:  function (obj) { 
        let _sql = `select pid,enterpricename,recruititle from goodWord where pid=(?);`
        return userServices.query(_sql,obj)
    },


    // 邮箱
    insertEmail:  function (obj) { 
        let _sql = `insert into enterpriceEmail(pid,username,resume,recruittile) values (?,?,?,?);`
        return userServices.query(_sql,obj)
    },
    findSomeInfo:  function (obj) { 
        let _sql = `select id,resume from user where username=(?);`
        return userServices.query(_sql,obj)
    },
    findSomeEnInfo:  function (obj) { 
        let _sql = `select id,pid,enname,content,recruittile from userEmail where pid=(?);`
        return userServices.query(_sql,obj)
    },
    findAllEnInfo:  function (obj) { 
        let _sql = `select enname,content,recruittile from userEmail where id=(?);`
        return userServices.query(_sql,obj)
    },
    findEnId:  function (obj) { 
        let _sql = `select id from enterprice where enterpricename=(?);`
        return userServices.query(_sql,obj)
    },
    deleteUserEmail:  function (obj) { 
        let _sql = `delete from userEmail where id=(?)`
        return userServices.query(_sql,obj)
    },
}
function addresume(request){
    if(typeof request.files !== 'undefined'){
        let r = '';
        let name = request.files.img.name;
        let path = request.files.img.path;
        fs.writeFile('static/resume/'+name,fs.readFileSync(path),err=>{
            if(err){
                console.log('转存失败');
            }else{
                userServices.insertResume(
                    [
                        '/resume/'+name,
                        request.body.username
                    ]
                ).then((data) => {
                    if (data.affectedRows !== 0) {
                        r = 'ok';
                    }else{
                        r = 'fail';
                        return false;
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        })
    }
    return new Promise(res=>{
        res({
            info: 'ok'
        })
    })
}

module.exports = {userServices,addresume};