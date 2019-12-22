let setCollect = document.querySelector('.setCollect');
let outspan = setCollect.querySelector('span');
let username = localStorage.getItem('user');
let lll = setCollect.getAttribute('lll');
let enterpriceName = lll.split('-')[0];
let recruititle = lll.split('-')[1];
// 收藏
setCollect.addEventListener('click',function (){
    if(!localStorage.getItem('user')){
        window.location.href='/user/showLogin';
        return false
    }
    let innerspan = setCollect.querySelector('span');
    // fa-thumbs-up
    if(innerspan.classList.contains('fa-thumbs-o-up')){
        axios.post('/user/setCollect',{
            username,enterpriceName,recruititle
        }).then(res=>{
            console.log(res.data.info)
            if(res.data.info=='ok'){
                innerspan.className='fa fa-thumbs-up';
            }
        })
    }else{
        axios.post('/user/removeCollect',{
            username,enterpriceName,recruititle
        }).then(res=>{
            if(res.data.info=='ok'){
                innerspan.className='fa fa-thumbs-o-up';
            }
        })
    }

    
    // axios.post('/user/setCollect',{
    //     username,enterpriceName,recruititle
    // }).then(res=>{
    //     console.log(res)
    // })
})
window.onload=function (){
    axios.post('/user/colsel',{
        username,enterpriceName,recruititle
    }).then(res=>{
        let resInfo = res.data.info;
        if(resInfo == 'ok'){
            outspan.className = 'fa fa-thumbs-up'
        }else{
            outspan.className = 'fa fa-thumbs-o-up'
        }
    })
}

// 上传简历
let naviList2 = document.querySelector('.naviList2');
let a = naviList2.querySelectorAll('a')[0];
function subResume(){
    let enterpricename = document.querySelector('.naviList').querySelectorAll('li')[0].innerHTML;
    let SpecLiTitle = document.querySelector('.SpecLiTitle').getAttribute('Spectitle');
    if(localStorage.getItem('user')){
        let username = localStorage.getItem('user');
        axios.post('/user/subRe',{
            enterpricename,username,SpecLiTitle
        }).then(function (res){
            switch (res.data.info){
                case 'resumeErr':alert('请前往个人中心上传简历');
                break;
                case 'ok' :alert('发送成功');
                break;
            }
        });
        a.removeEventListener('click',subResume);
    }else{
        window.location.href='/user/showLogin'
    }
}
a.addEventListener('click',subResume);