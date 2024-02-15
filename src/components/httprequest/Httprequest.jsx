import { Button, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import $ from 'jquery'; 
import './Httprequest.css';

function Httprequest() {
    // const [login, setLogin] = useState(true);
    // const [logout, setLogout] = useState(true); 

    const [allData, setAllData] = useState([]);
    const [oneData, setOneData] = useState([]);
    const [counter, setCounter] = useState(1);
    const [animation, setAnimation] = useState("animate__animated animate__fadeInRight");
    // useEffect(()=>{
    //     alert("ok");
    // },[logout, login])

    function ajaxRequest(){
      $.ajax({
        type : "GET",
        url : "http://localhost:1000",
        success : (res) => {
          // console.log(res);
          setAllData(res);
        }
      })
    }

    function httpRequest() {
      $.ajax({
        type : "GET",
        url : `http://localhost:1000/${counter}`,
        success : (response) => {
          setOneData(response);
        }
      })
    }
    // useEffect(()=>{
    //     $("#myBtn").on("click",()=>{
    //         alert("Ok")
    //     })
    // },[])

    useEffect(()=> {
      ajaxRequest();
      httpRequest();
    },[counter])

    function Card({item}) {
      return (
        <>
          <div className={`card my-4 shadow-sm mx-auto ${animation}`}>
            <div className="card-header text-capitalize fw-bold text-center bg-success text-white">
              {item.title}
            </div>
              <div className="card-body">
                {item.body}
              </div>
            
          </div>
        </>
      )
    }

    function prefunc() {
      return (
        counter>1?setCounter(counter-1):null,
        setAnimation("animate__animated animate__fadeInLeft")
      )
    }

    function nextfunc() {
      return (
        setCounter(counter+1),
        setAnimation("animate__animated animate__fadeInRight")
      )
    }
  return (
    <>
        <Container className='bg-secondary rounded bg-opacity-25 py-2 mt-3 px-5 overflow-hidden'>
        <h1 className='text-center text-capitalize my-3'>Http Request</h1>
        {/* <Button variant='primary' className='me-2' onClick={()=>{setLogin(!login)}}>Login</Button>
        <Button variant='danger' onClick={()=>{setLogout(!logout)}}>Logout</Button> */}
        {/* <Button id='myBtn'>Click me</Button>
        <Button className='ms-2' onClick={ajaxRequest}>Click</Button> */}
        {/* {
          JSON.stringify(allData)
        } */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="fs-1 fw-bold">Comments <sup>{allData.length}</sup></div>
          <div className="fs-4 bg-opacity-50 fw-semibold bg-secondary px-2 rounded text-white shadow">New Comments <sup>{counter}</sup> </div>
        </div>
        {
          // allData.map((item, index)=>{
          oneData.map((item, index)=>{
            return <Card item={item} key={index} />
          })
        }
        <div className="float-end"> 
          <Button className='me-2' onClick={prefunc}><i className="fa fa-angle-left"></i></Button>
          <Button onClick={nextfunc}><i className="fa fa-angle-right"></i></Button>
        </div>
        
        </Container>
    </>
  )
}

export default Httprequest