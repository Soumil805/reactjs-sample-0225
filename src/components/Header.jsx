import React, { useState, useEffect } from "react";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header() {


 
    const randomId = Math.floor(Math.random() * 1000); // Random ID between 0 and 999
    
  

  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      <div className="profile-photo">
        
          <img
            src={`https://picsum.photos/id/${randomId}/200/300`}
            alt="Profile"
          />
         
      </div>
    </header>
  );
}

export default Header;
