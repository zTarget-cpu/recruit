let inputs = document.querySelectorAll('input');
inputs.forEach(v=>{
    v.addEventListener('click',function (){
        v.style.borderColor='#55cbc4';
    })
    v.addEventListener('blur',function (){
        v.style.borderColor='#666';
    })
})
let login = document.querySelector('.login');
login.addEventListener('click',function (){
    let user = document.querySelector('.user');
    let userVal = user.value;
    let password = document.querySelector('.password');
    let passVal = password.value;
    axios.post('/admin/checkUser',{
        userVal,passVal
    },{
        header:{'Content-type': 'application/x-www-form-urlencoded'}
    }).then(function (res){
        function setBorderColor(object){
            let newobject = Object.assign({
                userC:'#e3e7ed',
                passwordC:'#e3e7ed',
            },object)
            user.style.borderColor=newobject.userC;
            password.style.borderColor=newobject.passwordC;
        }
        switch (res.data.info){
            case 'userErr':setBorderColor({userC:'#ff552e'});
            break;
            case 'passErr':setBorderColor({passwordC:'#ff552e'});
            break;
            case 'allErr':setBorderColor({passwordC:'#ff552e',userC:'#ff552e'});
            break;
            case 'ok' :window.localStorage.setItem('adminUser',userVal);window.location.href='/admin/adminInfo';
            break;
        }
    })
})