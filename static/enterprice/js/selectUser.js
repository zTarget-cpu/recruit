window.addEventListener('load',function(){
    let userName=document.querySelector('.userName');
    let register=document.querySelector('.register');
    let userNameSpec=document.querySelector('.userNameSpec');
    let login=document.querySelector('.login');
    let as = document.querySelectorAll('.listHeaderSpec a');
    if(localStorage.getItem('enterpriceUser')){
        userNameSpec.innerHTML = localStorage.getItem('enterpriceUser');
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
    })
    userName.addEventListener('mouseout',function (){
        this.style.color = '#fff';
    })
})
