window.addEventListener('load',function(){
    let userPower =document.querySelector('.userPower');
    let exitSpec =document.querySelector('.exitSpec');
    let userName=document.querySelector('.userName');
    let register=document.querySelector('.register');
    let userNameSpec=document.querySelector('.userNameSpec');
    let login=document.querySelector('.login');
    let as = document.querySelectorAll('.listHeaderSpec a');
    if(localStorage.getItem('user')){
        userNameSpec.innerHTML = localStorage.getItem('user');
        userName.style.display='block';
        register.style.display='none';
        login.style.display='none';
        [...as].forEach(v=>{
            v.style.display='none'
        })
    }
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
        localStorage.removeItem('user');
        localStorage.removeItem('school');
    })
})
