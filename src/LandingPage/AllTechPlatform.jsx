import React from 'react'
import { Container, Image } from 'react-bootstrap';
import "../index.css";

const techs=["device_expenses.webp","device_iot.webp","device_kiosk.webp","device_systems.webp","device_shopfloor.webp","device_inventory.webp","device_frontdesk.webp"]

const AllTechPlatform = () => {
  return (
    <Container className='p-1 roboto' >
        <h1 className='display-5 p-3 text-center cursive-fonts'>
           <span className='highlighted-blue-text'>All the tech</span>  in one platform
        </h1>
        <div className='d-flex gap-4 justify-content-center  flex-wrap'>
            {techs.map((imgpath,index)=>{
                return (
                    <div key={index} className='circle-img'>
                        <Image src={`/tech/${imgpath}`}  alt={`${imgpath}_img`}/>
                        <p className='fs-4 text-uppercase text-center roboto'>{imgpath.slice(0,-5).replace("device_","")}</p>
                    </div>
                )
            })}
        </div>


    </Container>
  )
}

export default AllTechPlatform;
