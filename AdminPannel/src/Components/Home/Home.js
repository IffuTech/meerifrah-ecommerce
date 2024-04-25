import React, { useState, useEffect } from 'react'
import './Home.scss'
import axios from 'axios';
import Sidebar from '../Dashboard/Sidebar/Sidebar'
import Navbar from '../Dashboard/Navbar/Navbar'; 
import Chart from '../Dashboard/Chart/Chart';

const Home = () => {
  
  const [allRecords,setAllRecords ] = useState({});
  useEffect(() =>{
    axios.get(`http://localhost:8000/count/totalCount`)
     .then((resp) =>{
      console.log("in widgat",resp.data)
      setAllRecords(resp.data);
     })
     .then((error) =>{console.log("Error",error)})
    
  },[])

  return (
    <div className='home'>
         <Sidebar />
       <div className="HomeContainer">
          <Navbar />
          <div className="widgets">
       
          {
            Object.keys(allRecords).map((item, i) => {   //count array
                return (
                    // <div class="col-xl-3 col-sm-6 py-2">
                    <div className="widget">
                    <span className="title text-uppercase"> { item } </span>
                        <div className='percentage positive'>
                     
                    
                       {allRecords[item].map( (child)=>(     
                            <h5>{child.count}</h5> 
                        ))} 
                   
                 </div>
                </div>
                )
            })
        } 



        </div> 
        <div className='charts'>
          <Chart />
        </div>
       </div>
    </div>
  )
}

export default Home


