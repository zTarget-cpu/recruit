let inputs = document.querySelectorAll('input');
inputs.forEach(v=>{
    v.addEventListener('click',function (){
        v.style.borderColor='#55cbc4';
    })
    v.addEventListener('blur',function (){
        v.style.borderColor='#666';
    })
})
// let aSpecs = document.querySelectorAll('.aSpec a');
// aSpecs.forEach((v,k)=>{
//     v.addEventListener('click',function (){
//         v.style.color='#ff552e';
//         v.style.borderColor='#ff552e';
//         aSpecs.forEach((value,key)=>{
//             if(k!=key){
//                 value.style.color='#666';
//                 value.style.borderColor='#ebebeb';
//             }
//         })
//     })
// })
let login = document.querySelector('.login');
login.addEventListener('click',function (){
    let username = document.querySelector('.user');
    let userVal = username.value;
    let password = document.querySelector('.password');
    let passVal = password.value;
    axios.post('/enterprice/checkUser',{
        userVal,
        passVal
    },{
        header:{'Content-type': 'application/x-www-form-urlencoded'}
    }).then(function (res){
        switch (res.data.info){
            case 'userErr':username.style.borderColor='#ff552e';
            break;
            case 'passErr':password.style.borderColor='#ff552e';
            break;
            case 'allErr':username.style.borderColor='#ff552e';password.style.borderColor='#ff552e';
            break;
            case 'ok' :window.localStorage.setItem('enterpriceUser',userVal);window.localStorage.setItem('enterprice',res.data.enterpricename); window.location.href='/enterprice/conIndex';
            break;
        }
    })
})