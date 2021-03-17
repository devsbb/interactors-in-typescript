type Interactor<Before, After> = (contextBefore: Before) => After

function organize<A, B, C, D>(
    startContext: A,
    a: Interactor<A, B>,
    b: Interactor<B, C>,
    c: Interactor<C, D>
) {
    c(b(a(startContext)))
}


type User = string
type Cart = Array<{ price: number, name: string }>

const getShoppingCard: Interactor<User, Cart> = user => {
    console.log("loading shopping cart for user", user)
    return [
        { name: "IPhone", price: 1000 },
        { name: "headphones", price: 100 }
    ]
}

type Offer = {
    total: number
}

const calculateOffer: Interactor<Cart, Offer> = cart => {
    console.log("calculating offer")
    return {
        total: cart.reduce((total, item) => total + item.price, 0)
    }
}
const sendOffer: Interactor<Offer, void> = offer => {
    console.log("sending offer:", offer)
}



organize(
    "Tina",
    getShoppingCard,
    calculateOffer,
    sendOffer
)