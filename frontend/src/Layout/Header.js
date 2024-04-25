import React, {  useState, useEffect } from "react";
import logo from "../Images/Girnarcare-Logo-1.png";
import { FaSistrix, FaUserAlt } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Header = () => {

  
  const[proId,setProId]=useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategory] = useState([]);
  const navigate = useNavigate("");
  const [user, setUser] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [users,setUsers] = useState("");





  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === null || isLoggedIn === undefined) {
      navigate("/");
    }
    getCategory();
    // callLeaf();
    getUsers();
  }, []);

  // get categories
  function getCategory() {
    axios
      .get(`http://localhost:8000/category/list`)
      .then((resp) => {
        // console.log("categories are", resp.data);
        setCategory(resp.data.categoryList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //logout

  const userLogOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  // login

  const userLogin = () => {
    setIsLoggedIn(true);
  };

  // get adress
  const getUsers = async () => {
    const res = await axios.get(`http://localhost:8000/user/list`, {
      headers: {
        Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
      },
    });
    setUser(res.data);
  };

  useEffect(() =>{
    let Email = localStorage.getItem('Email');
    setUsers(Email);
    callId();
  })




const callId =()=>{
  user.map((item)=>{
    if(item.email === users){
      setProId(item._id)
      setFirstName(item.firstName)
      setLastName(item.lastName)

    }
  })
}



  return (
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid logo">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2">
              {categories.map((item) => {
                return (
                  <>
                    <li class="nav-item">
                      <NavLink
                        class="nav-link active"
                        aria-current="page"
                        to={`pro_detail/${item.name}`}
                      >
                        {item.name}
                      </NavLink>
                      <div className="onHover">
                        <ul>
                          {item.children.map((sub) => {
                            return (
                              <>
                                <li>
                                  <NavLink to={`/${sub._id}`}>
                                    {sub.name}
                                  </NavLink>
                                </li>
                                <div className="leafact">
                                  <ul>
                                    {sub.children.map((leaf) => {
                                      return (
                                        <li>
                                          <NavLink
                                            to={`pro_detail/${leaf._id}`}
                                            style={{
                                              color: "black",
                                              fontWeight: "400",
                                              fontSize: "14px",
                                            }}
                                          >
                                            {leaf.name}
                                          </NavLink>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </li>
                  </>
                );
              })}

              <li>
                <div className="Nav_search">
                  <FaSistrix />
                  <input type="text" placeholder="Search..." />
                </div>
              </li>
              <li>
                <NavLink className="Nav_shop mx-2 pb-4">
                  <FaUserAlt />
                  <br />
                  <span>Profile</span>
                </NavLink>
                <div id="login_home">
                  {isLoggedIn ? (
                    <>
                      <ul>
                        <li>
                     <strong className="text-capitalize"> {firstName}&nbsp;{lastName}</strong>
                           
                        </li>
                        <hr />
                        <li>
                          <NavLink to="/orderlist">Order Details</NavLink>
                        </li>
                        <li>
                        <NavLink to="/AddressDetail">Your Address</NavLink>
                      </li>
                        <li>
                          <NavLink to={`/profile/${proId}`}>Edit Profile</NavLink>
                        </li>

                        <li>
                          <NavLink to={"/login"}>
                            <strong
                              style={{ color: "red" }}
                              onClick={userLogOut}
                            >
                              Logout
                            </strong>
                          </NavLink>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <div className="onHover_profile">
                        <ul>
                          <li>
                            {/* {
                          user?.map((item)=>(
                            <strong>{item.name}</strong>
                          ))
                        } */}
                            <strong>Welcome to Girnar</strong>
                            <h6>To access account and manage orders</h6>
                          </li>
                          <li>
                            <NavLink to={"/login"}>
                              <strong
                                style={{ color: "red" }}
                                onClick={userLogin}
                              >
                                Login
                              </strong>
                            </NavLink>
                            &nbsp; / &nbsp;
                            <NavLink to="/signup">
                              <strong style={{ color: "red" }}>Signup</strong>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </li>
              {/* {isLoggedIn ? (
                <li>
                  <div className="Login_toggle ms-2 mt-1">
                    <NavLink to={"/login"}>
                      <button
                        onClick={userLogOut}
                        className="btn btn-danger p-1"
                      >
                        Logout
                      </button>
                    </NavLink>
                  </div>
                </li>
              ) : (
                <li className="Login_toggle ms-2 mt-1">
                  <NavLink to="/login">
                    <button onClick={userLogin} className="btn btn-success p-1">
                      Login
                    </button>
                  </NavLink>
                </li>
              )} */}
              <li>
                <div className="Nav_shop1">
                  <NavLink to="/cart">
                    <BsFillCartCheckFill />
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;