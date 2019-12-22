let list = document.querySelector('.userList');
let userNameSpec=document.querySelector('.userNameSpec');
let login=document.querySelector('.login');
let search = document.querySelector('.search');
let seachWork = document.querySelector('.seachWork');
search.addEventListener('click',function (){
    searchInfo()
})
seachWork.addEventListener('keydown',function (e){
    if(e.keyCode ==13){
        searchInfo()
    }
})
function searchInfo(){
    let seachWork = document.querySelector('.seachWork');
    let seachWorkVal = seachWork.value;
    this.href='/user/showEnterPoster?keyWork='+seachWorkVal;
    window.location.href=this.href
}
list.addEventListener('mouseover',function (e){
    let li=e.target.querySelector('ul');
    if(e.target.tagName == 'DL'){
        li.style.display = 'block';
    }
    li&&li.addEventListener('mouseover',function (){
        this.style.display='block'
    })
})
list.addEventListener('mouseout',function (e){
    let nav1=list.querySelectorAll('.innerUl');
    nav1.forEach(v => {
        v.style.display='none';
    });
})
