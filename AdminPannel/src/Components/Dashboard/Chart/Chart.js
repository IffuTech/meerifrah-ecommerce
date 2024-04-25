import React from 'react'
import './Chart.scss'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,AreaChart,Area } from 'recharts';


function Chart() {
    const data = [
        {name: "january", Total: 1200},
        {name: "Feb", Total: 2100},
        {name: "March", Total: 800},
        {name: "April", Total: 1600},
        {name: "May", Total: 900},
        {name: "June", Total: 1700},
      ];
      
  return (
    <div className='chart'>
    <div className='title'>Last 6 months revenue 
     <ResponsiveContainer width="100%" aspect={ 3 / 1 } >   
        <AreaChart width={730} height={250} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
     </defs>
  <XAxis dataKey="name" stroke="grey" />
  {/* <YAxis />   used to display y axis */}
   <CartesianGrid strokeDasharray="3 3" className='chartGrid'/>
  <Tooltip />
  <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
 </AreaChart>
 </ResponsiveContainer>
    </div> 
    </div>
  )
}

export default Chart