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
register.addEventListener('click',function (){
    let username = document.querySelector('.user');
    let userVal = username.value;
    let password = document.querySelector('.password');
    let passVal = password.value;
    let Enterpassword = document.querySelector('.Enterpassword');
    let enterVal = Enterpassword.value;
    let enterprice = document.querySelector('.enterprice');
    let enterpriceVal = enterprice.value;
    axios.post('/enterprice/enterlogon',{
        userVal,passVal,enterVal,enterpriceVal
    },{
        header:{'Content-type': 'application/x-www-form-urlencoded'}
    }).then(function (res){
        console.log(res.data.info)
        switch (res.data.info){
            case 'userErr':username.style.borderColor='#ff552e';
            break;
            case 'passErr':password.style.borderColor='#ff552e';Enterpassword.style.borderColor='#ff552e';
            break;
            case 'enterpriceErr':enterprice.style.borderColor='#ff552e';
            break;
            case 'allErr':enterprice.style.borderColor='#ff552e';username.style.borderColor='#ff552e';password.style.borderColor='#ff552e';Enterpassword.style.borderColor='#ff552e';
            break;
            case 'ok':window.localStorage.setItem('enterpriceUser',userVal);window.localStorage.setItem('enterprice',enterpriceVal); window.location.href='/enterprice/conIndex'; break;
        }
    })
})