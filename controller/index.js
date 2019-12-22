module.exports={
    async showIndex(ctx){
        await ctx.redirect('user/index');
    }
}