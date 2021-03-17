type Interactor<Before, After> = (contextBefore: Before) => After

type Failable<T> = { success: true, value: T } | { success: false }
type FailableInteractor<Before, After> = (contextBefore: Before) => Failable<After>


function organize<A, B, C, D>(
    startContext: A,
    a: FailableInteractor<A, B>,
    b: FailableInteractor<B, C>,
    c: FailableInteractor<C, D>
) {
    const resultA = a(startContext)
    if (resultA.success) {
        const resultB = b(resultA.value)

        if (resultB.success) {
            c(resultB.value)
        }
    }
}

const fail = { success: false } as const
const succeed = <T>(value: T) => ({ success: true, value })


type User = string
type Cart = Array<{ price: number, name: string }>

const getShoppingCard: FailableInteractor<User, Cart> = user => {
    console.log("loading shopping cart for user", user)
    if (user === "Thief") {
        return fail
    }
    return succeed([
        { name: "IPhone", price: 1000 },
        { name: "headphones", price: 100 }
    ])
}

type Offer = {
    total: number
}

const calculateOffer: FailableInteractor<Cart, Offer> = cart => {
    console.log("calculating offer")
    return succeed({
        total: cart.reduce((total, item) => total + item.price, 0)
    })
}

const internetIsBad = false
const sendOffer: FailableInteractor<Offer, void> = offer => {
    console.log("sending offer:", offer)
    if (internetIsBad) {
        console.log("failed to send offer")
        return fail
    } else {
        console.log("successfully sent offer!")
        return succeed(undefined)
    }
}



organize(
    "Tina",
    getShoppingCard,
    calculateOffer,
    sendOffer
)