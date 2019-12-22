let inputs = document.querySelectorAll('input');
inputs.forEach(v=>{
    v.addEventListener('click',function (){
        v.style.borderColor='#55cbc4';
    })
    v.addEventListener('blur',function (){
        v.style.borderColor='#666';
    })
})

// 登录
let login = document.querySelector('.login');
login.addEventListener('click',function (){
    let username = document.querySelector('.user');
    let userVal = username.value;
    let password = document.querySelector('.password');
    let passVal = password.value;
    axios.post('/user/checkUser',{
        userVal,
        passVal
    },{
        header:{'Content-type': 'application/x-www-form-urlencoded'}
    }).then(function (res){
        switch (res.data.info){
            case 'userErr':username.style.borderColor='#ff552e';
            break;
            case 'passErr':password.style.borderColor='#ff552e';Enterpassword.style.borderColor='#ff552e';
            break;
            case 'allErr':username.style.borderColor='#ff552e';password.style.borderColor='#ff552e';
            break;
            case 'ok' :window.localStorage.setItem('user',userVal);window.localStorage.setItem('school',res.data.school); window.location.href='/user/index';
            break;
        }
    })
})