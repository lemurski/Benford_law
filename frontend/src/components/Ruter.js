import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import List from './List';

export default function Ruter() {

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route path='list' element={<List />} />
            </Routes>
        </Router>
    )



}