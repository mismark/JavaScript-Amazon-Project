export let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart=[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId:'1'
},{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    deliveryOptionId:'2'
}];
}


function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));//to save on local storage
}

export function updateCartQuantity(){
   let cartQuantity = 0;
          cart.forEach(  (cartItem)  =>{
             cartQuantity+= cartItem.quantity; 
             
          });


          document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;     

}

export function addToCart(productId){
//add the quantity and number increased if i clicked more than once 
            let matchingItem;
            cart.forEach((cartItem)=>{
                if(productId === cartItem.productId){
                    matchingItem=cartItem;
                }  
            });

            if(matchingItem){
                matchingItem.quantity+=1;
            }
            else{
             cart.push({
                productId:productId,
                quantity:1,
                deliveryOptionId:'1'
              });
            }
saveToStorage();
}

export function removeFromCart(productID){
    const newCart= [];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productID){
            newCart.push(cartItem);

        }
    });
    cart=newCart;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
     let matchingItem;
            cart.forEach((cartItem)=>{
                if(productId === cartItem.productId){
                    matchingItem=cartItem;
                }  
            });
            matchingItem.deliveryOptionId= deliveryOptionId;

            saveToStorage();
}