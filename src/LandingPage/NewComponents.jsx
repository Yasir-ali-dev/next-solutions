import React from 'react'
import { Container, Image } from 'react-bootstrap';
import "../index.css";

const images =["blog","bucket","crm","elearning","forum","icon","knowledge","livechat","planning","project","purchase","rental","sales","studio","subscription"];
const NewComponents = () => {
  return (
    <Container className='roboto'>
      <div className='d-flex  gap-5 p-2 justify-content-center flex-wrap'>
        {images.map((img,index)=>{
          return (
              <div key={index} className='d-flex flex-column justify-content-center align-items-center'>
                <div className='p-4 bg-color rounded'>
                   <Image src={`${img}.svg`}></Image>     
                </div>
                <p className='text-center text-uppercase'> {img}</p>
            </div>
        )
        })}
        </div>  
        <div className='d-flex'>
            <a href="#" className='ms-auto px-5 m-3 text-uppercase link-underline-light'>view all <span>&#8594;</span></a>
        </div>
    </Container>
  )
}

export default NewComponents;
