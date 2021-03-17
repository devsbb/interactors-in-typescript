type Interactor = () => void

function organize(
    a: Interactor,
    b: Interactor,
    c: Interactor
) {
    a()
    b()
    c()
}

const getShoppingCard: Interactor = () => {
    console.log("loading shopping cart")
}
const calculateOffer: Interactor = () => {
    console.log("calculating offer")
}
const sendOffer: Interactor = () => {
    console.log("sending offer")
}

organize(
    getShoppingCard,
    calculateOffer,
    sendOffer
)