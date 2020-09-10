import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'

import './Welcome.css';

export default function Welcome() {
  return(
    <div className='Welcome'>
      <div className='WelcomeTitle'>
        <h3>Thanks for Joining!</h3>
      </div>
      <Link to='/' className='ReturnWrapper'>
        <p className='ReturnText'>Return</p>
        <FaArrowRight className='ReturnIcon' />
      </Link>
    </div>

  );
}