import React,{useState,useEffect} from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Month({inyear,inmonth,indate,toshow,width}) {

    // current Date and time
    let [currentDate,setCurrentDate]=useState(new Date(inyear,inmonth,indate))
    let month=currentDate.getMonth()
    let date=currentDate.getDate()
    let year=currentDate.getFullYear()

    const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let months=["January","February","March","April","May","June","July","August","September",'October',"November","December"]
    let [events,setEvents]=useState([]);

    async function getEvents(){

        try{
            let response=await axios.get(`http://localhost:8000/api/events/${currentDate.getFullYear()}/${currentDate.getMonth()}`)
            setEvents(response.data)
            console.log(response.data)
        }
        catch(err){
            console.log(err.message)
        }
        
    }

    useEffect(()=>{
        getEvents();
    },[currentDate])


    // Modal states and functions
    // 
    const [show, setShow] = useState(false);
    const handleClose = async () => {
        let name=document.getElementById('name').value
        let desc=document.getElementById('desc').value
        let response=await axios.post('http://localhost:8000/api/events/create',{name:name,desc:desc,year:localStorage.getItem('year'),month:localStorage.getItem('month'),date:localStorage.getItem('date')})
        setEvents([...events,response.data])
        setShow(false)
        localStorage.clear()
    };
    const handleShow = (e) => {
        setShow(true)
        localStorage.setItem('date',e.target.id)
        localStorage.setItem('year',currentDate.getFullYear())
        localStorage.setItem('month',currentDate.getMonth())
    };

    let handleDelete=async (e)=>{
        await axios.post('http://localhost:8000/api/events/delete',{id:e.target.parentNode.id})
        getEvents();
    }
    

    // Getting Start and End of the Month
    let firstDate=new Date(year,month,1)
    let lastDate=new Date(year,month+1,0)
    let [deprecatedDays,setDeprecatedDays]=useState([])
    let [monthDates,setmonthDates]=useState([])
    
    let finddp=()=>{
        let depre=[]
        if (firstDate.getDay()!=0){
            let lastMonthFirstDate=new Date(currentDate.getFullYear(),currentDate.getMonth()-1,1)
            let lastMonthLastDate=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0);
            for (let i=lastMonthLastDate.getDate()-(firstDate.getDay());i<lastMonthLastDate.getDate();i++){
                depre.push(i);
            }
        }
        return depre
    }

    let setDates=()=>{
        let dates=[]
        for (let i=firstDate.getDate();i<lastDate.getDate()+1;i++){
            dates.push(i);
        }
        return dates;
    }

    useEffect(()=>{
        setDeprecatedDays(finddp());
        setmonthDates(setDates());
    },[currentDate])    



    let handleForward=(e)=>{
            setCurrentDate(new Date(year,month+1,1))
    }
    let handlebackward=(e)=>{
        setCurrentDate(new Date(year,month-1,1))
    }

  return (
    <div className='monthPage'>
    
        <div className='month' style={{width:width}}>
                <div className="header">
                    <p>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
                    <div className="icons">
                        <a onClick={handlebackward} name="back"><ArrowBackIosNewIcon></ArrowBackIosNewIcon></a>
                        <a onClick={handleForward} name='forward'><ArrowForwardIosIcon></ArrowForwardIosIcon></a>
                    </div>
            </div> 
            <div className="body">
                <div className="days">
                    {
                            days.map(element=>{
                            return <span className='date'>{element[0]}</span>
                        })
                    }
                </div>
                <div className='days'>
                    {
                        deprecatedDays.map(element=>
                            {
                                return  <span className='date'>{element}</span>
                            })
                    }   
                    {
                        monthDates.map(element=>{
                            return indate===element?<span className='date' style={{backgroundColor:"white",color:'black'}} id={element} onClick={(e)=>{handleShow(e)}}>{element}</span>:<span className='date' id={element} onClick={(e)=>{handleShow(e)}}>{element}</span>
                        })
                    }
                </div>
            </div> 
    </div>
    
    {toshow?<div className="events">
        <h1 style={{color:'white'}}>Events</h1>
        {
            events.map(element=>{
                return <div className="event" id={element._id}>
                    <h4>Title: {element.name}</h4>
                    <p>Description: {element.desc}</p>
                    <p className="datetime">{element.date} {months[element.month]},{element.year}</p>
                    <button style={{color:"black",backgroundColor:"red",border:"none",borderRadius:"10px"}} onClick={handleDelete}>Delete</button>
                </div>
            })
        }
        
        </div>:<></>}
            
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Event Name</Form.Label>
            <Form.Control type="text" placeholder="birthday" id='name' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Event Description</Form.Label>
            <Form.Control type="text" placeholder="Wish Someone ....."  id="desc"/>
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Month