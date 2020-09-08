import React from 'react';
import './Home.css';
import Signup from '../components/Signup';

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Signup Form</h1>
        <p>A signup form using the Raisely API</p>
        <Signup />
      </div>
    </div>
  );
}