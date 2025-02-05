import React, { useEffect } from 'react'
import './Tip.css'
import axios from 'axios';
export default function Tip() {

    useEffect(() => {
        axios.get('http://localhost:3000/api/tips')
        .then((response) => {
            console.log(response.data);
            const tips = response.data;
        })
        .catch((error) => console.error("Error fetching tips:", error));
    }, []); 

  return (
    <div>Tip</div>
  )
}
