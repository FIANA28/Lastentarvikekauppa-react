# E-commerce shop bulid with: Html, Css, frontend - React, backend - Node.js, Express.js, database - MongoDB, mongoose
part 1: static files: index.html and style.css
part 2: create-react-app and moving static files from part1 to dynamic frontend folder, transform static list of item to an array of objects in data.js
part 3: creating Product and Rating functional components 
part 4: Build Product Screen:
            Install react-router-dom
            Use BroswerRouter and Route for App.js
            Create HomeScreen.js
            Add product list code there
            Create ProductScreen.js
            Add new Route for product details to App.js
            Create 3 columns for product image, info and action

Carousel photo credits:

<span>Photo by <a href="https://unsplash.com/@itshoobastank?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Shirota Yuri</a> on <a href="https://unsplash.com/s/photos/toys?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

<span>Photo by <a href="https://unsplash.com/@nate_dumlao?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Nathan Dumlao</a> on <a href="https://unsplash.com/s/photos/children?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

<span>Photo by <a href="https://unsplash.com/@zoncoll?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Valeria Zoncoll</a> on <a href="https://unsplash.com/s/photos/baby?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

part 4: Backend Node.JS Server
    - run npm init in root folder
    - create file server.js in backend folder
    - npm install express
     - require express
    - create server connection in server.js (entry point of the backend)
    - create route for / return backend is ready
    - add start command as node backend/server.js
    - update package.json set type: module
    - copy data.js to backend and move products from frontend to backend
    - create route for /api/products in server.js
     - return products
    - add .js to imports (in backend)
    - make server automaticaly reopen :in /package.json change for:

        "scripts": {
        "start": "nodemon --watch backend --exec node --experimental-modules backend/server.js"
        },

    - run npm start

part 5: Load Products From Backend
    - (seting proxy in package.json in frontend)
    - install axios (a library to sent Ajax request to server)
    - edit HomeScreen.js (instead of fetching data from data.js in frontend we fetch data from backend /api/products)
    - define products, loading and error
    - create useEffect
    - define async fetchData and call it
    - get data from api/products
    - show them in the list
    - create Loading Component
    - create Message Box Component
    - use them in HomeScreen.js


part 6 (optional): Install ESlint for Code Linting
    - VSCode eslint extension
    - npm install -D eslint
    - run ./node_modules?.bin/eslint
    - create .frontend/.env
    - Add SKIP_PREFLIGHT_CHECK=true

part 7: Add Redux to HomeStreen.js (REDUX for managing states for application)
    - npm install redux react-redux
   
    add redux devtool as extension to Chrome. And in Frontend install redux-thunk (make possible to send Ajax request in Redux actions)
    - wrap in index.js react app into <Provider store={store}> to get access to react store.js from react components
    - Create store.js (return list of products), create redux store, reducer and initialState = {products:[]}
        - reducer = (state, action) => switch LOAD_PRODUCTS {products:action.payload}
        - export default createStore(reducer, initState)
    - in productActions.js define very first actions to get list of products from backend
    - in productReducer.js is updated redux store based on product list action
    - edit HomeScreen.js remove all code to fetchData from backend and dispatch the redux action. and that action update redux store and reflected in the view

            - shopName = useSelector(state=>state.products)
            - const dispatch = useDispatch()
            - useEffect(() => ({type: LOAD_PRODUCTS, payload: data}))
            - Add store to index.js

   <!-- after getting data from backend we need to dispatch another action. By dispatching actions we change the state of Redux and we can update HomeScreen and show products -->

part 8: Add Redux to Product Screen
    - create product details constants, actions and reducers
    - add reducer to store.js
    - use action in ProductScreen.js
    - add /api/product/:id to backend api (server.js)

part 9: Shopping Cart
    - handle Add To Cart in ProductScreen.js 
    - create CartScreen.js

part 10: Implement Add to Cart Action
    - create addToCart constants, action and reducers
    - add reducer to store.js
    - use action in CartScreen.js
    - render cartItems.length

part 11: Build Cart Screen
    - create 2 columns for cart items and cart action,
    - cartItems.length === 0 ? cart in empty
    - show item image, name, qty and price
    - proceed to checkout button
    - implement remove from cart action

part 12: Implement Remove From Cart Action
    - create removeFromCart constants, actions and redusers
    - add reducer to store.js
    - use action in CartScreen.js

