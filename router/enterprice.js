let enterpriceController = require('../controller/enterprice')
const Router = require('koa-router');
let enterpriceRouter = new Router({
    prefix:'/enterprice'
})

// 一。显示
// 登录+判断
enterpriceRouter.get('/index',enterpriceController.showIndex);
enterpriceRouter.post('/checkUser',enterpriceController.checkUser);
// 企业中心
enterpriceRouter.get('/conIndex',enterpriceController.conIndex);
enterpriceRouter.post('/findEnterStatus',enterpriceController.findEnterStatus);
enterpriceRouter.post('/findEnterpid',enterpriceController.findEnterpid);
// 注册+判断
enterpriceRouter.get('/logon',enterpriceController.enterLogon);
enterpriceRouter.post('/enterlogon',enterpriceController.enterlogon);

// 二。功能
// 企业邮箱 渲染+删除
enterpriceRouter.get('/enEmail',enterpriceController.enEmail);
enterpriceRouter.post('/removeEnEmail',enterpriceController.removeEnEmail);
// 企业设置界面+上传判断
enterpriceRouter.get('/enterpriceInfo',enterpriceController.enterpriceInfo);
enterpriceRouter.post('/update_Some_one',enterpriceController.updateBoos);
// 企业发布界面+发布判断
enterpriceRouter.post('/enterpriceRecruit',enterpriceController.enterpriceRecruit);
enterpriceRouter.post('/update_Some_two',enterpriceController.updateRecruit);
// 简历+用户简单简历
enterpriceRouter.get('/loadRe',enterpriceController.loadRe);
enterpriceRouter.post('/showUserInfo',enterpriceController.showUserInfo);
// 邮箱回复 跳转+判断
enterpriceRouter.post('/moveRecover',enterpriceController.moveRecover);
enterpriceRouter.post('/sendUser',enterpriceController.sendUser);
// 企业信息在渲染
enterpriceRouter.get('/showEleInfo',enterpriceController.showEleInfo);
// 企业招聘信息管理
enterpriceRouter.get('/showManageInfo',enterpriceController.showManageInfo);
enterpriceRouter.post('/removeRecruInfo',enterpriceController.removeRecruInfo);
enterpriceRouter.post('/showInfoDetail',enterpriceController.showInfoDetail);

module.exports = enterpriceRouter ;