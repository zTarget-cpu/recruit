let userController = require('../controller/user')
const Router = require('koa-router');
let userRouter = new Router({
    prefix:'/user'
})

// 一.显示
// 主页
userRouter.get('/index',userController.showIndex);
// 职位 + 排序
userRouter.get('/showenterPoster',userController.showenterPoster);
userRouter.post('/sortInfo',userController.sortInfo);
userRouter.post('/sortInfoInKey',userController.sortInfoInKey);
// 公司 排序
userRouter.get('/showPoster',userController.showPoster);
userRouter.post('/sortEnInfo',userController.sortEnInfo);
// 广告+详情
userRouter.get('/showAdvert',userController.showAdvert);
userRouter.get('/showAdvertDetail',userController.showAdvertDetail);
// 登录 + 判断
userRouter.get('/showLogin',userController.showLogin);
userRouter.post('/checkUser',userController.checkUser);
// 注册 + 验证
userRouter.get('/showLogon',userController.showLogon);
userRouter.post('/Logon',userController.Logon);


// 二.功能
// 详细公司信息
userRouter.get('/showenterpriceDetail',userController.showenterpriceDetail);
// 用户中心
userRouter.get('/showuserInfo',userController.userInfo);
userRouter.post('/findUserStatus',userController.findUserStatus);
// 用户设置界面
userRouter.get('/userSpec',userController.userSpec);
// 用户邮箱 显示细节+删除信件
userRouter.get('/userEmail',userController.userEmail);
userRouter.post('/showEmailDetail',userController.showEmailDetail);
userRouter.post('/removeUserEmail',userController.removeUserEmail);
// 用户简历 + 提交
userRouter.get('/userResume',userController.userResume);
userRouter.post('/submitResume',userController.submitResume);
// 用户收藏 设置+移除
userRouter.get('/userCollect',userController.userCollect);
userRouter.post('/setCollect',userController.setCollect);
userRouter.post('/removeCollect',userController.removeCollect);
userRouter.post('/removeCollectSpec',userController.removeCollectSpec); //用户界面
userRouter.post('/colsel',userController.colsel); //判断resume
// 用户信息简介
userRouter.get('/userIndex',userController.userIndex);
// 修改密码
userRouter.post('/updatePass',userController.updatePass);

// 上传简历到企业
userRouter.post('/subRe',userController.subRe);

// 信息在渲染
userRouter.get('/userExtraInfo',userController.userExtraInfo);
userRouter.get('/addUserAllInfo',userController.addUserAllInfo);
userRouter.post('/UpdateUserInfo',userController.UpdateUserInfo);



module.exports = userRouter ;