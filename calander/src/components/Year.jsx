import React,{useState,useEffect} from 'react'
import Month from './Month'
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
function Year() {
  let [Year,setYear]=useState(new Date().getFullYear());
  let [data,setdata]=useState([])
  
  let currentDate=new Date
  let getMonths=()=>{
    let date=[]
    for (let i=0;i<12;i++){
      date.push({year:Year,date:1,month:i})
    }
    return date;
  }

  useEffect(()=>{
    setdata(getMonths())
  },[Year])
  return (
    <div className='year'>
      <div className="header">
        {Year}
      </div>
      <div className="yearbody">
        {
          data.map(element=>{
            
            return element.year==currentDate.getFullYear() && element.month==currentDate.getMonth()?<Month key={element['month']} inyear={element['year']} inmonth={element['month']} indate={currentDate.getDate()} toshow={false} width={"400px"}></Month>:<Month key={element['month']} inyear={element['year']} inmonth={element['month']} indate={element['date']} toshow={false} width={"400px"}></Month>
          })
        }
      </div>
    </div>
  )
}

export default Year