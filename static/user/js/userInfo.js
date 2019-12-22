window.addEventListener('load',function (){
    let inputs = document.querySelectorAll('input');
    let specList = document.querySelector('.specList');
    let contents = document.querySelectorAll('.content ul li');
    let setUserWrap = document.querySelector('.setUserWrap');
    let tables = setUserWrap.querySelectorAll('table');
    let user = localStorage.getItem('user');
    axios.post('/user/findUserStatus',{
        user
    }).then(function (res){
        if(res.data.info == 1){
            specList.innerHTML = '信息修改'
        }
    })
    inputs.forEach(v=>{
        v.addEventListener('click',function (){
            v.style.borderColor='#55cbc4';
        })
        v.addEventListener('blur',function (){
            v.style.borderColor='#666';
        })
    })
    userExtraInfo();
    // 在渲染界面
    function userExtraInfo(){
        let _this = document.querySelector('.userAllInfo');
        let user=localStorage.getItem('user');
        let xhr = new XMLHttpRequest();
        xhr.open('get','/user/userExtraInfo?user='+user,true);
        xhr.onload=function (){
            // 返回 渲染视图
            _this.innerHTML=xhr.responseText;
        }
        xhr.send();
        userExtraInfo = null;
    }
    // 用户修改密码
    function userManage(_this){
        let xhr = new XMLHttpRequest();
        xhr.open('get','/user/userSpec',true);
        xhr.onload=function (){
            _this.innerHTML=xhr.responseText;
            let user = localStorage.getItem('user');
            let school = localStorage.getItem('school');
            let userVal = document.querySelector('.beuser');
            let schoolVal = document.querySelector('.beschool');
            userVal.innerHTML = user;
            schoolVal.innerHTML = school;
            let updatePass = document.querySelector('.updatePass');
            updatePass.addEventListener('click',function (){
                let password = _this.querySelector('.password');
                let enterpass = _this.querySelector('.enterpass');
                let userVal = localStorage.getItem('user');
                let passVal = password.value;
                let enterVal = enterpass.value;
                // console.log(passVal,enterVal);
                axios.post('/user/updatePass',{
                    passVal,enterVal,userVal
                },{
                    header:{'Content-type': 'application/x-www-form-urlencoded'}
                }).then(function (res){
                    function setBorderColor(object){
                        let newobject = Object.assign({
                            passwordC:'#e3e7ed',
                            enterpassC:'#e3e7ed',
                        },object)
                        password.style.borderColor=newobject.passwordC;
                        enterpass.style.borderColor=newobject.enterpassC;
                    }
                    switch (res.data.info){
                        case 'passErr':setBorderColor({passwordC:'#ff552e'});break;
                        case 'twoPassErr':setBorderColor({passwordC:'#ff552e',enterpass:'#ff552e'});break;
                        case 'ok': localStorage.clear();
                        let yes = document.querySelector('.setUserWrap .yes');
                        yes.style.display = 'block';
                        setTimeout(() => {
                            yes.style.display = 'none';
                            window.location.href='/user/index'
                        }, 1000);
                        break;
                    }
                })
            })
        }
        xhr.send();
        userManage=null;
    }
    // 完善信息
    function allInfoSub(_this){
        let xhr = new XMLHttpRequest();
        xhr.open('get','/user/addUserAllInfo',true);
        xhr.onload=function (){
            // 返回 渲染视图
            _this.innerHTML=xhr.responseText;

            // 设置点击提交事件
            let subInfo = _this.querySelector('.subInfo');
            subInfo.addEventListener('click',function (e){
                e.preventDefault();
                let realname = _this.querySelector('.realname');
                let realnameVal = realname.value;
                let age = _this.querySelector('.age');
                let ageVal = age.value;
                let address = _this.querySelector('.address');
                let addressVal = address.value.trim();
                let subject = _this.querySelector('.subject');
                let subjectVal = subject.value;
                let email = _this.querySelector('.email');
                let emailVal = email.value;
                axios.post('/user/UpdateUserInfo',{
                    realnameVal,ageVal,addressVal,subjectVal,emailVal,user
                },{
                    header:{'Content-type': 'application/x-www-form-urlencoded'}
                }).then(function (res){
                    function setBorderColor(object){
                        let newobject = Object.assign({
                            realnameC:'#e3e7ed',
                            ageC:'#e3e7ed',
                            addressC:'#e3e7ed',
                            subjectC:'#e3e7ed',
                            emailC:'#e3e7ed'
                        },object)
                        realname.style.borderColor=newobject.realnameC;
                        age.style.borderColor=newobject.ageC;
                        address.style.borderColor=newobject.addressC;
                        subject.style.borderColor=newobject.subjectC;
                        email.style.borderColor=newobject.emailC;
                    }
                    switch (res.data.info){
                        // #e3e7ed
                        case 'realnameErr':setBorderColor({realnameC:'#ff552e'});
                        break;
                        case 'ageErr':setBorderColor({ageC:'#ff552e'});
                        break;
                        case 'addressErr':setBorderColor({addressC:'#ff552e'});
                        break;
                        case 'subjectErr':setBorderColor({subjectC:'#ff552e'});
                        break;
                        case 'emailErr':setBorderColor({emailC:'#ff552e'});
                        break;
                        case 'ok' :
                            let yes = document.querySelector('.setUserWrap .yes');
                            yes.style.display = 'block';
                            setTimeout(() => {
                                yes.style.display = 'none';
                                window.location.href='/user/showuserInfo';
                            }, 1000);
                        break;
                    }
                })
            })
        }
        xhr.send();
    }
    // 上传简历
    function subRecruit(_this){
        let xhr = new XMLHttpRequest();
        xhr.open('get','/user/userResume',true);
        xhr.onload=function (){
            _this.innerHTML=xhr.responseText;
            let resume = _this.querySelector('.resume');
            resume.addEventListener('change',function (){
                resume = _this.querySelector('.resume')
                let file = resume.files[0];
                let username = localStorage.getItem('user');
                let form = new FormData();
                form.append('img',file)
                form.append('username',username)
                let xhr = new XMLHttpRequest();
                xhr.open('post','/user/submitResume',true);
                xhr.onload = function (){
                    let res = JSON.parse(xhr.responseText);
                    let resInfo = res.info;
                    switch (resInfo){
                        case 'dcmErr':
                        let no = document.querySelector('.setUserWrap .no');
                        no.style.display = 'block';
                        setTimeout(() => {
                            no.style.display = 'none';
                        }, 1000);
                        break;
                        case 'ok': 
                        let yes = document.querySelector('.setUserWrap .yes');
                        yes.style.display = 'block';
                        setTimeout(() => {
                            yes.style.display = 'none';
                            window.location.href='/user/showuserInfo'
                        }, 1000);
                        break;
                    }
                }
                xhr.send(form)
            })
        }
        xhr.send();
        subRecruit=null;
    }
    // 用户邮件
    function receive(_this){
        let user = localStorage.getItem('user');
        let xhr = new XMLHttpRequest();
        xhr.open('get','/user/userEmail?username='+user,true);
        xhr.onload=function (){
            _this.innerHTML=xhr.responseText;
            let a = _this.querySelectorAll('a');
            a.forEach((v,k)=>{
                if(k%2 == 0){
                    v&&v.addEventListener('click',function (){
                        let id = v.getAttribute('initId');
                        axios.post('/user/showEmailDetail',{
                            id
                        }).then(function (res){
                            _this.innerHTML=res.data;
                        })
                    })
                }else{
                    v&&v.addEventListener('click',function (){
                        let parentA = v.parentNode.parentNode;
                        let id = parentA.querySelectorAll('td')[0].querySelector('a').getAttribute('initId');
                        axios.post('/user/removeUserEmail',{
                            id
                        }).then(function (res){
                            if(res.data.info == 'ok'){
                                parentA.remove();
                            }
                        })
                    })
                }
            })
        }
        xhr.send();
    }
    // 收藏
    function collectMan(_this){
        let user = localStorage.getItem('user');
        let xhr = new XMLHttpRequest();
        xhr.open('get','/user/userCollect?username='+user,true);
        xhr.onload=function (){
            _this.innerHTML=xhr.responseText;
            let as = _this.querySelectorAll('a');
            as.forEach((v,k)=>{
                if(k%2 != 0){
                    v&&v.addEventListener('click',function (){
                        let pid = v.getAttribute('pid');
                        let parentA = v.parentNode.parentNode;
                        let enterpriceName = parentA.querySelectorAll('td')[0].querySelector('a').innerHTML.split(':')[1];
                        let recruititle = parentA.querySelectorAll('td')[1].innerHTML.split(':')[1];
                        axios.post('/user/removeCollectSpec',{
                            pid,enterpriceName,recruititle
                        }).then(function (res){
                            if(res.data.info == 'ok'){
                                axios.get('/user/userCollect').then(function (res){
                                    if(res.data == '<p>赶紧去收藏吧！</p>'){
                                        _this.innerHTML = res.data;
                                    }else{
                                        parentA.remove();
                                    }
                                })
                            }
                        })
                    })
                }
            })
        }
        xhr.send();
    }
    // 个人中心 分类
    contents.forEach((v,k)=>{
        v.addEventListener('click',function (){
            v.style.borderRightColor='#55cbc4';
            v.style.backgroundColor = '#fff'
            let a = v.querySelector('a');
            if(a){
                a.style.color = '#55cbc4';
            }
            tables.forEach((tablev,tablek)=>{
                if(tablek == k){
                    tablev.style.display = 'block';
                    if(k==0){
                        userExtraInfo&&userExtraInfo();
                    }else if(k==1){
                        userManage&&userManage(tablev)
                    }else if(k==2){
                        allInfoSub&&allInfoSub(tablev);
                    }else if(k==3){
                        receive&&receive(tablev);
                    }else if(k==4){
                        subRecruit&&subRecruit(tablev);
                    }else if(k==5){
                        collectMan&&collectMan(tablev);
                    }
                }else{
                    tablev.style.display = 'none'
                }
            })
            // if(k==0){
            //     xhr.open('get','/user/userIndex',true);
            // }else if(k==1){
            //     xhr.open('get','/user/userSpec',true);
            // }else if(k==2){
            //     xhr.open('get','/user/userEmail',true);
            // }else if(k==3){
            //     xhr.open('get','/user/userResume',true);
            // }else if(k==4){
            //     xhr.open('get','/user/userCollect',true);
            // }
            // xhr.onload=function (){
            //     setUserWrap.innerHTML=xhr.responseText;
            //     if(k==0 || k==1){
            //         let user = localStorage.getItem('user');
            //         let school = localStorage.getItem('school');
            //         let userVal = document.querySelector('.user');
            //         let schoolVal = document.querySelector('.school');
            //         userVal.innerHTML = user;
            //         schoolVal.innerHTML = school;
            //     }
            //     if(k==1){
            //         // updatePass
            //         let updatePass = document.querySelector('.updatePass');
            //         updatePass.addEventListener('click',function (){
            //             let password = document.querySelector('.password');
            //             let enterpass = document.querySelector('.enterpass');
            //             let userVal = localStorage.getItem('user');
            //             let passVal = password.value;
            //             let enterVal = enterpass.value;
            //             // console.log(passVal,enterVal);
            //             axios.post('/user/updatePass',{
            //                 passVal,enterVal,userVal
            //             },{
            //                 header:{'Content-type': 'application/x-www-form-urlencoded'}
            //             }).then(function (res){
            //                 switch (res.data.info){
            //                     case 'passErr': password.style.borderColor = '#ff552e';break;
            //                     case 'twoPassErr': password.style.borderColor = '#ff552e'; enterpass.style.borderColor = '#ff552e';break;
            //                     case 'ok': localStorage.clear();window.location.href='/user/index';break;
            //                     case 'sqlErr': password.style.borderColor = '#ff552e'; enterpass.style.borderColor = '#ff552e';break;
            //                 }
            //             })
            //         })
            //     }
            //     if(k==3){
            //         let resume = document.querySelector('.resume');
            //         let submitResume = document.querySelector('.submitResume');
            //         submitResume.addEventListener('click',function (){
            //             if(resume.files[0] == undefined){
            //                 resume.click();
            //             }else{
            //                 let files  =  resume.files[0];
            //                 let formdata = new FormData();
            //                 formdata.append('files',files);
            //                 axios.post('/user/submitResume',{
            //                     formdata
            //                 },{
            //                     header:{'Content-type': 'application/x-www-form-urlencoded'}
            //                 }).then(function (res){
            //                     console.log(res)
            //                 })
            //             }
            //         })
            //     }
            // }
            // xhr.send();
            contents.forEach((value,key)=>{
                if(key!=k){
                    value.style.borderRightColor='#eef0f5';
                    value.style.backgroundColor = '#f6f6f8'
                    let a = value.querySelector('a');
                    if(a){
                        a.style.color = '#9ca1ad';
                    }
                }
            })
        })
    })
})