import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'

import './NotFound.css';

export default function NotFound() {
  return(
    <div className='NotFound'>
      <div className='NotFoundTitle'>
        <h3>Sorry, page not found!</h3>
      </div>
      <Link to='/' className='ReturnWrapper'>
        <FaArrowLeft className='ReturnIcon' />
        <p className='ReturnText'>Return</p>
      </Link>
    </div>
  );
}