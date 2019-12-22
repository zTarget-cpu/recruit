let adminController = require('../controller/admin')
const Router = require('koa-router');
let adminRouter = new Router({
    prefix:'/admin'
})

// 一。显示
// 登录
adminRouter.get('/index',adminController.showIndex); 
// admin 中心
adminRouter.get('/adminInfo',adminController.adminInfo);

// 二。功能
// 用户账号密码校队
adminRouter.post('/checkUser',adminController.checkUser);
// 用户管理 渲染+删除+用户主要内容
adminRouter.post('/usermess',adminController.usermess);
adminRouter.post('/deleteUser',adminController.deleteUser);
adminRouter.post('/showUserDetail',adminController.showUserDetail);
// 企业管理 渲染+删除+企业主要内容
adminRouter.post('/enmess',adminController.enmess);
adminRouter.post('/deleteEnter',adminController.deleteEnter);
adminRouter.post('/showEnterDetail',adminController.showEnterDetail);
// 广告发布 渲染+发布
adminRouter.post('/adpublish',adminController.adpublish);
adminRouter.post('/subadInfo',adminController.subadInfo);
// 广告管理 渲染+删除+广告主要内容
adminRouter.post('/adInfo',adminController.adInfo);
adminRouter.post('/deletead',adminController.deletead);
adminRouter.post('/showAdDetail',adminController.showAdDetail);

module.exports = adminRouter ;