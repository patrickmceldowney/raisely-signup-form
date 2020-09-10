import React from 'react';
import Signup from '../../components/Signup';
import { FaGithub } from 'react-icons/fa'

import './Home.css';
export default function Home() {
  return (
    <div className='Home'>
      <Signup />
      <a target='_blank' rel="noopener noreferrer" href='https://github.com/patrickmceldowney/raisely-signup-form' className='RepoLink'>
        <FaGithub className='GithubIcon' />
      </a>
    </div>
  );
}