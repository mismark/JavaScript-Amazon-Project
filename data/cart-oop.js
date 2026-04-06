

function Cart(localStorageKey){
    const cart= {
    cartItems: undefined,
     loadFromStorage(){
    this.cartItems=JSON.parse(localStorage.getItem(localStorageKey));//to store on a local storage 

    if(!this.cartItems){
    //cart itms in an arrays 
            this.cartItems=[{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:2,
                deliveryOptionId:'1'
            },{
                productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity:1,
                deliveryOptionId:'2'
        }];
    }
},
  saveToStorage(){
    localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));//to save on local storage
},
addToCart(productId){
//add the quantity and number increased if i clicked more than once 
            let matchingItem;
            this.cartItems.forEach((cartItem)=>{
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
        this.saveToStorage();
},
removeFromCart(productID){
    const newCart= [];
    this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId !== productID){
            newCart.push(cartItem);

        }
    });
    this.cartItems=newCart;
    this.saveToStorage();
},

 updateDeliveryOption(productId, deliveryOptionId){
     let matchingItem;
    this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem=cartItem;
        }  
    });
    if(matchingItem){
        matchingItem.deliveryOptionId= deliveryOptionId;
        this.saveToStorage();
    }  
},

// to save thee changes on your local storage and when refresh or restart,  all the previous actions are not changed 

 updateCartQuantity(){
   let cartQuantity = 0;
          this.cartItems.forEach(  (cartItem)  =>{
             cartQuantity+= cartItem.quantity; 
             
          });


          document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;     

}


};
return cart;
}

const cart=Cart('cart-oop');
const businessCart= Cart('cart-business');
cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart)
