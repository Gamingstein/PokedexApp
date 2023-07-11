import React from 'react'
import styled from 'styled-components'

const InputBox = styled.input`
border-radius: 40px;
font-family: 'Bangers', cursive;
height: 20px;
font-size: 20px;
position: absolute;
margin-left: 23vw;
color: white;
padding: 20px;
align-self: center;
justify-self: center;
width: 50vw;
border-width: 0;
background: linear-gradient(60deg,#1d4184,#265690);
opacity: 50%;
transition: 0.2s;
&:hover {
  opacity: 100%;
  background: linear-gradient(120deg,#1d4184,#265690af);
}
@media screen and (max-width : 640px) {
    margin-top: 60vh ;
}
`;
export default function Search({ func }) {
    return (
        <InputBox type='text' placeholder='Search Pokemon' className='searchBox' onChange={(e) => func(e.target.value)} />
    )
}
