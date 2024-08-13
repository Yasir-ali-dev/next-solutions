import React from 'react';
import { Container } from 'react-bootstrap';
import "../index.css";
const VideoComponent = () => {
  return (
    <Container className='py-3'>
      <h1 className='display-5 p-3 text-center cursive-fonts'><span className='highlighted-green-text'>Level</span>  up your quality of <span className='highlighted-text'>work</span> </h1>
      <video loop muted autoPlay rounded className='w-100' 
        style={{boxShadow:"5px 5px 7px grey", height:"80vh"}}
      >
        <source src='https://download.odoocdn.com/videos/odoo_com/video_homepage.webm' />
      </video>
    </Container>
  )
}

export default VideoComponent;