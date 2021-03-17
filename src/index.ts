type Interactor = {
    call: () => void
}

function organize(
    a: Interactor,
    b: Interactor,
    c: Interactor
) {
    a.call()
    b.call()
    c.call()
}