part 13: Connect to MongoDB
    - npm install mongoose
        - create models/userModel.js 
        - create userSchema and userModel
             (userSchema and User based on Schema; mongoose.model function with 2 params)
     - create userRouter
        (add user to data.js)
    - seed sample data
    - npm install bcrypt.js
    - connect to mongodb (brew services start mongodb-community )
        - in userRouter.js add expressAsyncHandler to get error msg on the page of backend (npm install express-async-handler)
        - error catcher in server.js: app.use(('err, req, res, next') => {
        res.status(500).send({ message: err.message });
        });
        -  await User.remove({}); in server.js it will remove error about same id users. after refreshing a page it will create user with new id;
    
    - add MONGODB_URL to process.env.MONGODB_URL for changing static connection of mongoose.connect('mongodb://localhost/lastentarvikekauppa-react' for getting different values in different env.

part 14: Create Sample Product in MongoDB
    - create models/productModel.js
    - create productSchema and productModel
    - create productRouter
    - seed sample data (delate _id from data, they should be added automatically) /api/products will not work after deleting ids.
    
      <img src={product.image} alt={product.name}></img>


 part 15: Rate and Review Products
  - rate products
  - crate actions and reducers

part 16: Create Sign-in Backend
  - create /signin api
  - check email and password
  - generate token (from json web token for authenticating and authorizing user)
   jwt.sign has 3 parameters: user object, JWT_SECRET(is like key to unsript data and generated token, important! secure data), options {expiresIn: }
  - install json web token (process.env.JWT_SECRET; use .env for seting JWT_SECRET value)
  - install dotenv
  - return token and data
  - test it using postman

 by app.use(express.json()); in server.js we add new middleware, which is parsing data in the body of request
app.use(express.urlencoded({ extended: true }));

part 17: Design SignIn Screen
  - create SigninScreen
  - render email and password fields

part 18: Implement SignIn Action
  - create signin constants, actions and reducers
  - add reducer to store.js
  - use action in SigninScreen.js

part 19: Create Register Screen and Backend API
  - create API for api/users/register
  - insert new user to database
  - return user info and token
  - create RegisterScreen
  - add form fields
  - style fields
  - add screen to app.js

part 20: Create Search Box and Search Screen
  - create Search Bar in Header.js
  - add style
  - handle submit form
  - edit parse url to get query string
  - update product list api for search by name

part 21: Add advanced Search Filter 
  - filter by category and Sidebar with categories

part 22: Create Shipping Screen
  - create CheckoutSteeps.js component
  - create shipping fields
  - implement shipping constant, actions and reducers

part 23: Create Payment Screen
  - create payment fields
  - implement shipping constant, actions and reducers

part 24: Create Place Order Screen
  - create order summary fields
  - design order action

part 25: Create Order API
  - createOrder api
  - create orderModel
  - create orderRouter
  - create post order route

part 26: Implement PlaceOrder Action
   - handle place-order button click
   - create place order constants, action and reducer

part 27: Create Order Screen
   - build order api for /api/orders/:id
   - create OrderScreen.js
   - dispatch order details action in useEffect()
   - load data with useSelector()
   - show data like place order screen
   - create order details constant, action and reducer

part 28: PayPal button
   - get client id from paypal (developer.paypal.com)
   - set it in .env file
   - create route form /api/paypal/clientId
   - create getPaypalCileneID in api.js
   - add paypal checkout script in Order Screen.js
   - show paypal button in cd frontend (npm install react-paypal-button-v2)

part 29: Display Order History
   - create customer orders api
   - create api for getMyOrders
   - show orders in profile screen
   - style orders

part 30: Display User Profile
   - create user details api
   - show user info

part 31: Update User Profile
   - create user update api
   - update user info

part 32: Create Admin View
   - create admin menu
   - create admin middleware in Backend
   - create AdminRoute in Frontend

part 33: List Products
    - create ProductListScreen
    - add reducer to store
    - show products on the screen

part 34: Create Product
    - build create product api
    - build create product button
    - define product create constant, action, reducer
    - use action to ProductListScreen

part 35: Build Product Edit Screen
    - create edit screen
    - define state
    - create fields
    - load product details
    - add to routes

part 36: Update Product
     - define update api
     - define producy update constant, action and reducer
     - use action in Product Edit Screen

part 37: Upload Product Image
     - npm install multer
     - define upload router
     - create uploads folder
     - handle frontend

part 38: Delete Product
     - create delete api in backend
     - create delete constants, action, reducer
     - use it in product list screen

part 39: List Order
      - create order list api
      - create Order List Screen
      - create reducer to store
      - show products on the screen

part 40: Delete Order
      - create delete order action and reducer
      - add order delete action to order list


part 42: Implement Order Payment
       - update order after payment
       - create payOrder in api
       - create route for /:id/pay in orderRouter.js
       - rerender after pay order

part 41: Deliver Order
      - create constant, action and reducers for deliver order
      - add order deliver action to order details screen

part 42: Publish to Heroku
      - create git repository
      - create heroku account
      - install Heroku CLI
      - heroku login
