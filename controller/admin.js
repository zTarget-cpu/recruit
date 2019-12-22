let adminServices = require('../service/admin');
let md5 = require('md5');
let adNum = 8;
module.exports={
    async showIndex(ctx){
        await ctx.render('admin/adminLogin.pug');
    },
    async adminInfo(ctx){
        await ctx.render('admin/adminInfo.pug');
    },
    async checkUser(ctx){
        let r = '';
        let userreg = /^[a-zA-Z]{1}.{4,15}/gu;
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

        await adminServices.findUserData(
            [
                ctx.request.body.userVal,
                md5(ctx.request.body.passVal)
            ]
        ).then((data) => {
            if (data.length !== 0) {
                r = 'ok';
                school = data[0].school;
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        
        if(r=='ok'){
            ctx.body = {
                info:'ok',
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
    async usermess(ctx){
        let dataArr = '';
        let r = '';
        await adminServices.findUserAllData().then((data) => {
            if (data.length !== 0) {
                dataArr = data;
                // console.log(dataArr[0].username)
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        
        if(r=='ok'){
            await ctx.render('admin/usermess.pug',{
                dataArr
            });
            return false;
        }
        ctx.body='';
    },
    async enmess(ctx){
        let dataArr = '';
        let r = '';
        await adminServices.findEnterAllData().then((data) => {
            if (data.length !== 0) {
                dataArr = data;
                // console.log(dataArr[0].username)
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        
        if(r=='ok'){
            await ctx.render('admin/enmess.pug',{
                dataArr
            });
            return false;
        }
        ctx.body='';
    },
    async deleteUser(ctx){
        let id;
        await adminServices.deleteUserId(
            [
                ctx.request.body.usernameVal
            ]
        ).then((data) => {
            if (data.length !== 0) {
                id = data[0].id;
            }
        }).catch((err) => {
            console.log(err)
        })
        await adminServices.deleteUserEmData(
            [
                id
            ]
        ).catch((err) => {
            console.log(err)
        })
        await adminServices.deleteUserWordData(
            [
                id
            ]
        ).catch((err) => {
            console.log(err)
        })
        await adminServices.deleteUserData(
            [
                ctx.request.body.usernameVal
            ]
        ).then((data) => {
            if (data.affectedRows !== 0) {
                dataArr = data;
                // console.log(dataArr[0].username)
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        
        if(r=='ok'){
            ctx.body=r;
            return false;
        }
        ctx.body='';
    },
    async deleteEnter(ctx){
        let id ;
        await adminServices.deleteEnterId(
            [
                ctx.request.body.ennameVal
            ]
        ).then((data) => {
            if (data.length !== 0) {
                id = data[0].id;
            }
        }).catch((err) => {
            console.log(err)
        })
        await adminServices.deleteEnterEm(
            [
                id
            ]
        ).catch((err) => {
            console.log(err)
        })
        await adminServices.deleteEnterInfo(
            [
                id
            ]
        ).catch((err) => {
            console.log(err)
        })
        await adminServices.deleteEnterData(
            [
                ctx.request.body.ennameVal
            ]
        ).then((data) => {
            if (data.affectedRows !== 0) {
                dataArr = data;
                // console.log(dataArr[0].username)
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        
        if(r=='ok'){
            ctx.body=r;
            return false;
        }
        ctx.body='';
    },
    async adpublish(ctx){
        await ctx.render('admin/adpublish.pug')
    },
    async subadInfo(ctx){
        let r ='';
        let adTitlereg = /.{3,16}/gu;
        let adSourcereg = /.{3,30}/gu;
        let adContentreg = /.{3,60}/gu;
        let {adTitleVal,adSourceVal,adContentVal} = ctx.request.body;
        let time = new Date();
        time = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`;
        let adTitleArr = adTitlereg.test(adTitleVal);
        let adSourceArr = adSourcereg.test(adSourceVal);
        let adContentErr = adContentreg.test(adContentVal);
        
        if(!adTitleArr){
            ctx.body = {
                info:'adTitleArr'
            }
            return false;
        }else if(!adSourceArr){
            ctx.body = {
                info:'adSourceArr'
            }
            return false;
        }else if(!adContentErr){
            ctx.body = {
                info:'adContentErr'
            }
            return false;
        }
        await adminServices.insertad(
            [
                adTitleVal,
                adSourceVal,
                time,
                adContentVal,
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
        ctx.body = ''
    },
    async adInfo(ctx){
        let dataArr,r;
        await adminServices.findAdAllData([
        ]).then((data) => {
            if (data.length !== 0) {
                dataArr = data;
                // console.log(dataArr[0].username)
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        
        if(r=='ok'){
            await ctx.render('admin/adInfo.pug',{
                dataArr
            });
            return false;
        }
        ctx.body='';
    },
    async deletead(ctx){
        let r;
        await adminServices.deleteAdData(
            [
                ctx.request.body.id
            ]
        ).then((data) => {
            if (data.affectedRows !== 0) {
                r='ok';
                // console.log(dataArr[0].username)
            }
        }).catch((err) => {
            console.log(err)
        })
        
        if(r=='ok'){
            ctx.body=r;
            return false;
        }
        ctx.body='';
    },
    async showUserDetail(ctx){
        let dataArr;
        await adminServices.findUserAllInfo(
            [
                ctx.request.body.id
            ]
        ).then((data) => {
            if (data.length !== 0) {
                dataArr = data;
                // console.log(dataArr[0].username)
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        await ctx.render('admin/userEleInfo.pug',{
            dataArr
        })
    },
    async showEnterDetail(ctx){
        let dataArr;
        await adminServices.findEnterSomeInfo(
            [
                ctx.request.body.id
            ]
        ).then((data) => {
            if (data.length !== 0) {
                dataArr = data;
                // console.log(dataArr[0].username)
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        await ctx.render('admin/enterEleInfo.pug',{
            dataArr
        })
    },
    async showAdDetail(ctx){
        let dataArr;
        await adminServices.findAdAllInfo(
            [
                ctx.request.body.id
            ]
        ).then((data) => {
            if (data.length !== 0) {
                dataArr = data;
                // console.log(dataArr[0].username)
                r = 'ok';
            }else{
                r = 'fail'
            }
        }).catch((err) => {
            console.log(err)
        })
        await ctx.render('admin/adInfoDetail.pug',{
            dataArr
        })
    }
}