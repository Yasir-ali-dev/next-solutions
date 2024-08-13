import React from 'react'
import { Container, Image } from 'react-bootstrap';
import "../index.css";
const servicesArray=["CRM.png","management.png","technology.webp"];
const description=[
    "Our CRM solutions streamline customer interactions and data management, driving better customer relationships and sales growth.",
    "Next Solutions provides robust management tools to enhance operational efficiency and strategic decision-making",
    "We offer cutting-edge technology services that empower businesses with innovative tools and solutions for digital transformation."
];
const Services = () => {
  return (
    <Container className='roboto'>
        <h1 className='display-5 p-3 text-center cursive-fonts'>
           <span className='highlighted-blue-text'>Services</span>  in one platform
        </h1> 
        <p className='fs-5 text-center'>Next Solutions offers a comprehensive suite of services, including CRM, ERP, and project management tools, all integrated into a single platform for streamlined business operations.</p>
        <div className='pt-3 pb-1 d-flex justify-content-center align-items-center gap-5'>
            {servicesArray.map((service,index)=>{
                return (
                    <div className='p-3 d-flex justify-content-center flex-column align-items-center' key={index}>
                        <Image src={`/services/${service}`} width={"250px"} />
                        <p className='py-3 py-1 text-secondary text-center'>{description[index]}</p>
                    </div>
                )
            })}
        </div>   
        <div className='text-center'>
            <button className='btn-custom'>Explore More</button>
        </div>  
    </Container>
  )
}

export default Services;

