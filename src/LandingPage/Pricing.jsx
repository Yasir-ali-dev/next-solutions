import React from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import "../index.css";

const pricingPackages =["Basic","Standard","Premium"];
const prices=[0,50,100];
const pricesDescription =[
    ["Essential tools for core business needs"],
    ["Enhanced functionalities","Advanced CRM and management tools","Scalable solutions for growing businesses"],
    ["Comprehensive suite of services","Full customization options","Premium support and advanced technology integrations","Tailored for enterprises with complex requirements"]
]
const Pricing = () => {
  return (
    <Container className='roboto'>
        <h1 className='display-5 p-3 text-center cursive-fonts'>
           <span className='highlighted-blue-text'>Pricing</span> 
        </h1>
        <p className='fs-5 text-center py-3'>
        Next Solutions offers flexible pricing models designed to provide affordable access to premium services, tailored to meet diverse business needs.</p>
        <div className='d-flex justify-content-center gap-5'>
            {pricingPackages.map((price, index)=>{
                return(
                    <Card key={index} className='roboto'>
                    <Card.Header className='text-center cursive-fonts fs-4'>{price}</Card.Header>
                    <Card.Body>
                    <Card.Title className='text-center py-2'>
                        <p className='price'>
                        <sup className='text-secondary fs-1'>${" "}</sup>
                            {prices[index]}
                        <sub className='text-secondary fs-6'>{" "} / month</sub>
                        </p>
                    </Card.Title>
                    <Card.Text>
                        <ul className='roboto'>
                            {pricesDescription[index].map((desc,index)=>{
                                return(
                                    <li key={index} className='py-0'>{desc}</li>
                                )
                            })}
                        </ul>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer className='text-center'>
                        <button className='btn-custom'>{
                            index === 0 ? "Start Now": "Buy Now"
                        }</button>
                   </Card.Footer>
                </Card>
                )
            })}
        </div>
    </Container>
  )
}

export default Pricing;
