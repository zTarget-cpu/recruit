window.addEventListener('load',function (){
    let userName=document.querySelector('.userName');
    let userPower =document.querySelector('.userPower');
    let exitSpec =document.querySelector('.exitSpec');
    let inputs = document.querySelectorAll('input');
    let adminUser = document.querySelector('.adminUser');
    let contents = document.querySelectorAll('.content ul li');
    let setUserWrap = document.querySelector('.setUserWrap');
    let tables = setUserWrap.querySelectorAll('table')
    adminUser.innerHTML = localStorage.getItem('adminUser');
    inputs.forEach(v=>{
        v.addEventListener('click',function (){
            v.style.borderColor='#55cbc4';
        })
        v.addEventListener('blur',function (){
            v.style.borderColor='#666';
        })
    })
    // 用户删除
    function setUser(_this){
        let xhr = new XMLHttpRequest();
        xhr.open('post','/admin/usermess',true);
        xhr.onload=function (){
            _this.innerHTML=xhr.responseText;
            let as = _this.querySelectorAll('a');
            let showUserDetail = _this.querySelectorAll('.showUserDetail');
            showUserDetail&&showUserDetail.forEach(v=>{
                v.addEventListener('click',function (){
                    let id = this.getAttribute('pid')
                    axios.post('/admin/showUserDetail',{
                        id
                    }).then(res=>{
                        _this.innerHTML = res.data;
                        let as = _this.querySelectorAll('a');
                        as&&as.forEach(v=>{
                            v.addEventListener('click',function (){
                                setUser(_this)
                            })
                        })
                    })
                })
            })
            as&&as.forEach((v,k)=>{
                v.addEventListener('click',function (){
                    let tr = v.parentNode.parentNode;
                    let username = tr.querySelector('td');
                    let usernameVal = username.innerHTML.split(':')[1].trim();
                    axios.post('/admin/deleteUser',{
                        usernameVal
                    }).then(function (res){
                        if(res.data == 'ok'){
                            axios.post('/admin/usermess').then(function (res){
                                tr.remove();
                            })
                        }
                    })
                })
            })
        }
        xhr.send();
    }
    // 企业删除
    function setenter(_this){
        let xhr = new XMLHttpRequest();
        xhr.open('post','/admin/enmess',true);
        xhr.onload=function (){
            _this.innerHTML=xhr.responseText;
            let showEnterDetail = _this.querySelectorAll('.showEnterDetail');
            let as = _this.querySelectorAll('a');
            showEnterDetail&&showEnterDetail.forEach(v=>{
                v.addEventListener('click',function (){
                    let id = this.getAttribute('pid');
                    axios.post('/admin/showEnterDetail',{
                        id
                    }).then(res=>{
                        _this.innerHTML = res.data;
                        let a = _this.querySelector('a');
                        a.addEventListener('click',function (){
                            setenter(_this)
                        })
                    })
                })
            })
            as&&as.forEach((v,k)=>{
                v.addEventListener('click',function (){
                    let tr = v.parentNode.parentNode;
                    let enname = tr.querySelector('td');
                    let ennameVal = enname.innerHTML.split(':')[1].trim();
                    axios.post('/admin/deleteEnter',{
                        ennameVal
                    }).then(function (res){
                        if(res.data == 'ok'){
                            tr.remove();
                        }
                    })
                })
            })
        }
        xhr.send();
    }
    // 广告发布
    function poblishad(_this){
        let xhr = new XMLHttpRequest();
        xhr.open('post','/admin/adpublish',true);
        xhr.onload=function (){
            _this.innerHTML=xhr.responseText;
            let adSub = _this.querySelector('.adSub');
            adSub.addEventListener('click',function (e){
                e.preventDefault();
                let adTitle = document.querySelector('.adTitle');
                let adTitleVal = adTitle.value;
                let adSource = document.querySelector('.adSource');
                let adSourceVal = adSource.value;
                let adContent = document.querySelector('.adContent');
                let adContentVal = adContent.value;
                // console.log(adTitleVal,adSourceVal,adContentVal)
                axios.post('/admin/subadInfo',{
                    adTitleVal,adSourceVal,adContentVal
                }).then(function (res){
                    function setBorderColor(object){
                        let newobject = Object.assign({
                            adTitleC:'#e3e7ed',
                            adSourceC:'#e3e7ed',
                            adContentC:'#e3e7ed'
                        },object)
                        adTitle.style.borderColor=newobject.adTitleC;
                        adSource.style.borderColor=newobject.adSourceC;
                        adContent.style.borderColor=newobject.adContentC
                    }
                    switch (res.data.info){
                        // #e3e7ed
                        case 'adTitleArr':setBorderColor({adTitleC:'#ff552e'});
                        break;
                        case 'adSourceArr':setBorderColor({adSourceC:'#ff552e'});
                        break;
                        case 'adContentErr':setBorderColor({adContentC:'#ff552e'});
                        break;
                        case 'ok' :
                            let yes = document.querySelector('.setUserWrap .yes');
                            yes.style.display = 'block';
                            setTimeout(() => {
                                yes.style.display = 'none';
                                window.location.href='/admin/adminInfo';
                            }, 1000);
                        break;
                    }
                })
            })
        }
        xhr.send();
        poblishad=null;
    }
    // 广告删除
    function setad(_this){
        let xhr = new XMLHttpRequest();
        xhr.open('post','/admin/adInfo',true);
        xhr.onload=function (){
            _this.innerHTML=xhr.responseText.split('<section class="changePage">')[0];
            let as = _this.querySelectorAll('a');
            let showAdInfoDetail = _this.querySelectorAll('.showAdInfoDetail');
            showAdInfoDetail&&showAdInfoDetail.forEach(v=>{
                v.addEventListener('click',function (){
                    let id = this.getAttribute('pid');
                    axios.post('/admin/showAdDetail',{
                        id
                    }).then(res=>{
                        _this.innerHTML = res.data;
                        let a = _this.querySelector('a');
                        a.addEventListener('click',function (){
                            setad(_this)
                        })
                    })
                })
            })
            as.forEach(v=>{
                v&&v.addEventListener('click',function (){
                    let id = v.className;
                    let tr = v.parentNode.parentNode;
                    // console.log(id)
                    axios.post('/admin/deletead',{
                        id
                    }).then(function (res){
                        if(res.data == 'ok'){
                            tr.remove();
                        }
                    })
                })
            })
        }
        xhr.send();
    }
    // admin 中心
    contents.forEach((v,k)=>{
        v.addEventListener('click',function (){
            v.style.borderRightColor='#55cbc4';
            v.style.backgroundColor = '#fff'
            let a = v.querySelector('a');
            a.style.color = '#55cbc4';
            tables.forEach((tablev,tablek)=>{
                if(tablek == k){
                    tablev.style.display = 'block';
                    if(k==1){
                        setUser&&setUser(tablev)
                    }else if(k==2){
                        setenter&&setenter(tablev);
                    }else if(k==3){
                        poblishad&&poblishad(tablev);
                    }else if(k==4){
                        setad&&setad(tablev);
                    }
                }else{
                    tablev.style.display = 'none'
                }
            })
            contents.forEach((value,key)=>{
                if(key!=k){
                    value.style.borderRightColor='#eef0f5';
                    value.style.backgroundColor = '#f6f6f8'
                    let a = value.querySelector('a');
                    a.style.color = '#9ca1ad';
                }
            })
        })
    })





    // admin 退出
    userName.addEventListener('mouseover',function (){
        this.style.color = '#55cbc4';
        this.style.cursor='pointer';
        userPower.style.display='block';
        userPower.addEventListener('mouseover',function(){
            userPower.style.display='block'
        })
    })
    userName.addEventListener('mouseout',function (){
        this.style.color = '#fff';
        userPower.style.display='none';
        userPower.addEventListener('mouseout',function(){
            userPower.style.display='none'
        })
    })
    exitSpec.addEventListener('click',function (){
        localStorage.removeItem('adminUser');
    })
})
// >li:hover{
//     background: #fff;
//     border-right: 2px solid @color;
//     color: #414a90;
//     >a{
//         color: #414a90;
//     }
// }