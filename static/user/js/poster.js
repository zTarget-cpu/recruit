let dls = document.querySelectorAll('.navi dl');
let enterpriceCotent = document.querySelector('.enterpriceCotent');
let changePage = document.querySelector('.changePage');
// 公司 排序
dls.forEach(dlv=>{
    let as = dlv.querySelectorAll('a');
    as.forEach((av,ak)=>{
        av.addEventListener('click',function (){
            avType = av.innerHTML;
            as.forEach((innera,innerk)=>{
                if(ak == innerk){
                    innera.style.color = '#55cbc4'
                }else{
                    innera.style.color = '#8d92a1'
                }
            })
            axios.post('/user/sortEnInfo',{
                avType
            }).then(res=>{
                let data = res.data;
                let contentData = data.split('<section class="enterpriceCotent enterpriceDL">')[1].split('</section>')[0];
                let changePageData = data.split('<section class="changePage">')[1].split('</section>')[0];
                enterpriceCotent.innerHTML = contentData;
                changePage.innerHTML = changePageData;
                let as = changePage.querySelectorAll('a');
                as.forEach(innerav=>{
                    let page = innerav.innerHTML;
                    innerav.addEventListener('click',function (){
                        axios.post('/user/sortEnInfo',{
                            requestInfo,keywork,page
                        }).then(res=>{
                            let data = res.data;
                            let contentData = data.split('<section class="enterpriceCotent enterpriceDL">')[1].split('</section>')[0];
                            posterContent.innerHTML = contentData
                        })
                    })
                })
            })
        })
    })
})