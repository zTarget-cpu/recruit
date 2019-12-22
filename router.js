let userRouter = require('./router/user');
let enterpriceRouter = require('./router/enterprice')
let adminRouter = require('./router/admin')
let indexRouter = require('./router/index')
module.exports = (app)=>{
    app.use(userRouter.routes())
    app.use(enterpriceRouter.routes())
    app.use(adminRouter.routes());
    app.use(indexRouter.routes());
}