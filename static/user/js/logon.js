let inputs = document.querySelectorAll('input');
let register = document.querySelector('.register');

inputs.forEach(v=>{
    v.addEventListener('click',function (){
        v.style.borderColor='#55cbc4';
    })
    v.addEventListener('blur',function (){
        v.style.borderColor='#666';
    })
})
// 注册
register.addEventListener('click',function (){
    let username = document.querySelector('.user');
    let userVal = username.value;
    let password = document.querySelector('.password');
    let passVal = password.value;
    let Enterpassword = document.querySelector('.Enterpassword');
    let enterVal = Enterpassword.value;
    let school = document.querySelector('.school');
    let schoolVal = school.value;
    axios.post('/user/logon',{
        userVal,passVal,enterVal,schoolVal
    },{
        header:{'Content-type': 'application/x-www-form-urlencoded'}
    }).then(function (res){
        function setBorderColor(object){
            let newobject = Object.assign({
                usernameC:'#666',
                passwordC:'#666',
                EnterpasswordC:'#666',
                schoolC:'#666'
            },object)
            username.style.borderColor=newobject.usernameC;
            password.style.borderColor=newobject.passwordC;
            Enterpassword.style.borderColor=newobject.EnterpasswordC;
            school.style.borderColor=newobject.schoolC;
        }
        switch (res.data.info){
            case 'userErr':setBorderColor({usernameC:'#ff552e'});
            break;
            case 'passErr':setBorderColor({passwordC:'#ff552e',EnterpasswordC:'#ff552e'});
            break;
            case 'schoolErr':setBorderColor({schoolC:'#ff552e'});
            break;
            case 'ok':window.localStorage.setItem('user',userVal);window.localStorage.setItem('school',schoolVal); window.location.href='/user/index'; break;
        }
    })
})