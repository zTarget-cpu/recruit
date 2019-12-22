let nav = document.querySelector('.naviLIst');
let posterContent = document.querySelector('.posterContent');
let changePage = document.querySelector('.changePage');
// 导航栏 open hidden
nav.addEventListener('mouseover',function (e){
    let li=e.target.querySelector('dl');
    if(e.target.tagName == 'LI'){
        li.style.display = 'block';
    }
    li&&li.addEventListener('mouseover',function (){
        this.style.display='block'
    })
})
nav.addEventListener('mouseout',function (e){
    let nav1=nav.querySelectorAll('dl');
    nav1.forEach(v => {
        v.style.display='none';
    });
})


// 排序 公司信息
let keywork = window.location.href.split('keyWork=')[1];
let lis = nav.querySelectorAll('li');
lis.forEach((v,k)=>{
    let vSpan = v.querySelector('span');
    let vdl = v.querySelector('dl');
    let vAs = v.querySelectorAll('a');
    vAs.forEach((av,ak)=>{
        av.addEventListener('click',function (){
            let laterTag = av.innerHTML
            vSpan.innerHTML = laterTag;
            vdl.style.display = 'none';
            let requestInfo = [];
            lis.forEach((innerv,innnerk)=>{
                let innerSpan = innerv.querySelector('span').innerHTML;
                requestInfo.push(innerSpan);
            })
            if(typeof keywork != 'undefined'){
                axios.post('/user/sortInfoInKey',{
                    requestInfo,keywork
                }).then(res=>{
                    let data = res.data;
                    let contentData = data.split('<section class="posterContent">')[1].split('</section>')[0];
                    let changePageData = data.split('<section class="changePage">')[1].split('</section>')[0];
                    posterContent.innerHTML = contentData
                    changePage.innerHTML = changePageData;
                    let as = changePage.querySelectorAll('a');
                    as.forEach(innerav=>{
                        let page = innerav.innerHTML;
                        innerav.addEventListener('click',function (){
                            axios.post('/user/sortInfoInKey',{
                                requestInfo,keywork,page
                            }).then(res=>{
                                let data = res.data;
                                let contentData = data.split('<section class="posterContent">')[1].split('</section>')[0];
                                posterContent.innerHTML = contentData
                            })
                        })
                    })
                })
            }else{
                axios.post('/user/sortInfo',{
                    requestInfo
                }).then(res=>{
                    let data = res.data;
                    let contentData = data.split('<section class="posterContent">')[1].split('</section>')[0];
                    let changePageData = data.split('<section class="changePage">')[1].split('</section>')[0];
                    posterContent.innerHTML = contentData
                    changePage.innerHTML = changePageData;
                    let as = changePage.querySelectorAll('a');
                    as.forEach(innerav=>{
                        let page = innerav.innerHTML;
                        innerav.addEventListener('click',function (){
                            axios.post('/user/sortInfo',{
                                requestInfo,page
                            }).then(res=>{
                                let data = res.data;
                                let contentData = data.split('<section class="posterContent">')[1].split('</section>')[0];
                                posterContent.innerHTML = contentData
                            })
                        })
                    })
                })
            }
        })
    })
})
