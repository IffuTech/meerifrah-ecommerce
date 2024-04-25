import React from "react";
import footer_logo from "../Images/Girnarcare-Logo-1.png";
import { BsPaypal } from "react-icons/bs";
import { SiPaytm } from "react-icons/si";
import { RiVisaLine } from "react-icons/ri";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaCcMastercard,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <hr className="mt-4"/>
      <div className="container">
        <footer className="mt-4 footer">
          <div className="row">
            <div className=" footer_logo col-md-3 text-center">
              <img className="pt-4 pb-4" src={footer_logo} alt="" />
              <br />
              <span>122 Mddina comples Sumbal Bandipora kashmir,193501</span>
              <br />
              <div className="social_icons pt-4 pb-4 ">
                <FaFacebookF />
                <FaInstagram />
                <FaPinterestP />
                <FaYoutube />
              </div>
            </div>
            <div className="col-md-6 footer_col2 ">
              <div className="row ">
                <div className="col-md-4 ">
                  <ul>
                    <li>
                      <NavLink>Men</NavLink>
                    </li>
                    <li>
                      <NavLink>Jackets & Coats</NavLink>
                    </li>
                    <li>
                      <NavLink>Jeans</NavLink>
                    </li>
                    <li>
                      <NavLink>Polo shirts</NavLink>
                    </li>
                    <li>
                      <NavLink>T-shirts</NavLink>
                    </li>
                    <li>
                      <NavLink>Shirts</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <ul>
                    <li>
                      <NavLink>Shorts</NavLink>
                    </li>
                    <li>
                      <NavLink>Suits</NavLink>
                    </li>
                    <li>
                      <NavLink>Swimwear</NavLink>
                    </li>
                    <li>
                      <NavLink>Tracksuits</NavLink>
                    </li>
                    <li>
                      <NavLink>Trousers</NavLink>
                    </li>
                    <li>
                      <NavLink>Shoes</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 footer_account">
                  <ul>
                    <li>
                      <NavLink>My Account</NavLink>
                    </li>
                    <li>
                      <NavLink>Order History</NavLink>
                    </li>
                    <li>
                      <NavLink>Wish List</NavLink>
                    </li>
                    <li>
                      <NavLink>Newsletter</NavLink>
                    </li>
                    <li>
                      <NavLink>Affiliate</NavLink>
                    </li>
                    <li>
                      <NavLink>Returns</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-3 footer_col3">
              <h5>Join our newsletter and get $20 for your first order</h5>
              <input type="email" placeholder="Your e-mail adress" required />
              <br />
              <button className="btn btn-danger">Subscribe</button>
              <div className="pay_icons d-flex">
                <BsPaypal />
                <SiPaytm />
                <FaCcMastercard />
                <RiVisaLine />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
