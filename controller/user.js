let {userServices,addresume} = require('../service/user');
let md5 = require('md5');
let axios = require('axios');
let enNum = 5;
let enterNum = 9;
let schoolArr = require('../data/school')
module.exports={
    async showIndex(ctx){
        let dataVal = '';
        let random = Math.round(Math.random()*3);
        await userServices.findEnterData([
            random
        ]).then((data)=>{
            dataVal=data;
        }).catch(function (err){
            console.log(err)
        })
        
        await ctx.render('user/index.pug',{
            dataVal
        })
    },
    async Logon(ctx){
        let r ='';
        let userreg = /^[a-zA-Z]{1}.{5,15}/gu;
        let passreg = /.{6,16}/gu;
        let userErr = userreg.test(ctx.request.body.userVal);
        let passErr = passreg.test(ctx.request.body.passVal);
        let enterVal = ctx.request.body.enterVal;
        let schoolErr = schoolArr.indexOf(ctx.request.body.schoolVal);
        // -1 1
        if(ctx.request.body.passVal != enterVal){
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
        }else if(schoolErr==-1){
            ctx.body = {
                info:'schoolErr'
            }
            return false;
        }
        
        await userServices.logonUser(
            [
                ctx.request.body.userVal,
                md5(ctx.request.body.passVal),
                ctx.request.body.schoolVal,
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
        let userreg = /^[a-zA-Z]{1}.{5,15}/gu;
        let passreg = /.{6,16}/gu;
        let userErr = userreg.test(ctx.request.body.userVal);
        let passErr = passreg.test(ctx.request.body.passVal);
        let school = '';
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

        await userServices.findUserData(
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
                school
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
    async updatePass(ctx){
        let passreg = /.{6,16}/gu;
        let passErr = passreg.test(ctx.request.body.passVal);
        let r = '';
        if(!passErr){
            ctx.body = {
                info:'passErr'
            }
            return false;
        }
        if(ctx.request.body.passVal != ctx.request.body.enterVal){
            ctx.body = {
                info:'twoPassErr'
            }
            return false;
        }
        await userServices.UpdateUser([
            md5(ctx.request.body.passVal),
            ctx.request.body.userVal
        ]).then((data)=>{
            if(data.length !== 0 ){
                r = 'ok'
            }else{
                r = 'sqlErr'
            }
        })
        if(r == 'ok'){
            ctx.body={
                info:'ok'
            }
            return false;
        }else{
            ctx.body={
                info:'sqlErr'
            }
            return false
        }
        ctx.body = '123';
    },
    async submitResume(ctx){
        let r = '';
        let name = ctx.request.files.img.name;
        let nameArr = name.split('.');
        let ext = nameArr[nameArr.length-1];
        let extreg = /doc|docx|pdf|jpg|png/gi;
        let dcmErr = extreg.test(ext);
        
        if(!dcmErr){
            ctx.body = {
                info:'dcmErr'
            }
            return false;
        }
        let res = await addresume(ctx.request);
        ctx.body = {
            info:res.info
        }
    },
    async showenterPoster(ctx){
        let keyWork = '',page = 1;
        let len,pagelen;
        if(typeof ctx.query.keyWork !== 'undefined'){
            keyWork = ctx.query.keyWork;
            keyWork=keyWork.toLowerCase();
        }
        if(typeof ctx.query.page !== 'undefined'){
            page = ctx.query.page;
        }
        let dataVal = '';
        let newHtml = '';
        
        if(keyWork == ''){
            await userServices.findAnEnterData([
                page != 1?(page-1)*enNum:page-1
            ]).then((data)=>{
                dataVal=data;
            }).catch(function (err){
                console.log(err)
            })
            await userServices.findEnLeng([
            ]).then((res)=>{
                len=res[0].leng;
            }).catch(function (err){
                console.log(err)
            })
        }else{
            await userServices.findSomeEnterData([
                keyWork,page != 1?(page-1)*enNum:page-1
            ]).then((data)=>{
                dataVal=data;
            }).catch(function (err){
                console.log(err)
            })
            await userServices.findSomeEnterDatalen([
                keyWork
            ]).then((data)=>{
                len=data[0].leng;
            }).catch(function (err){
                console.log(err)
            })
        }
        pagelen = Math.ceil(len / enNum);
        
        if(dataVal.length == 0){
            newHtml = `没有找到相关职位，修改筛选条件试一下`;
        }
        await ctx.render('user/enterPoster.pug',{
            dataVal,newHtml,pagelen,keyWork
        })
    },
    async showPoster(ctx){
        let dataVal = '',page = 1;
        let len,pagelen;
        if(typeof ctx.query.page !== 'undefined'){
            page = ctx.query.page;
        }
        await userServices.findAEnterData([
            page ==1 ?page-1:(page-1)*enterNum
        ]).then((data)=>{
            dataVal=data;
        }).catch(function (err){
            console.log(err)
        })
        await userServices.findAEnterDataLen().then((data)=>{
            len=data[0].leng;
        }).catch(function (err){
            console.log(err)
        })
        pagelen = Math.ceil(len / enterNum)
        await ctx.render('user/poster.pug',{
            dataVal,pagelen
        })  
    },
    async sortInfo(ctx){
        let newHtml = '',pagelen,len,page = 1;
        let specArr = ctx.request.body.requestInfo;
        if(typeof ctx.request.body.page != 'undefined'){
            page = ctx.request.body.page;
        }
        // let keywork = ctx.request.body.keywork.toLowerCase();
        let schoolqualify = specArr.indexOf('学历要求');
        let salary = specArr.indexOf('薪资要求');
        if(typeof ctx.query.page !== 'undefined'){
            page = ctx.query.page;
        }
        // console.log(schoolqualify,salary)
        let salaryInfo = [];
        let schoolInfo =specArr[0];
        let dataVal = '';
        switch (specArr[1]){
            case '3K以下' : salaryInfo = [0,3000];break;
            case '3K-5K' : salaryInfo = [3000,5000];break;
            case '5K-10K' :salaryInfo = [5000,10000];break;
            case '10K-15K' :salaryInfo = [10000,15000];break;
            case '15K以上' :salaryInfo = [15000,1000000];break;
        }
        // console.log(typeof keywork);
        if(schoolqualify == -1 && salary == -1){
            if(page == 1){
                await userServices.findRegAll([
                    schoolInfo,...salaryInfo,page-1
                ]).then((data)=>{
                    dataVal=data;
                }).catch(function (err){
                    console.log(err)
                })
            }else{
                await userServices.findRegAll([
                    schoolInfo,...salaryInfo,(page-1)*enNum
                ]).then((data)=>{
                    dataVal=data;
                }).catch(function (err){
                    console.log(err)
                })
            }
            await userServices.findRegAllLen([
                schoolInfo,...salaryInfo
            ]).then((data)=>{
                len=data[0].leng;
            }).catch(function (err){
                console.log(err)
            })
        }else if(schoolqualify == -1){
            if(page == 1){
                await userServices.findRegSchool([
                    schoolInfo,page-1
                ]).then((data)=>{
                    dataVal=data;
                }).catch(function (err){
                    console.log(err)
                })
            }else{
                await userServices.findRegSchool([
                    schoolInfo,(page-1)*enNum
                ]).then((data)=>{
                    dataVal=data;
                }).catch(function (err){
                    console.log(err)
                })
            }
            await userServices.findRegSchoolLen([
                schoolInfo,...salaryInfo
            ]).then((data)=>{
                len=data[0].leng;
            }).catch(function (err){
                console.log(err)
            })
        }else if(salary == -1){
            if(page == 1){
                await userServices.findRegSalary([
                    ...salaryInfo,page-1
                ]).then((data)=>{
                    dataVal=data;
                }).catch(function (err){
                    console.log(err)
                })
            }else{
                await userServices.findRegSalary([
                    ...salaryInfo,(page-1)*enNum
                ]).then((data)=>{
                    dataVal=data;
                }).catch(function (err){
                    console.log(err)
                })
            }
            await userServices.findRegSalaryLen([
                ...salaryInfo
            ]).then((data)=>{
                len=data[0].leng;
            }).catch(function (err){
                console.log(err)
            })
        }
        if(dataVal.length == 0){
            newHtml = `没有找到相关职位，修改筛选条件试一下`;
        }
        let sortInfo = true;
        pagelen = Math.ceil(len / enNum);
        await ctx.render('user/enterPoster.pug',{
            dataVal,newHtml,pagelen,sortInfo
        })
        // ctx.body = '123'
    },
    async sortInfoInKey(ctx){
        let newHtml = '',pagelen,len,page = 1;
        let specArr = ctx.request.body.requestInfo;
        let keywork = ctx.request.body.keywork.toLowerCase();
        if(typeof ctx.request.body.page != 'undefined'){
            page = ctx.request.body.page;
        }
        let schoolqualify = specArr.indexOf('学历要求');
        let salary = specArr.indexOf('薪资要求');
        let salaryInfo = [];
        let schoolInfo =specArr[0];
        let dataVal = '';
        switch (specArr[1]){
            case '3K以下' : salaryInfo = [0,3000];break;
            case '3K-5K' : salaryInfo = [3000,5000];break;
            case '5K-10K' :salaryInfo = [5000,10000];break;
            case '10K-15K' :salaryInfo = [10000,15000];break;
            case '15K以上' :salaryInfo = [15000,100000];break;
        }
        // console.log(typeof keywork);
        if(schoolqualify == -1 && salary == -1){
            await userServices.findRegAllKey([
                schoolInfo,...salaryInfo,keywork,page == 1?page-1:(page-1)*enNum
            ]).then((data)=>{
                dataVal=data;
            }).catch(function (err){
                console.log(err)
            })
            await userServices.findRegAllKeyLen([
                schoolInfo,...salaryInfo,keywork
            ]).then((data)=>{
                len=data[0].leng;
            }).catch(function (err){
                console.log(err)
            })
        }else if(schoolqualify == -1){
            await userServices.findRegSchoolKey([
                schoolInfo,keywork,page == 1?page-1:(page-1)*enNum
            ]).then((data)=>{
                dataVal=data;
            }).catch(function (err){
                console.log(err)
            })
            await userServices.findRegSchoolKeyLen([
                schoolInfo,keywork
            ]).then((data)=>{
                len=data[0].leng;
            }).catch(function (err){
                console.log(err)
            })
        }else if(salary == -1){
            await userServices.findRegSalaryKey([
                ...salaryInfo,keywork,page == 1?page-1:(page-1)*enNum
            ]).then((data)=>{
                dataVal=data;
            }).catch(function (err){
                console.log(err)
            })
            await userServices.findRegSalaryKeyLen([
                ...salaryInfo,keywork
            ]).then((data)=>{
                len=data[0].leng;
            }).catch(function (err){
                console.log(err)
            })
        }
        if(dataVal.length == 0){
            newHtml = `没有找到相关职位，修改筛选条件试一下`;
        }
        let sortInfo = true;
        pagelen = Math.ceil(len / enNum);
        await ctx.render('user/enterPoster.pug',{
            dataVal,newHtml,pagelen,sortInfo
        })
    },
    async sortEnInfo(ctx){
        let  {avType}=ctx.request.body;
        let newHtml = '',pagelen,len,page = 1,dataVal;
        if(typeof ctx.request.body.page != 'undefined'){
            page = ctx.request.body.page;
        }
        let personInfo =[];
        switch (avType){
            case '0-20人' : personInfo = [0,20];break;
            case '20-99人' : personInfo = [20,99];break;
            case '100-499人' :personInfo = [100,499];break;
            case '500-999人' :personInfo = [500,999];break;
            case '1000人以上' :personInfo = [1000,100000];break;
        }
        await userServices.findRegEnter([
            ...personInfo,page==1?page-1:(page-1)*enterNum
        ]).then((data)=>{
            dataVal=data;
        }).catch(function (err){
            console.log(err)
        })
        await userServices.findRegEnterLen([
            ...personInfo
        ]).then((data)=>{
            len=data[0].leng;
        }).catch(function (err){
            console.log(err)
        })
        if(dataVal.length == 0){
            newHtml = `没有找到相关职位，修改筛选条件试一下`;
        }
        let sortInfo = true;
        pagelen = Math.ceil(len / enterNum);
        await ctx.render('user/poster.pug',{
            dataVal,newHtml,pagelen,sortInfo
        })
    },
    async showAdvert(ctx){
        let dataVal = '',len,pagelen,page=1;
        if(typeof ctx.query.page !== 'undefined'){
            page = ctx.query.page;
        }
        await userServices.findAllAdDataLen().then((data)=>{
            len=data[0].leng;
        }).catch(function (err){
            console.log(err)
        })
        await userServices.findAllAdData([
            page-1==0?page-1:(page-1)*enNum
        ]).then((data)=>{
            dataVal=data;
        }).catch(function (err){
            console.log(err)
        })
        pagelen = Math.ceil(len / enNum);
        await ctx.render('user/advert.pug',{
            dataVal,pagelen
        })  
    },
    async showAdvertDetail(ctx){
        let dataVal = '',id;
        if(typeof ctx.query.pid !== 'undefined'){
            id = ctx.query.pid;
        }
        await userServices.findAllAdDetailData([
            id
        ]).then((data)=>{
            dataVal=data;
        }).catch(function (err){
            console.log(err)
        })
        await ctx.render('user/advertDetail.pug',{
            dataVal
        })  
    },
    async showLogin(ctx){
        await ctx.render('user/login.pug')  
    },
    async showLogon(ctx){
        await ctx.render('user/logon.pug')  
    },
    async showenterpriceDetail(ctx){
        let name = '好未来';
        let keyWord = 'java';
        if(typeof ctx.query.name !== 'undefined'){
            name = ctx.query.name 
        }
        if(typeof ctx.query.keyWord !== 'undefined'){
            keyWord = ctx.query.keyWord 
        }
        let dataVal = '';
        await userServices.findAllEnterData([
            name,keyWord
        ]).then((data)=>{
            dataVal=data;
        }).catch(function (err){
            console.log(err)
        })
        let enwelReg = /\d+/g;
        let enwelfare = dataVal[0].enwelfare.split(enwelReg);
        enwelfare = enwelfare.filter((v,k,s)=>{
            return v != '';
        })
        await ctx.render('user/enterpriceDetail.pug',{
            dataVal,enwelfare
        })
    },
    async userInfo(ctx){
        await ctx.render('user/userInfo.pug')
    },
    async userSpec(ctx){
        await ctx.render('user/userSpec.pug')
    },
    async userEmail(ctx){
        let id,dataArr;
        await userServices.findSomeInfo([
            ctx.query.username
        ]).then((data)=>{
            id=data[0].id;
        })
        await userServices.findSomeEnInfo([
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
            await ctx.render('user/userEmail.pug',{
                dataArr
            })
            return false;
        }
        ctx.body='<p>暂无邮件</p>';
    },
    async userResume(ctx){
        await ctx.render('user/userResume.pug')
    },
    async userCollect(ctx){
        let dataArr,r,username,id;
        if(typeof ctx.query.username !== 'undefined'){
            username = ctx.query.username.trim()
        }
        await userServices.findUserId([
            username
        ]).then((data)=>{
            id=data[0].id
        })

        
        await userServices.findAllInfo([
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
            await ctx.render('user/userCollect.pug',{
                dataArr
            })
            return false;
        }
        ctx.body='<p>赶紧去收藏吧！</p>';
        
    },
    async removeCollectSpec(ctx){
        let {pid,enterpriceName,recruititle} = ctx.request.body;
        pid = parseInt(pid);
        let r = '';
        await userServices.removeCollect([
            pid,enterpriceName.trim(),recruititle.trim()
        ]).then((data)=>{
            if(data.affectedRow !== 0 ){
                r = 'ok'
            }
        })
        if(r == 'ok'){
            ctx.body={
                info:'ok'
            }
            return false;
        }
        ctx.body='';
    },
    async userIndex(ctx){
        await ctx.render('user/userIndex.pug')
    },
    async setCollect(ctx){
        let {username,enterpriceName,recruititle} = ctx.request.body;
        let id = 0;
        if(username == null){
            return false;
        }
        await userServices.findUserId([
            username
        ]).then((data)=>{
            id=data[0].id;
        })
        await userServices.setCollect([
            id,enterpriceName,recruititle
        ]).then((data)=>{
            if(data.affectedRow !== 0 ){
                r = 'ok'
            }
        })
        if(r == 'ok'){
            ctx.body={
                info:'ok'
            }
            return false;
        }
        ctx.body='';
    },
    async removeCollect(ctx){
        let {username,enterpriceName,recruititle} = ctx.request.body;
        // console.log(username,enterpriceName,recruititle)
        let id;
        await userServices.findUserId([
            username
        ]).then((data)=>{
            id=data[0].id;
        })
        await userServices.removeCollect([
            id,enterpriceName,recruititle
        ]).then((data)=>{
            // console.log(data)
            if(data.affectedRow !== 0 ){
                r = 'ok'
            }
        })
        if(r == 'ok'){
            ctx.body={
                info:'ok'
            }
            return false;
        }
        ctx.body='';
    },
    async colsel(ctx){
        let {username,enterpriceName,recruititle} = ctx.request.body;
        if(username == null){
            ctx.body = {
                info:'no'
            }
            return false;
        }
        let id ;
        let r ;
        await userServices.findUserId([
            username
        ]).then((data)=>{
            id=data[0].id;
        })
        await userServices.findSel([
            id,enterpriceName,recruititle
        ]).then((data)=>{
            if(data.length != 0){
                r = 'ok'
            }
        })
        if(r == 'ok'){
            ctx.body = {
                info:'ok'
            }
            return false
        }
        ctx.body = {
            info:'no'
        }
    },
    async subRe(ctx){
        let {enterpricename,username,SpecLiTitle} = ctx.request.body;
        let id,resume,r;
        if(username == null){
            return false;
        }
        await userServices.findSomeInfo([
            username
        ]).then((data)=>{
            resume=data[0].resume;
        })
        await userServices.findEnId([
            enterpricename.trim()
        ]).then((data)=>{
            id=data[0].id;
        })
        // console.log(id,resume)
        if(resume  == null){
            ctx.body = {
                info:'resumeErr'
            }
            return false
        }
        await userServices.insertEmail([
            id,username,resume,SpecLiTitle
        ]).then((data)=>{
            // console.log(data)
            if(data.affectedRow !== 0 ){
                r = 'ok'
            }
        })
        if(r  == 'ok'){
            ctx.body = {
                info:'ok'
            }
            return false
        }
        ctx.body = ''
    },
    async showEmailDetail(ctx){
        let r,dataArr;
        let {id} = ctx.request.body;
        await userServices.findAllEnInfo([
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
        if(r == 'ok'){
            await ctx.render('user/userEmailDetail.pug',{
                dataArr
            });
            return false
        }
        ctx.body = '';
    },
    async removeUserEmail(ctx){
        let {id} = ctx.request.body;
        let r ;
        await userServices.deleteUserEmail([
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
    async userExtraInfo(ctx){
        let id,dataArr,r;
        await userServices.findAllUserInfo([
            ctx.query.user
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
            await ctx.render('user/userEleInfo.pug',{
                dataArr
            })
            return false;
        }
        ctx.body='<p>无</p>';
    },
    async addUserAllInfo(ctx){
        await ctx.render('user/addUserInfo.pug')
    },
    async UpdateUserInfo(ctx){
        let r ='';
        let realnamereg = /.{2,16}/gu;
        let agereg = /.{1,3}/gu;
        let addressreg = /.{3,30}/gu;
        let subjectreg = /.{3,6}/gu;
        let emailreg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/gu;
        let {realnameVal,ageVal,addressVal,subjectVal,emailVal,user} = ctx.request.body;
        let realnameErr = realnamereg.test(realnameVal);
        let ageErr = agereg.test(ageVal);
        let addressErr = addressreg.test(addressVal);
        let subjectErr = subjectreg.test(subjectVal);
        let emailErr = emailreg.test(emailVal);
        
        
        if(!realnameErr){
            ctx.body = {
                info:'realnameErr'
            }
            return false;
        }else if(!ageErr){
            ctx.body = {
                info:'ageErr'
            }
            return false;
        }else if(!addressErr){
            ctx.body = {
                info:'addressErr'
            }
            return false;
        }else if(!subjectErr){
            ctx.body = {
                info:'subjectErr'
            }
            return false;
        }else if(!emailErr){
            ctx.body = {
                info:'emailErr'
            }
            return false;
        }
        
        await userServices.addUserSpecInfo(
            [
                realnameVal,ageVal,addressVal,subjectVal,emailVal,user
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
    async findUserStatus(ctx){
        let r;
        await userServices.findAllUserInfo([
            ctx.request.body.user
        ]).then((data) => {
            if (data.length !== 0) {
                r = data[0].userstatus;
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
    }
}