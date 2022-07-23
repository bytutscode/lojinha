// VAR
let cart = [];
let modalQt = 1;
let modalkey = 0;
let currentSlide = 0;
const c = (el)=>document.querySelector(el);
const cs = (el) =>document.querySelectorAll(el);


// SETTING THE PRODUCTS

products.map((item,index)=>{
    let itemP = c('.models .product').cloneNode(true);
        // setting the info product
    itemP.setAttribute('Data-key', index);
    itemP.querySelector('.product-img img').setAttribute('src',`media/${item.media.photo}`);
    itemP.querySelector('.product-info .product-name').innerHTML = `${item.name}`;
    itemP.querySelector('.product-info .product-price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    c('.products').append(itemP);
    //setting the modal info to show when the buy button is pressed
    itemP.addEventListener('click',(e)=>{
                e.preventDefault();
                modalQt = 1;
                //setting the info of product on modal
                let key = e.target.closest('.product').getAttribute('Data-key');
                modalkey = key;
                c('.modal-img img').setAttribute('src',`media/${products[key].media.photo}`);
                c('.modal-name').innerHTML = `${products[key].name}`;
                c('.modal-desc').innerHTML =`${products[key].description}`;
                c('.modal-price').innerHTML=`R$${products[key].price.toFixed(2)}`;
                c('.amount').innerHTML = modalQt;
                c('.size.selected').classList.remove('selected');
                //setting the size
                cs('.size').forEach((item,idx)=>{
                    if(idx == cs('.size').length - 1){
                        item.classList.add('selected')
                    }
                    item.setAttribute('data-key',idx);
                })
                // Here a trick to get an animation of opacity by JS
                c('.modal').style.display = 'flex';
                c('.modal').style.opacity = 0;
                setTimeout(()=>{
                c('.modal').style.opacity = 1;
                },32);
    });        
});

            // functions 
    function cancel () {
        c('.modal').style.opacity = 0;
        setTimeout(()=>{
            c('.modal').style.display = 'none';
            },500);
       
        
    }
            //events button buy

    c('.cancel').addEventListener('click',cancel);
    
    c('.qtmais').addEventListener('click',()=>{
        modalQt++;
        c('.amount').innerHTML = modalQt;
    });

    c('.qtmenos').addEventListener('click',()=>{
        if(modalQt > 1){
    modalQt--;
            c('.amount').innerHTML = modalQt;
        } 
    });

cs('.size').forEach(size=>{
    size.addEventListener('click',()=>{
        c('.size.selected').classList.remove('selected');
        size.classList.add('selected');
    });});


// cart area

//events
c('.add-cart').addEventListener('click',getInfo);


//cart functions

function getInfo () {
    let size = parseInt(c('.size.selected').getAttribute('data-key'));
    let identifier = products[modalkey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1){
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: products[modalkey].id,
            size,
            qt:modalQt
        })
    }

    updateCart();
    cancel();
}


function updateCart () {
    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.orders').innerHTML = '';
    
    let subTotal = 0;
    let desconto = 0;
    let total = 0;
   
    for(let i in cart){
        let productItem = products.find((item)=>item.id == cart[i].id);
        let cartItem = c('.order').cloneNode(true);

        subTotal += productItem.price * cart[i].qt;

        let productSize;

        switch(cart[i].size){
            case 0: productSize = 'Pequena'
            break;
            case 1: productSize = 'média'
            break;
            case 2: productSize = 'grande'
            break;
        }

        let itemName = `${productItem.name}`; // case need a size (${productSize})

        cartItem.querySelector('.order-img img').setAttribute('src',`media/${productItem.media.photo}`);
        cartItem.querySelector('.order-name').innerHTML = itemName;
        cartItem.querySelector('.cart-amount').innerHTML = cart[i].qt;
        cartItem.querySelector('.cart-qtmais').addEventListener('click',()=>{
           cart[i].qt++;
           updateCart();
        });
        cartItem.querySelector('.cart-qtmenos').addEventListener('click',()=>{
            if(cart[i].qt > 1){
                cart[i].qt--;
            } else {
                cart.splice(i,1)
            }
            updateCart();
        });
        c('.orders').append(cartItem);
    }
    desconto = subTotal * 0.1;

    total = subTotal - desconto;
        c('.subtotal span:last-child').innerHTML = `R$${subTotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `-R$${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$${total.toFixed(2)}`;

        document.querySelector('aside').style.left = '0vw';
} else {
        
        
        c('aside').classList.remove('show');
    }
}

c('.finish').addEventListener('click',order);

function order () {
    let order ='';
    for(let i in cart){
        let orderItem = products.find((item)=>item.id==cart[i].id);
        order += `Pedido: ${orderItem.name}, Quantidade: ${cart[i].qt}\n`;
    }
    console.log(order);
}


// slide area
let totalslides = document.querySelectorAll('.slide-bg').length;
let slidesWidth = document.querySelector('.slide-bg').clientWidth;
c('.slide-bg').style.width = `calc(${slidesWidth} * ${totalslides})`;

setInterval(next,4000);

function prev() {
    currentSlide--;
if(currentSlide < 0){
    currentSlide = totalslides - 1;
}
updateSlide();
}

function next () {
currentSlide++;
if(currentSlide == totalslides){
    currentSlide = 0 ;
}
updateSlide();
}


function updateSlide () {
c('.slide-width').style.marginLeft=`calc(-${slidesWidth}px * ${currentSlide})`;
}




// REPONSIVIDADE 

document.querySelector('.menu-opener').addEventListener('click',()=>{
    if(document.querySelector('.menu').style.display = 'none'){
        document.querySelector('.menu').style.display = 'flex';
    }
});

document.querySelector('.menu-closer').addEventListener('click',()=>{
    document.querySelector('.menu').style.display = 'none'
});

document.querySelector('.menu-closer-cart').addEventListener('click',()=>{
    document.querySelector('aside').style.left = '100vw';
});

document.querySelector('.menu-closer-cart-pc').addEventListener('click',()=>{
    document.querySelector('aside.show').classList.remove('show');
})
