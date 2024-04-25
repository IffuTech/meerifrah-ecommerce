import { useState ,useContext}from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./LoginReg/Login"; 
import Registration from "./LoginReg/Registration"; 
import Home from "./Components/Home/Home"; 
import Users from "./Components/Users/UsersList";  
import Orders from "./Components/Oders/Orders";  
import OrdersView from "./Components/Oders/OrdersStatus";  

import Product from "./Components/Products/Product_Add";   
import ProductList from "./Components/Products/ProductList";   
import ProductEdit from "./Components/Products/ProductEdit";
import ProductView from "./Components/Products/ProductView";
import ProductGallery from "./Components/Products/ProductGallery";

import CategoryAdd from "./Components/Category/CategoryAdd";   
import CategoryList from "./Components/Category/CategoryList";

import SubCategoryAdd from "./Components/Sub_Category/Sub_CategoryAdd"; 
import SubCategoryList from "./Components/Sub_Category/Sub_CategoryList"; 

import LeafCategoryAdd from "./Components/Leaf_Category/CategoryAdd"; 
import LeafCategoryList from "./Components/Leaf_Category/CategoryList"; 

import ForgetPassword from "./LoginReg/ForgetPassword";   
import ResetPassword from "./LoginReg/ResetPassword";   
import NoPage from "./Components/NoPage";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Style/dark.scss"
// import axios from "axios";

// axios.defaults.baseUrl = "http://localhost:8000/";
// axios.defaults.withCredentials = true;

function App() {
  const [loader, setLoader] = useState(false);
 
  const {darkMode} = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
      <Routes>
           <Route path="/" element={<Login/>} />   
           <Route path="/Register" element={<Registration />}/> 
           <Route path="/admin/" element={<Home loaderVal={loader} />} />
           <Route path="users" element={<Users />}/>   
           <Route path="orders" element={<Orders />}/>    
           <Route path="OrdersView/:id" element={<OrdersView />}/>

            <Route path="product-add" element={<Product />}/>
           <Route path="product-list" element={<ProductList />}/>      
           <Route path="product_edit/:id" element={<ProductEdit />}/>   
           <Route path="Product-view/:id" element={<ProductView />}/>    
           <Route path="Product-Gallery/:id" element={<ProductGallery />}/>

           <Route path="category-add" element={<CategoryAdd />}/>
           <Route path="category-list" element={<CategoryList />}/>   
         
           <Route path="subcategory-add/:id" element={<SubCategoryAdd />}/>
          <Route path="subcategory-list/:id/" element={<SubCategoryList />}/>

           <Route path="leafcategory-add/:id" element={<LeafCategoryAdd />}/>
            <Route path="leafcategory-list/:id/" element={<LeafCategoryList />}/>   
           {/*<Route path="subcategory_edit/:id" element={<CategoryEdit />}/> */}

   
        {/* </Route> */}
       <Route exact path= "/forgetpassword" element={<ForgetPassword />}/> 
       <Route path="/reset-password/:id/:token" element={ <ResetPassword />}></Route> 
       <Route path="*" element={<NoPage />} /> 
      </Routes>
    </BrowserRouter> 
    </div>

  );
}

export default App;