export let cart=[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2
},{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1
}];

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
                quantity:1
              });
            }

}

export function removeFromCart(productID){
    const newCart= [];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productID){
            newCart.push(cartItem);

        }
    });
    cart=newCart;
}