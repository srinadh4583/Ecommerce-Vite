import React from 'react';
import { TbHexagonLetterS,TbHexagonLetterA } from "react-icons/tb";

const Logo = () => {
  const iconSize = 64;
  const circleSize = 60;

  return (
    <>
    <div style={{
      width: circleSize,
      height: circleSize,
      borderRadius: '50%',
      backgroundColor: '#007bff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: iconSize,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '60%' }}>
        <TbHexagonLetterS />
        <TbHexagonLetterA /> 
      </div>  
    </div>
    </>
  );
};

export default Logo;
