let Controller = require('../controller/index')
const Router = require('koa-router');
let indexRouter = new Router()

indexRouter.get('/',Controller.showIndex);

module.exports = indexRouter ;