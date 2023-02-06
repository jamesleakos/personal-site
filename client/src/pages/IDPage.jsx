// dependancies
import React from 'react';
import { useLoaderData } from 'react-router-dom';

function IDPage() {  
  const id = useLoaderData();
  console.log(id);
  return (
    <div className='id-page'>
      Hello
    </div>
  )
}

export default IDPage;