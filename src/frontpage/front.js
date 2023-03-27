

import React from "react";
import "./front.css"
import Data from "../data";
const Front=({ HandleClientLoad})=>{

   
    return(
    <div className="container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Pd20Bab5GXGeoAiK_XGpoxWWnfLCIkcVGA&usqp=CAU" alt=""></img>
       
   <button type='button' onClick={HandleClientLoad} >Sign-in</button>
    </div>
    );
}

export default Front;
