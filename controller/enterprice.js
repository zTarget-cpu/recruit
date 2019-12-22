let enterpriceServices = require('../service/enterprice');
let md5 = require('md5');
let send = require('koa-send');
let enterArr = require('../data/enterprice')
module.exports={
    async showIndex(ctx){
        await ctx.render('enterprice/enterpriceLogin.pug');
    },
    async conIndex(ctx){
        await ctx.render('enterprice/conIndex.pug');
    },
    async enterpriceInfo(ctx){
        await ctx.render('enterprice/enterpriceInfo.pug');
    },
    async enterLogon(ctx){
        await ctx.render('enterprice/logon.pug');
    },
    async enterpriceRecruit(ctx){
        let r ='';
        let userVal = ctx.request.body.userVal;
        
        
        await enterpriceServices.selectStatus(
            [
                userVal
            ]
        ).then((data) => {
            if (data.length !== 0) {
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        if(r=='ok'){
            await ctx.render('enterprice/enterpriceRecruit.pug')
            return false;
        }
        ctx.body=`<p id='pulish' >权限不足，请到'企业设置'完成认证!!!!</p>`;
        // await ctx.render('enterprice/enterpriceRecruit.pug')  
    },
    async enterlogon(ctx){
        let r ='';
        let userreg = /^[a-zA-Z]{1}.{5,15}/gu;
        let passreg = /.{6,16}/gu;
        let userErr = userreg.test(ctx.request.body.userVal);
        let passErr = passreg.test(ctx.request.body.passVal);
        let enterVal = ctx.request.body.enterVal;
        let passVal = ctx.request.body.passVal;
        let enterpriceErr = enterArr.indexOf(ctx.request.body.enterpriceVal);
        // -1 1
        if(passVal != enterVal){
            ctx.body = {
                info:'passErr'
            }
            return false;
        }
        if(!userErr){
            ctx.body = {
                info:'userErr'
            }
            return false;
        }else if(!passErr){
            ctx.body = {
                info:'passErr'
            }
            return false;
        }else if(enterpriceErr==-1){
            ctx.body = {
                info:'enterpriceErr'
            }
            return false;
        }
        
        await enterpriceServices.logonUser(
            [
                ctx.request.body.userVal,
                md5(ctx.request.body.passVal),
                ctx.request.body.enterpriceVal,
                0
            ]
        ).then((data) => {
            if (data.length !== 0) {
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        if(r=='ok'){
            ctx.body = {
                info:'ok'
            }
            return false;
        }else{
            ctx.body = {
                info:'allErr'
            }
            return false;
        }
        ctx.body='';
    },
    async checkUser(ctx){
        let r = '';
        let enterpricename ='';
        let userreg = /^[a-zA-Z]{1}.{5,15}/gu;
        let passreg = /.{6,16}/gu;
        let userErr = userreg.test(ctx.request.body.userVal);
        let passErr = passreg.test(ctx.request.body.passVal);
        if(!userErr){
            ctx.body = {
                info:'userErr'
            }
            return false;
        }else if(!passErr){
            ctx.body = {
                info:'passErr'
            }
            return false;
        }

        await enterpriceServices.findUserData(
            [
                ctx.request.body.userVal,
                md5(ctx.request.body.passVal)
            ]
        ).then((data) => {
            if (data.length !== 0) {
                r = 'ok';
                enterpricename=data[0].enterpricename;
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        
        if(r=='ok'){
            ctx.body = {
                info:'ok',
                enterpricename
            }
            return false;
        }else{
            ctx.body = {
                info:'allErr'
            }
            return false;
        }
        ctx.body='';
    },
    async updateBoos(ctx){
        let r ='';
        let boosreg = /.{2,16}/gu;
        let addressreg = /.{3,30}/gu;
        let welfarereg = /.{3,60}/gu;
        let numreg = /^\d{1,6}$/gu;
        let boosVal = ctx.request.body.boosVal;
        let addressVal = ctx.request.body.addressVal;
        let enwelfare = ctx.request.body.enwelfareVal;
        let enterpriceSizeVal = ctx.request.body.enterpriceSizeVal;
        let boosErr = boosreg.test(boosVal);
        let addresssErr = addressreg.test(addressVal);
        let welfareErr = welfarereg.test(enwelfare);
        let enterpriceSizeErr = numreg.test(enterpriceSizeVal);
        // console.log(boosErr,addresssErr,welfareErr,enterpriceSizeErr)
        
        
        if(!boosErr){
            ctx.body = {
                info:'boosErr'
            }
            return false;
        }else if(!addresssErr){
            ctx.body = {
                info:'addresssErr'
            }
            return false;
        }else if(!welfareErr){
            ctx.body = {
                info:'welfareErr'
            }
            return false;
        }else if(!enterpriceSizeErr){
            ctx.body = {
                info:'enterpriceSizeErr'
            }
            return false;
        }
        
        await enterpriceServices.enterpriceInfo(
            [
                boosVal,
                addressVal,
                enwelfare,
                enterpriceSizeVal,
                1,
                ctx.request.body.userVal
            ]
        ).then((data) => {
            if (data.affectedRows !== 0) {
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        if(r=='ok'){
            ctx.body = {
                info:'ok'
            }
            return false;
        }
        ctx.body='';
    },
    async updateRecruit(ctx){
        let r ='',pid;
        let recruititlereg = /.{2,16}/gu;
        let describesreg = /.{2,130}/gu;
        let worksreg = /.{3,160}/gu;
        let worksqualifyreg = /.{3,160}/gu;
        let enterpriceSimreg = /.{3,160}/gu;
        let schoolqualifyreg = ['无限','初中以下','中专','大专','本科','硕士以上'];
        let salaryreg = /.{3,60}/gu;
        let {recruititleVal,describesVal,worksVal,worksqualifyVal,enterpriceSimVal,schoolqualifyVal,salaryVal,userVal}=ctx.request.body;
        // console.log(recruititleVal,describesVal,worksVal,worksqualifyVal,enterpriceSimVal,schoolqualifyVal,salaryVal,userVal)
        let recruititleValErr = recruititlereg.test(recruititleVal);
        let describesValErr = describesreg.test(describesVal);
        let worksValErr = worksreg.test(worksVal);
        let worksqualifyValErr = worksqualifyreg.test(worksqualifyVal);
        let enterpriceSimValErr = enterpriceSimreg.test(enterpriceSimVal);
        let schoolqualifyValErr = schoolqualifyreg.indexOf(schoolqualifyVal);
        let salaryValErr = salaryreg.test(salaryVal);
        
        
        if(!recruititleValErr){
            ctx.body = {
                info:'recruititleValErr'
            }
            return false;
        }else if(!describesValErr){
            ctx.body = {
                info:'describesValErr'
            }
            return false;
        }else if(!worksValErr){
            ctx.body = {
                info:'worksValErr'
            }
            return false;
        }else if(!worksqualifyValErr){
            ctx.body = {
                info:'worksqualifyValErr'
            }
            return false;
        }else if(!enterpriceSimValErr){
            ctx.body = {
                info:'enterpriceSimValErr'
            }
            return false;
        }else if(schoolqualifyValErr == -1){
            ctx.body = {
                info:'schoolqualifyValErr'
            }
            return false;
        }else if(!salaryValErr){
            ctx.body = {
                info:'salaryValErr'
            }
            return false;
        }
        recruititleVal = recruititleVal.toLowerCase();
        await enterpriceServices.findSomeInfo(
            [
                userVal
            ]
        ).then((data) => {
            if (data.length !== 0) {
                pid = data[0].id
            }
        }).catch((err) => {
            console.log(err)
        })
        await enterpriceServices.enterpricerecruit(
            [
                pid,recruititleVal,describesVal,worksVal,worksqualifyVal,enterpriceSimVal,schoolqualifyVal,salaryVal,
            ]
        ).then((data) => {
            if (data.affectedRows !== 0) {
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        if(r=='ok'){
            ctx.body = {
                info:'ok'
            }
            return false;
        }
        ctx.body='';
    },
    async enEmail(ctx){
        let id,dataArr,r;
        // console.log(ctx.query.enUser)
        await enterpriceServices.findSomeInfo([
            ctx.query.enUser
        ]).then((data)=>{
            if(data.length != 0){
                id=data[0].id;
            }
        })
        await enterpriceServices.findSomeUserInfo([
            id
        ]).then((data) => {
            if (data.length !== 0) {
                dataArr = data;
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        if(r=='ok'){
            await ctx.render('enterprice/enterpriceEmail.pug',{
                dataArr
            })
            return false;
        }
        ctx.body='<p>暂无邮件</p>';
    },
    async showManageInfo(ctx){
        let id,dataArr,r;
        await enterpriceServices.findSomeInfo([
            ctx.query.enUser
        ]).then((data)=>{
            if(data.length != 0){
                id=data[0].id;
            }
        })
        await enterpriceServices.findAllManageInfo([
            id
        ]).then((data) => {
            if (data.length !== 0) {
                dataArr = data;
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        if(r=='ok'){
            await ctx.render('enterprice/InfoManage.pug',{
                dataArr
            })
        }else{
            ctx.body='<p>请先进行发布招聘</p>'
        }
    },
    async removeEnEmail(ctx){
        let {id} = ctx.request.body;
        let r ;
        await enterpriceServices.removeEnEmail([
            id
        ]).then((data) => {
            if (data.affectedRows !== 0) {
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        if(r == 'ok'){
            ctx.body={
                info:'ok'
            }
            return false
        }
        ctx.body = ''
    },
    async removeRecruInfo(ctx){
        let {id} = ctx.request.body;
        let r ;
        await enterpriceServices.removeRecruInfo([
            id
        ]).then((data) => {
            if (data.affectedRows !== 0) {
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        if(r == 'ok'){
            ctx.body={
                info:'ok'
            }
            return false
        }
        ctx.body = ''
    },
    async loadRe(ctx){
        let path = ctx.query.path;
        path = 'static'+path;
        ctx.attachment(path)
        await send(ctx,path);
    },
    async moveRecover(ctx){
        let {username} = ctx.request.body;
        await ctx.render('enterprice/replyUser.pug',{
            username
        });
    },
    async sendUser(ctx){
        let {enname,username,contentVal,specTitle} = ctx.request.body;
        let id,r;
        let contentReg = /.{6}/;
        let contentErr = contentReg.test(contentVal);
        if(!contentErr){
            ctx.body={
                info:'contentErr'
            }
            return false
        }
        // console.log(enname,username,content)
        await enterpriceServices.findSoInfo([
            username
        ]).then((data) => {
            id = data[0].id;
        }).catch((err) => {
            console.log(err)
        })
        await enterpriceServices.sendUserMess([
            id,enname,contentVal,specTitle
        ]).then((data) => {
            if(data.affectedRows !=0){
                r = 'ok';
            }
        }).catch((err) => {
            console.log(err)
        })
        if(r == 'ok'){
            ctx.body={
                info:r
            }
            return false;
        }
        ctx.body = '';
    },
    async showEleInfo(ctx){
        let id,dataArr,r,enterstatus;
        // console.log(ctx.query.enUser)
        await enterpriceServices.findSomeInfo([
            ctx.query.enUser
        ]).then((data)=>{
            if(data.length != 0){
                id=data[0].id;
                enterstatus = data[0].enterstatus;
            }
        })
        if(enterstatus==1){
            await enterpriceServices.selectStatus([
                ctx.query.enUser
            ]).then((data) => {
                if (data.length !== 0) {
                    dataArr = data;
                    r = 'ok';
                }else{
                    r = 'fail'
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        await ctx.render('enterprice/eleInfo.pug',{
            dataArr,enterstatus
        })
        return false;
    },
    async findEnterStatus(ctx){
        let r;
        await enterpriceServices.findEnterStatus([
            ctx.request.body.enuser
        ]).then((data) => {
            if (data.length !== 0) {
                r = data[0].enterstatus;
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        if(r==1){
            ctx.body = {
                info:1
            }
        }else{
            ctx.body = {
                info:0
            }
        }
    },
    async findEnterpid(ctx){
        let r,id;
        await enterpriceServices.findSomeInfo([
            ctx.request.body.enuser
        ]).then((data) => {
            if (data.length !== 0) {
                id = data[0].id;
            }
        }).catch((err) => {
            console.log(err)
        })
        if(id > 0){
            await enterpriceServices.findEnterpid([
                id
            ]).then((data) => {
                if (data.length !== 0) {
                    r='ok'
                }else{
                    r = 'fail'
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        if(r == 'ok'){
            ctx.body = {
                info:1
            }
        }else{
            ctx.body = {
                info:0
            }
        }
    },
    async showInfoDetail(ctx){
        let dataArr;
        let {id} = ctx.request.body;
        await enterpriceServices.findAllManageInfoSpec([
            id
        ]).then((data) => {
            if (data.length !== 0) {
                dataArr = data;
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        await ctx.render('enterprice/enInfoDetail.pug',{
            dataArr
        })
    },
    async showUserInfo(ctx){
        let {id} = ctx.request.body;
        let dataArr;
        await enterpriceServices.findUserAllData([
            id
        ]).then((data) => {
            if (data.length !== 0) {
                dataArr = data;
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        await ctx.render('user/userEleInfo.pug',{
            dataArr
        })
    }
}