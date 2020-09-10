import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'

import './Welcome.css';

export default function Welcome() {
  return(
    <div className='Welcome'>
      <div className='WelcomeTitle'>
        <h3>Thanks for Joining!</h3>
      </div>
      <Link to='/' className='ReturnWrapper'>
        <FaArrowLeft className='ReturnIcon' />
        <p className='ReturnText'>Return</p>
      </Link>
    </div>

  );
}