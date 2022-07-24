// REPONSIVIDADE 

document.querySelector('.menu-opener').addEventListener('click',()=>{
    if(document.querySelector('.menu').style.display = 'none'){
        document.querySelector('.menu').style.display = 'flex';
    }
});

document.querySelector('.menu-closer').addEventListener('click',()=>{
    document.querySelector('.menu').style.display = 'none';
});

document.querySelector('.menu-closer-cart').addEventListener('click',()=>{
    document.querySelector('aside').style.left = '100vw';
    document.querySelector('aside').classList.remove('show');
});

if(document.querySelector('.cart-value') > 0 ) {

}

document.querySelector('.menu-closer-cart-pc').addEventListener('click',()=>{
    document.querySelector('aside.show').classList.remove('show');
    if(window.screen.width < 1230 && window.screen.width > 1005 ){
        document.querySelector('section .products').style.gridTemplateColumns = 'repeat(4, 1fr)';
    }else if(window.screen.width < 1005 && window.screen.width > 815 ) {
        document.querySelector('section .products').style.gridTemplateColumns = 'repeat(3, 1fr)';}
});