import { useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import banner from "../../Images/Banner/1.webp";
import banner1 from "../../Images/Banner/2.jpg";
import banner2 from "../../Images/Banner/5.jpg";
import banner3 from "../../Images/Banner/4.jpg";
import Slider from "react-slick";
import cat_1 from "../../Images/Cosmatics/lakme-lipstic1.webp";
import cat_2 from "../../Images/Suits/2.jpg";
import cat_3 from "../../Images/shirts/1.webp";
import cat_4 from "../../Images/woodland/cat_img.webp";
import cat_5 from "../../Images/Cosmatics/2.jpg";
import cat_6 from "../../Images/Jewlerry/2.jpg";
import kid_2 from "../../Images/kids/2.webp";
import kid_3 from "../../Images/kids/3.avif";
import kid_4 from "../../Images/kids/5.jpg";
import kid_5 from "../../Images/kids/6.png";
import kid_6 from "../../Images/kids/skerts.jfif";
import card_1 from "../../Images/cards/1.png";
import card_2 from "../../Images/cards/2.png";
import card_3 from "../../Images/cards/3.png";
import card_4 from "../../Images/cards/4.png";
import img_1 from "../../Images/Beauty/1.webp";
import img_2 from "../../Images/Beauty/2.avif";
import img_3 from "../../Images/Beauty/3.jpg";
import img_4 from "../../Images/Beauty/4.jfif";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const [data, setdata] = useState([]);
  const [lipstic, setLipstic] = useState([]);
  const [kurta, setKurta] = useState([]);
  const [tShirt, settShirt] = useState([]);
  const [products, setProduct] = useState([]);
  const [shoe, settShoe] = useState([]);
  const [cosmatics, setCosmatics] = useState([]);
  const [jwellery, setJwellery] = useState([]);
  const [token, setToken] = useState("");

  console.log("lipsticcccccccccccccccc",lipstic)

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/product/list");
    setdata(response.data.products);
  };

  // function getcart(item) {
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  // };
  //   axios({
  //     method: "post",
  //     url: `http://localhost:8000/cart/addcart`,
  //     cartItems:{
  //       "product": item.product,
  //       "quantity": item.quantity,
  //       "price": item.price
  //     },config
  //   })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function getCategory() {
    axios
      .get(`http://localhost:8000/category/list`)
      .then((resp) => {
        setLipstic(resp.data.categoryList[1].children[3].children[3]);
        setKurta(resp.data.categoryList[1].children[0].children[0]);
        settShirt(resp.data.categoryList[0].children[0].children[0]);
        settShoe(resp.data.categoryList[0].children[2].children[0]);
        setCosmatics(resp.data.categoryList[1].children[3].children[0]);
        setJwellery(resp.data.categoryList[1].children[3].children[0]);
      })
      .catch((err) => {
        return err;
      });
  }

  function getproduct() {
    axios
      .get(`http://localhost:8000/product/list`)
      .then((resp) => {
        // console.log(" products list",resp.data);
        setProduct(resp.data.products);
      })
      .catch((err) => {
        return err;
      });
  }

  useEffect(() => {
    fetchData();
    getCategory();
    getproduct();
    // getcart();
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    setToken(isLoggedIn);
  }, []);

  var settings2 = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };




  return (
    <>
      <div className="Banner_carosel mt-4">
        <Slider {...settings2}>
          <div className="banner_img">
            <img src={banner} alt="" />
          </div>
          <div className="banner_img">
            <img src={banner1} alt="" />
          </div>
          <div className="banner_img">
            <img src={banner2} alt="" />
          </div>
          <div className="banner_img">
            <img src={banner3} alt="" />
          </div>
        </Slider>
      </div>
      <h2 className="d-flex justify-content-center pt-4 mt-4">
        Trending Brands
      </h2>
      <div className="home row">
        {data.map((item, i, index) => {
          // item.quantity = 1;
          while (i < 6) {
            return (
              <div className="card_item col-md-4">
                <NavLink to={`/productDetail/${item._id}`}>
                  <div className="card" key={index}>
                    {item.productPictures.map((item, i) => {
                      if (i < 1) {
                        return (
                          <>
                            <img
                              src={`http://localhost:8000/${item.path}`}
                              alt="error in path"
                              key={index}
                            />
                          </>
                        );
                      }
                    })}
                    {item.quantity < 1 ? (
                      <p style={{ color: "green" }}>
                        {item.name}</p>
                    ) : (
                      <p>{item.name}</p>
                    )}
                    <div className="price">
                      <strong>₹{item.price}</strong>
                      <strong>
                        <span>offer ₹ {item.offer}</span>
                      </strong>
                    </div>
                   
                  </div>
                </NavLink>
              </div>
            );
          }
        })}
      </div>

      <div className="container">
        <div className="Home_Catogories  ">
          <h2>CATEGORIES TO BAG</h2>
          <div className="row mt-4 text-center">
            <div className="col-6 col-sm-4 col-md-2 home_circle">
                <NavLink to={`pro_detail/${lipstic._id}`}>
                  <img src={cat_1} alt="" />
                  <br />
                  <strong>{lipstic.name}</strong>
                </NavLink>
            </div>

            <div className="col-6 col-sm-4 col-md-2 home_circle">
              <NavLink to={`/${kurta._id}`}>
                <img src={cat_2} alt="" />
                <br />
                <strong>Kurta Sets</strong>
              </NavLink>
            </div>
            <div className="col-6 col-sm-4 col-md-2 home_circle">
              <NavLink to={`/${tShirt._id}`}>
                <img src={cat_3} alt="" />
                <br />
                <strong>T-shirts</strong>
              </NavLink>
            </div>
            <div className="col-6 col-sm-4 col-md-2 home_circle">
              <NavLink to={`/${shoe._id}`}>
                <img src={cat_4} alt="" />
                <br />
                <strong>Shoes</strong>
              </NavLink>
            </div>
            <div className="col-6 col-sm-4 col-md-2 home_circle">
              <NavLink to={`/${cosmatics._id}`}>
                <img src={cat_5} alt="" />
                <br />
                <strong>cosmatics</strong>
              </NavLink>
            </div>
            <div className="col-6 col-sm-4 col-md-2 home_circle">
              <NavLink to={`/${jwellery._id}`}>
                <img src={cat_6} alt="" />
                <br />
                <strong>Jewlerry</strong>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="kids_ware mt-4">
          <h2>BEST OF KIDSWEAR</h2>
          <div className="row kids_home text-center mt-4 mb-4">
            <div className="col-6 col-sm-4 col-md-2 kids_card">
              {products.map((item, index) => {
                if ( index === 4) {
                  return (
                    <>                   
                      <NavLink to={`/productDetail/${item._id}`}>
                    {
                      products[4].productPictures?.map((pic,i)=>{
                        if(i===0){
                          return(
                            <img
                      src={`http://localhost:8000/${pic.path}`}
                      alt="kid"
                    />
                          )
                        }
                      })
                    }
                      </NavLink>
                      <div className="bg_white d-flex justify-content-center">
                        <span>{item.name}</span>
                        <br />
                      </div>
                      <h5>Min 50% off</h5>
                    </>
                  );
                }
              })}
            </div>
            <div className="col-6 col-sm-4 col-md-2 kids_card">
              <img src={kid_2} alt="" />
              <div className="bg_white d-flex"></div>
              <span>Dresses</span>
              <h5>Min 50% off</h5>
            </div>
            <div className="col-6 col-sm-4 col-md-2 kids_card">
              <img src={kid_3} alt="" />
              <div className="bg_white d-flex"></div>
              <span>Kurtas & Kurta Sets</span>
              <h5>Min 50% off</h5>
            </div>
            <div className="col-6 col-sm-4 col-md-2 kids_card">
              <img src={kid_4} alt="" />
              <div className="bg_white d-flex"></div>
              <span>UnderGarments</span>
              <h5>Min 50% off</h5>
            </div>
            <div className="col-6 col-sm-4 col-md-2 kids_card">
              <img src={kid_5} alt="" />
              <div className="bg_white d-flex"></div>
              <span>Top Brands</span>
              <h5>Min 50% off</h5>
            </div>
            <div className="col-6 col-sm-4 col-md-2 kids_card">
              <img src={kid_6} alt="" />
              <div className="bg_white d-flex"></div>
              <span>Skerts</span>
              <h5>Min 50% off</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="gif_cards text-center ">
        <h2>GIFTING CARDS</h2>
        <div className="row giftCard">
          <div className="col-md-3 giftCard text-center ">
            <img src={card_1} alt="" />
            <br />
            <strong>Onam</strong>
          </div>
          <div className="col-md-3 giftCard text-center">
            <img src={card_2} alt="" />
            <br />
            <strong>Wedding Celebration</strong>
          </div>
          <div className="col-md-3 giftCard text-center">
            <img src={card_3} alt="" />
            <br />
            <strong>Birthday wishes</strong>
          </div>
          <div className="col-md-3 giftCard text-center">
            <img src={card_4} alt="" />
            <br />
            <strong>Celebrating Milestones</strong>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 mb-4">
        <h2>LATEST IN BEAUTY & GROOMING</h2>
      </div>
      <div className="row home_beauty">
        <div className="col-md-3 d-flex">
          <div className=" mt-4  mb-4">
            <img src={img_1} alt="" />
          </div>
          <div className=" beauty_text mt-4 mb-4">
            <h5>Phillips</h5>
            <strong>Beauty & Grooming Essential</strong>
            <br />
            <span>Upto 30% off</span>
            <div className="beauty_bright">
              Provides smoootness with brightness
            </div>
            <p>+Explore</p>
          </div>
        </div>
        <div className="col-md-3 d-flex">
          <div className=" mt-4  mb-4">
            <img src={img_2} alt="" />
          </div>
          <div className="beauty_text mt-4 mb-4">
            <h5>Biotique</h5>
            <strong>Beauty & Grooming Essential</strong>
            <br />
            <span>Upto 30% off</span>
            <div className="beauty_bright">
              Provides smoootness with brightness
            </div>
            <p>+Explore</p>
          </div>
        </div>
        <div className="col-md-3 d-flex">
          <div className="mt-4  mb-4">
            <img src={img_3} alt="" />
          </div>
          <div className="beauty_text mt-4 mb-4">
            <h5>Coloroar</h5>
            <strong>Beauty & Grooming Essential</strong>
            <br />
            <span>Upto 30% off</span>
            <div className="beauty_bright">
              Provides smoootness with brightness
            </div>
            <p>+Explore</p>
          </div>
        </div>
        <div className="col-md-3 d-flex">
          <div className="mt-4  mb-4">
            <img src={img_4} alt="" />
          </div>
          <div className="beauty_text mt-4 mb-4">
            <h5>Mamaearth</h5>
            <strong>Beauty & Grooming Essential</strong>
            <br />
            <span>Upto 30% off</span>
            <div className="beauty_bright text-wrap">
              Provides smoootness with brightness
            </div>
            <p>+Explore</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
