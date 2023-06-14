import React, { useEffect, useState } from 'react'

function Week() {
    const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let [dates,setDates]=useState([])
    let months=["January","February","March","April","May","June","July","August","September",'October',"November","December"]
    let currentDate=new Date();
    
    let getDates=()=>{
        let date=[]
        for (let i=currentDate.getDate()-currentDate.getDay();i<currentDate.getDate();i++){
            date.push(i)
        }
        let len=date.length
        for (let i=0;i<7-len;i++){
            date.push(currentDate.getDate()+i);
        }
        console.log(date)
        return date;
    }

    useEffect(()=>{
        setDates(getDates())
    },[])
    
  return (
    <div className='monthPage'>
    
    <div className='week'>
        <div className="header">
            {currentDate.getFullYear()} , {months[currentDate.getMonth()]} {currentDate.getDate()}
        </div>
        <div className="body">
            <div className="days">
            {
                    days.map(element=>{
                    return <span className='date'>{element[0]}</span>
                })
            }
            </div>
            <div className="days">
            {
                    dates.map(element=>{
                    return <span className="date">{element}</span>
                })
            }
            </div>
        </div>
    </div>
    </div>
  )
}

export default Week