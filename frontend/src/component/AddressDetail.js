import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";



const AddressDetail = () => {

    const navigate = useNavigate();
    const [show,setShow]=useState(false);
    const params = useParams();
    const [adress, setAdress] = useState([]);
    const [editAdress, setEditAdress] = useState("");
    
    const [checkoutInput, setCheckoutInput] = useState({
        name: " ",
        phone: "",
        pincode: "",
        locality: "",
        adress: "",
        cityDistrictTown: "",
        state: "",
        landmark: "",
        alternateNumber: "",
      });




   



    useEffect(() => {
        let isLoggedIn = localStorage.getItem("isLoggedIn");
        // console.log("sotorage===============", isLoggedIn);
        if (isLoggedIn === null || isLoggedIn === undefined) {
          navigate("/");
        }
        getAdress();
      }, []);


   


      const handleInput = (e) => {
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
      };
      const placeOrder = (e) => {
        e.preventDefault();
        const config = {
          headers: {
            Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
          },
        };
        const data = {
          payload: {
            address: {
              name: checkoutInput.name,
              mobilenumber: checkoutInput.phone,
              pincode: checkoutInput.pincode,
              locality: checkoutInput.locality,
              cityDistrictTown: checkoutInput.cityDistrictTown,
              landmark: checkoutInput.landmark,
              alternateNumber: checkoutInput.alternateNumber,
              addressType: checkoutInput.adress,
            },
          },
        };
        axios
          .post(`http://localhost:8000/address/create`, data, config)
          .then((res) => {
            if (res.data.status === 400) {
              alert("full address required");
            } else {
              alert("adress successfully Added");
            }
          });
      };



  // get Adress
  const getAdress = async () => {
    const res = await axios.get(`http://localhost:8000/address/getaddress`, {
      headers: {
        Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
      },
    });
    // console.log("adress''''", res.data.userAddress.address)
    setAdress(res.data.userAddress.address);
    setEditAdress(res.data.userAddress.address);

  };


 



  return (
    <div className="container">
    <div className="add_address_button border mt-4">
    <strong className="btn btn-link m-3 text-decoration-none fs-6" onClick={()=>setShow(!show)}>{show === true ? "Hide Add Address " :" +  Add New Address"}</strong>
    {show &&  <div className="">
    <form className="border m-4 p-3">
      <h2 className="mb-4 pt-4 text-center text-decoration-underline">
        Enter New Adress
      </h2>
      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">Full Name </label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleInput}
            value={checkoutInput.name}
            required
          />
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Mobile no.</label>
          <input
            type="tel"
            className="form-control"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            name="phone"
            onChange={handleInput}
            value={checkoutInput.phone}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            className="form-control"
            name="pincode"
            onChange={handleInput}
            value={checkoutInput.pincode}
            required
          />
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Locality</label>
          <input
            type="text"
            className="form-control"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            name="locality"
            onChange={handleInput}
            value={checkoutInput.locality}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Adress</label>
          <textarea
            class="form-control"
            placeholder="Enter current Adress"
            name="adress"
            onChange={handleInput}
            value={checkoutInput.adress}
            required
          ></textarea>
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">City / District / Town</label>
          <input
            type="text"
            className="form-control"
            name="cityDistrictTown"
            onChange={handleInput}
            value={checkoutInput.cityDistrictTown}
            required
          />
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">state</label>
          <input
            type="text"
            className="form-control"
            name="state"
            onChange={handleInput}
            value={checkoutInput.state}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">landmark</label>
          <input
            type="text"
            className="form-control"
            name="landmark"
            onChange={handleInput}
            value={checkoutInput.landmark}
            required
          />
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">alternate Phone</label>
          <input
            type="tel"
            className="form-control"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            name="alternateNumber"
            onChange={handleInput}
            value={checkoutInput.alternateNumber}
            required
          />
        </div>
      </div>

      <NavLink
        type="submit"
        to="/order"
        className="btn btn-success btn-sm"
        onClick={placeOrder}
      >
        Save Adress
      </NavLink>
    </form>
  </div>}
    </div>
    <div className="previous_address border mt-3">
    <div className="">
            {adress?.map((item) => {
              return (
                <>
                  <div className="" key={item._id}>
                    <div className="row db_adress  m-4 ">
                      <div className="col-md-10 ">
                        <form>
                          &nbsp;
                          <strong>{item.name}</strong>
                          <div className="d-flex">
                            &nbsp;<span> {item.locality}</span>&nbsp;
                            <span> {item.landmark}</span>&nbsp;
                            <span>{item.cityDistrictTown}</span>
                          </div>
                        
                        </form>
                      </div>
                      <div className="col-md-2 existing_adress_link">
                       {editAdress.map((item)=>{
                        return(
                          <NavLink to ={`/editaddress/${item._id}`} ><FaEdit/></NavLink>
                        )
                       })}
                         
                      </div>
                      
                    </div>
                    <hr/>
                  </div>
                </>
              );
            })}
          </div>
    </div>

    </div>
  )
}

export default AddressDetail
