import './Sidebar.scss'
import React,{ useEffect ,useContext} from "react";  
import { NavLink,useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import GradingSharpIcon from '@mui/icons-material/GradingSharp';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { DarkModeContext } from "../../../context/darkModeContext";

export default function Sidebar() {

    const navigate = useNavigate();
    useEffect(() => {
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === null || isLoggedIn === undefined) {
            navigate("/");
        }
    }, []);

     const userLogOut = () => {
      debugger;
        localStorage.clear();
        // navigate("/");
    }

    const {dispatch } = useContext(DarkModeContext);
  return (
    
    <div className="sidebar">
        <div className="top">
            <span className="logo">Myntra</span>
        </div>
        <hr />
        <div className="center">
            <ul>
                <li>
                  <NavLink to="/admin" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                     <DashboardIcon />
                     <span>Dashboard</span>
                 </NavLink>
                </li>
                <li>
                   <NavLink to="/users" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <AccountCircleIcon />
                    <span>Users</span>
                    </NavLink>
                </li>
                <li>
                   <NavLink to="/product-list" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <Inventory2Icon />
                      <span>Products</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/category-list" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <CategorySharpIcon />
                    <span>Category</span>
                    </NavLink>
                </li>
                <li>
                  <NavLink to="/orders" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <GradingSharpIcon style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                    <span>Orders</span>
                    </NavLink>
                </li>
               
                <li>
                   <NavLink to="/" className="nav-link active" onClick={userLogOut} >
                    <AssignmentReturnIcon />
                    <span>Logout</span>
                    </NavLink>
                </li>
            </ul>
        </div>
        <div className="bottom">
           <div className="colorOption" onClick={() => dispatch({type:"LIGHT"})}>  </div> 
           <div className="colorOption" onClick={() => dispatch({type:"DARK"})}>  </div>
       
        </div>
    </div>
  )
}
