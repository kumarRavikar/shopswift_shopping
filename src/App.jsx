
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import { Home } from "./Home"
import { About } from "./About"
import { Products } from "./Products"
import { Contact } from "./Contact"
import { SingleProduct } from "./SingleProduct"
import { ErrorPage } from "./ErrorPage"
import Header from "./components/Header"
import Cart from "./Cart"
import Footer from "./components/Footer"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Verify from "./components/Verify"
import VerifyEmail from "./components/VerifyEmail"
import { Profile } from "./components/Profile"
function App() {
 const router = createBrowserRouter([
  {path:"/",element:<Header/>, errorElement:<ErrorPage/>,children:[
  {index:true , element:<Home/>},
  {path:"/about", element:<About/>},
  {path:"/contact", element:<Contact/>},
  {path:"/products", element:<Products/>},
  {path:"/products/:id", element:<SingleProduct/>},
  {path:"/cart", element:<Cart/>}
  ]},
  {path:"/signup", element:<SignUp/>},
  {path:"/verify", element:<Verify/>},
  {path:"/verify/:token", element:<VerifyEmail/>},
  {path:"/login", element:<Login/>},
  {path:"/profile/:userId", element:<Profile/>}
 ])
  return(<><RouterProvider router={router}/> <Footer/></> )
}

export default App
