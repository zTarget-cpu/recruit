window.addEventListener('load',function (){
    let userName=document.querySelector('.userName');
    let userPower =document.querySelector('.userPower');
    let specList = document.querySelector('.specList');
    let exitSpec =document.querySelector('.exitSpec');
    let inputs = document.querySelectorAll('input');
    let contents = document.querySelectorAll('.content ul li');
    let enuser = this.localStorage.getItem('enterpriceUser');
    let specListtoggle = document.querySelector('.specListtoggle');
    axios.post('/enterprice/findEnterStatus',{
        enuser
    }).then(function (res){
        if(res.data.info == 1){
            specList.innerHTML = '企业修改'
        }
    })
    test();
    function test(){
        axios.post('/enterprice/findEnterpid',{
            enuser
        }).then(function (res){
            if(res.data.info == 1){
                specListtoggle.style.display = 'block'
            }else{
                specListtoggle.style.display = 'none'
            }
        })
    }
    let setUserWrap = document.querySelector('.setUserWrap');
    inputs.forEach(v=>{
        v.addEventListener('click',function (){
            v.style.borderColor='#55cbc4';
        })
        v.addEventListener('blur',function (){
            v.style.borderColor='#666';
        })
    })
    eleExtraInfo();
    // 再次渲染
    function eleExtraInfo(){
        let _this = document.querySelector('.enterset');
        let enUser = localStorage.getItem('enterpriceUser');
        let xhr = new XMLHttpRequest();
        xhr.open('get','/enterprice/showEleInfo?enUser='+enUser,true);
        xhr.onload=function (){
            // 返回 渲染视图
            _this.innerHTML=xhr.responseText;
            let enterprice = document.querySelector('.enterprice');
            let user = document.querySelector('.user');
            enterprice.innerHTML=localStorage.getItem('enterprice');
            user.innerHTML=localStorage.getItem('enterpriceUser');
        }
        xhr.send();
        eleExtraInfo = null;
    }
    // 企业设置
    function setEnterInfo(_this){
        let xhr = new XMLHttpRequest();
        xhr.open('get','/enterprice/enterpriceInfo',true);
        xhr.onload=function (){
            // 返回 渲染视图
            _this.innerHTML=xhr.responseText;
            let user = localStorage.getItem('enterpriceUser');
            let enterprice = localStorage.getItem('enterprice');
            let userVal = _this.querySelector('.user');
            let enterpriceVal = _this.querySelector('.enterprice');
            userVal.innerHTML = user;
            enterpriceVal.innerHTML = enterprice;

            // 设置点击提交事件
            let enterpriceInfo = _this.querySelector('.enterpriceInfo');
            enterpriceInfo.addEventListener('click',function (e){
                e.preventDefault();
                let boos = document.querySelector('.boos');
                let boosVal = boos.value;
                let address = document.querySelector('.address');
                let addressVal = address.value;
                let enwelfare = document.querySelector('.enwelfare');
                let enwelfareVal = enwelfare.value.trim();
                let enterpriceSize = document.querySelector('.enterpriceSize');
                let enterpriceSizeVal = enterpriceSize.value;
                let userVal = localStorage.getItem('enterpriceUser');
                axios.post('/enterprice/update_Some_one',{
                    boosVal,addressVal,enwelfareVal,enterpriceSizeVal,userVal
                },{
                    header:{'Content-type': 'application/x-www-form-urlencoded'}
                }).then(function (res){
                    function setBorderColor(object){
                        let newobject = Object.assign({
                            boosC:'#e3e7ed',
                            addressC:'#e3e7ed',
                            enwelfareC:'#e3e7ed',
                            enterpriceSizeC:'#e3e7ed'
                        },object)
                        boos.style.borderColor=newobject.boosC;
                        address.style.borderColor=newobject.addressC;
                        enwelfare.style.borderColor=newobject.enwelfareC;
                        enterpriceSize.style.borderColor=newobject.enterpriceSizeC;
                    }
                    switch (res.data.info){
                        // #e3e7ed
                        case 'boosErr':setBorderColor({boosC:'#ff552e'});
                        break;
                        case 'addresssErr':setBorderColor({addressC:'#ff552e'});
                        break;
                        case 'welfareErr':setBorderColor({enwelfareC:'#ff552e'});
                        break;
                        case 'enterpriceSizeErr':setBorderColor({enterpriceSizeC:'#ff552e'});
                        break;
                        case 'ok' :
                            let yes = document.querySelector('.setUserWrap .yes');
                            yes.style.display = 'block';
                            setTimeout(() => {
                                yes.style.display = 'none';
                                window.location.href='/enterprice/conIndex';
                            }, 1000);
                        break;
                    }
                })
            })
        }
        xhr.send();
        setEnterInfo = null;
    };
    // 企业发布招聘
    function enterRecruit(_this){
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        let userVal = localStorage.getItem('enterpriceUser');
        formData.append('userVal',userVal);
        xhr.open('post','/enterprice/enterpriceRecruit',true);
        xhr.onload=function (){
            _this.innerHTML = xhr.responseText;
            if(xhr.responseText.length>600){
                let recruitSub = document.querySelector('.recruitSub');
                recruitSub.addEventListener('click',function (e){
                    e.preventDefault();
                    let recruititle = document.querySelector('.recruititle');
                    let recruititleVal = recruititle.value;
                    let describes = document.querySelector('.describes');
                    let describesVal = describes.value;
                    let works = document.querySelector('.works');
                    let worksVal = works.value.trim();
                    let worksqualify = document.querySelector('.worksqualify');
                    let worksqualifyVal = worksqualify.value;
                    let enterpriceSim = document.querySelector('.enterpriceSim');
                    let enterpriceSimVal = enterpriceSim.value;
                    let schoolqualify = document.querySelector('.schoolqualify');
                    let schoolqualifyVal = schoolqualify.value;
                    let salary = document.querySelector('.salary');
                    let salaryVal = salary.value;
                    let userVal = localStorage.getItem('enterpriceUser');
                    axios.post('/enterprice/update_Some_two',{
                        recruititleVal,describesVal,worksVal,worksqualifyVal,enterpriceSimVal,schoolqualifyVal,salaryVal,userVal
                    },{
                        header:{'Content-type': 'application/x-www-form-urlencoded'}
                    }).then(function (res){
                        function setBorderColor(object){
                            let newobject = Object.assign({
                                recruititleC:'#e3e7ed',
                                describesC:'#e3e7ed',
                                worksC:'#e3e7ed',
                                worksqualifyC:'#e3e7ed',
                                enterpriceSimC:'#e3e7ed',
                                schoolqualifyC:'#e3e7ed',
                                salaryC:'#e3e7ed'
                            },object)
                            recruititle.style.borderColor=newobject.recruititleC;
                            describes.style.borderColor=newobject.describesC;
                            works.style.borderColor=newobject.worksC;
                            worksqualify.style.borderColor=newobject.worksqualifyC;
                            enterpriceSim.style.borderColor=newobject.enterpriceSimC;
                            schoolqualify.style.borderColor=newobject.schoolqualifyC;
                            salary.style.borderColor=newobject.salaryC;
                        }
                        switch (res.data.info){
                            // #e3e7ed
                            case 'recruititleValErr':setBorderColor({recruititleC:'#ff552e'});
                            break;
                            case 'describesValErr':setBorderColor({describesC:'#ff552e'});
                            break;
                            case 'worksValErr':setBorderColor({worksC:'#ff552e'});
                            break;
                            case 'worksqualifyValErr':setBorderColor({worksqualifyC:'#ff552e'});
                            break;
                            case 'enterpriceSimValErr':setBorderColor({enterpriceSimC:'#ff552e'});
                            break;
                            case 'schoolqualifyValErr':setBorderColor({schoolqualifyC:'#ff552e'});
                            break;
                            case 'salaryValErr':setBorderColor({salaryC:'#ff552e'});
                            break;
                            case 'ok' :
                                let yes = document.querySelector('.setUserWrap .yes');
                                yes.style.display = 'block';
                                setTimeout(() => {
                                    yes.style.display = 'none';
                                    window.location.href='/enterprice/conIndex';
                                }, 1000);
                            break;
                        }
                    })
                })
            }
        }
        xhr.send(formData);
        enterRecruit = null;
    }
    // 企业邮箱
    function receive(_this){
        let enUser = localStorage.getItem('enterpriceUser');
        let xhr = new XMLHttpRequest();
        xhr.open('get','/enterprice/enEmail?enUser='+enUser,true);
        xhr.onload=function (){
            _this.innerHTML=xhr.responseText;
            let ShowUserInfo = _this.querySelectorAll('.ShowUserInfo');
            ShowUserInfo&&ShowUserInfo.forEach(v=>{
                v.addEventListener('click',function (){
                    let id = this.getAttribute('pid');
                    axios.post('/enterprice/showUserInfo',{
                        id
                    }).then(res=>{
                        _this.innerHTML = res.data;
                    })
                })
            })
            let a = _this.querySelectorAll('a');
            let loadResume = _this.querySelector('.loadResume');
            a&&a.forEach((v,k)=>{
                if(k % 2 ==0){
                    v.addEventListener('click',function (){
                        let username = v.getAttribute('username')
                        let specTitle = this.getAttribute('specTitle');
                        axios.post('/enterprice/moveRecover',{
                            username
                        }).then(function (res){
                            _this.innerHTML = res.data;
                            let send = _this.querySelector('.send');
                            let enname = localStorage.getItem('enterprice');
                            send.addEventListener('click',function (){
                                let content = _this.querySelector('.messUser');
                                let contentVal = content.value;
                                axios.post('/enterprice/sendUser',{
                                    username,enname,contentVal,specTitle
                                }).then(function (res){
                                    switch (res.data.info){
                                        case 'contentErr':content.style.borderColor='#ff552e';
                                        break;
                                        case 'ok' :
                                            let yes = document.querySelector('.setUserWrap .yes');
                                            yes.style.display = 'block';
                                            setTimeout(function (){
                                                yes.style.display = 'none';
                                                window.location.href='/enterprice/conIndex'
                                            },1000);
                                        break;
                                    }
                                })
                            })
                        })
                    })
                }else{
                    v&&v.addEventListener('click',function (){
                        let parentA = v.parentNode.parentNode;
                        let id = v.getAttribute('pid');
                        axios.post('/enterprice/removeEnEmail',{
                            id
                        }).then(function (res){
                            if(res.data.info == 'ok'){
                                parentA.remove()
                            }
                        })
                    })
                }
            })
            loadResume&&loadResume.addEventListener('click',function (){
                let path = this.getAttribute('path');
                window.open ('/enterprice/loadRe?path='+path);
            })
        }
        xhr.send();
    }
    // 企业招聘管理
    function InfoManage(_this){
        let enUser = localStorage.getItem('enterpriceUser');
        let xhr = new XMLHttpRequest();
        xhr.open('get','/enterprice/showManageInfo?enUser='+enUser,true);
        xhr.onload=function (){
            _this.innerHTML=xhr.responseText;
            let a = _this.querySelectorAll('a');
            let findDetail = _this.querySelectorAll('.findDetail');
            a&&a.forEach((v,k)=>{
                v&&v.addEventListener('click',function (){
                    let parentA = v.parentNode.parentNode;
                    let id = this.getAttribute('id')
                    axios.post('/enterprice/removeRecruInfo',{
                        id
                    }).then(function (res){
                        if(res.data.info == 'ok'){
                            parentA.remove();
                            InfoManage(_this);
                            test();
                        }
                    })
                })
            })
            findDetail&&findDetail.forEach(v=>{
                v.addEventListener('click',function (){
                    let id = this.getAttribute('id')
                    axios.post('/enterprice/showInfoDetail',{
                        id
                    }).then(function (res){
                        _this.innerHTML  = res.data;
                        let as = _this.querySelectorAll('a');
                        as.forEach((v,k)=>{
                            if(k%2==0){
                                v.addEventListener('click',function (){
                                    InfoManage(_this)
                                })
                            }else{
                                v.addEventListener('click',function (){
                                    let id = this.getAttribute('id')
                                    axios.post('/enterprice/removeRecruInfo',{
                                        id
                                    }).then(function (res){
                                        if(res.data.info == 'ok'){
                                            InfoManage(_this);
                                            test();
                                        }
                                    })
                                })
                            }
                        })
                    })
                })
            })
        }
        xhr.send();
    }
    // 企业中心
    contents.forEach((v,k)=>{
        v.addEventListener('click',function (e){
            e.preventDefault();
            v.style.borderRightColor='#55cbc4';
            v.style.backgroundColor = '#fff'
            let a = v.querySelector('a');
            a.style.color = '#55cbc4';
            let tables = setUserWrap.querySelectorAll('table');
            tables.forEach((tablev,tablek)=>{
                if(tablek == k){
                    tablev.style.display = 'block';
                    if(k==0){
                        eleExtraInfo&&eleExtraInfo();
                    }else if(k == 1){
                        setEnterInfo&&setEnterInfo(tablev);
                    }else if(k == 2){
                        receive&&receive(tablev);
                    }else if(k == 3){
                        enterRecruit&&enterRecruit(tablev);
                    }else if(k == 4){
                        InfoManage&&InfoManage(tablev);
                    }
                }else{
                    tablev.style.display = 'none';
                }
            })
            // if(k==0){
            //     enterInfo();
            // }else if(k==1){
            //     setEnterInfo();
            // }else if(k==2){
                
            // }else if(k==3){
                
            // }
            
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




    // 企业 退出
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
        localStorage.removeItem('enterpriceUser');
        localStorage.removeItem('enterprice');
    })
})