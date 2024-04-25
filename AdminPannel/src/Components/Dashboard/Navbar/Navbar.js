 import React, {useState , useEffect } from 'react'
// import SearchIcon from '@mui/icons-material/Search';
// import LanguageIcon from '@mui/icons-material/Language';
// import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

import PersonIcon from '@mui/icons-material/Person';
import './Navbar.scss';

export default function Navbar() {
  const [admin,setAdmin] = useState("");
  useEffect(() =>{
    let Email = localStorage.getItem('Email');
    setAdmin(Email);
  })
  return (

    <div className='navbar'>
       <div className='wrapper'>
          {/* <div className='search'>
            <input type="text" placeholder='search......'/>
            <SearchIcon />
           </div> */}
           <div className='items'>
             {/* <div className='item'>
              <LanguageIcon />
               English
              </div>

              <div className='item'>
              <DarkModeOutlinedIcon />
               </div>
              
              <div className='item'>
              <CropFreeOutlinedIcon />
               </div>   

               <div className='item'>
              <NotificationsNoneOutlinedIcon />
              <div className='counter'>1</div>
               </div>

              <div className='item'>
              <ForumOutlinedIcon />
               <div className='counter'>2</div>
                 </div> */}

              <div className='item'>
              <PersonIcon />
              <div className='showAdmin mt-5'>Current Admin :
              
              <h5 className="mt-3">{admin}</h5>
              </div>
               </div>

           </div>
       </div>
      
    </div>
  )
}
