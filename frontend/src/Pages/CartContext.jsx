import react , { createContext, useState, useContext} from "react";

const CartContext = createContext();

export function useCart(){
    return useContext(CartContext);
}

export function CartProvider({children}){
    const [cart, setCart] = useState([]);

    const addToCart = (product) =>{
        setCart((prevCart)=>{
            const existingItem = prevCart.find((item)=>item.id === product.id);
            if(existingItem){
                return prevCart.map((item)=>
                    item.id === product.id ? {...item,quantity:item.quantity + 1}: item
                )
            }
            return [...prevCart, {...product,quantity:1}];
        })
}
const removeFromCart = (id)=>{
    setCart((prevCart)=>prevCart.filter((item)=>item.id !== id));
};

return (<CartContext.Provider value={{cart,addToCart,removeFromCart}}>
    {children}
</CartContext.Provider>);

}