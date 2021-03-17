organizer features:
* runs each interactor sequentially
* a `context` is passed from each interactor to the next, which can be modified
* each interactor can either fail or succeed
* if one interactor fails, the following interactors are not run