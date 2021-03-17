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