import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Ruter from './Ruter';
import Homepage from './Homepage';


export default function App() {
    return (
        <>
        <Ruter />
        </>
    )
}



const appDiv = document.getElementById('app');

render(<App />, appDiv) 