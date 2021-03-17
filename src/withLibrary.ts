import { map as always, none as fail, Option as Failable, some as succeed } from "fp-ts/lib/Option"
import { pipe as organize } from "fp-ts/lib/function"
import { chain as then } from "fp-ts/lib/Option"

const getShoppingCardL = (user: User): Failable<Cart> => {
    console.log("loading shopping cart for user", user)
    if (user === "Thief") {
        return fail
    }
    return succeed([
        { name: "IPhone", price: 1000 },
        { name: "headphones", price: 100 }
    ])
}

const calculateOfferL = (cart: Cart): Offer => {
    console.log("calculating offer")
    return {
        total: cart.reduce((total, item) => total + item.price, 0)
    }
}


const sendOfferL = (offer: Offer): Failable<void> => {
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
    "thomas",
    getShoppingCardL,
    always(calculateOfferL),
    then(sendOfferL)
)