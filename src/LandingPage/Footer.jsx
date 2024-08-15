import React from 'react'
import { Container, Dropdown, Image } from 'react-bootstrap';
import "../index.css";
const links=["github","gmail","leetcode","linkedin"];
const Footer = () => {
  return (
    <div className='roboto' >
        <div className='px-5'>
        <h3 className='lead text-center fs-2 cursive-fonts pt-5 pb-3' >Next {" "}
            <span className='highlighted-green-text'>Solutions</span> 
        </h3>
        <div className='d-flex gap-5 px-5 justify-content-between flex-wrap'>
            <div className='col-6 col-lg-6 col-sm-12 col-xs-12 d-flex gap-2 justify-content-between flex-wrap'>
                <ul className='list-unstyled'>
                    <li className='fs-4'>Community</li>
                    <li>Tutorials</li>
                    <li>Documentation</li>
                    <li>Forum</li>
                    <li className='fs-4 mt-3'>Open Source</li>
                    <li>Github</li>
                    <li>Leetcode</li>
                    <li>Slack</li>
                </ul>
                <ul className='list-unstyled'>
                    <li className='fs-4'>Services</li>
                    <li>Support</li>
                    <li>Upgrade</li>
                    <li>Education</li>
                    <li>Custom Development</li>
                    <li>Find a Partner</li>
                    <li>Become a Partner</li>
                    <li>Hosting</li>
                </ul>
                <ul className='list-unstyled'>
                    <li className='fs-4'>About us</li>
                    <li>Our Company</li>
                    <li>Brand</li>
                    <li>Contact Us</li>
                    <li>Events</li> 
                    <li>Podcast</li>
                    <li>Blog</li>
                    <li>Customers</li>
                    <li>Privacy</li>
                </ul>
            </div>
            <div className='col-md-5 col-lg-5 col-sm-12 col-12 p-3'>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        English
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Franch</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Spanish</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Urdu</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <hr />
                <p className='text-secondary py-2'>
                     Odoo is a suite of open source business apps that cover all your company needs: CRM, eCommerce, accounting, inventory, point of sale, project management, etc.
                </p>
                <p className='text-secondary'>Odoo's unique value proposition is to be at the same time very easy to use and fully integrated.</p>
                <div className='d-flex justify-content-center gap-3 p-1'>
                    {links.map((link, index)=>{
                        return (
                            <a key={index} href='_'>
                                <Image width={"35px"} src={`/social_links/${link}.png`}/>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
        </div>
        <h3 className='fs-6 text-center text-light py-3 bg-color'>
            <i>
            all rights reserved @ <span className='cursive-fonts'>
                Next Solutions
            </span>
            </i>
        </h3>
    </div>
  )
}
export default Footer;
