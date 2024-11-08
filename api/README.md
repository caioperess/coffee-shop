# App

Coffee Shop

## RFs (Requisitos funcionais)

- [x] The user should be able to sign up;
- [x] The user should be able to login;
- [x] The system must allow the authenticated user to get his profile;
- [x] The user should be able to fetch a list of coffees
- [x] The user should be able to add a coffee to the cart
- [x] The user should be able to delete a coffee from the cart
- [x] The user should be able to edit the quantity of an item in the cart
- [ ] The user should be able to retrieve his purchase history
- [ ] The user should be able to fetch his cart
- [ ] The user should be able to purchase coffees
- [x] The system must allow products to be created

## RNs (Regras de negócio)

- [x] The user should not be able to sign up with an existent email
- [x] The user can't have more than 1 open cart
- [x] The system must create a cart to add items if user does not have one

## RNFs (Requisitos não funcionais)

- [x] The user password has to be encrypted
- [x] The system data must be allocated in a PostgreSQL database
- [x] The user must be identified by a JWT token