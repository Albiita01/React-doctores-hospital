import React, { Component } from 'react'
import HomeComponent from './components/HomeComponent';
import MenuComponent from './components/MenuComponent';
import DoctoresComponent from './components/DoctoresComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';

export default class Router extends Component {

    render() {

        function DoctoresElement() {
            let { idhospital } = useParams();
            return (<DoctoresComponent idhospital={idhospital} />)
        }

        return (
            <BrowserRouter>
                <MenuComponent />
                <Routes>
                    <Route path="/" element={<HomeComponent />} />
                    <Route path="/doctores/:idhospital" element={<DoctoresElement />} />
                </Routes>
            </BrowserRouter>
        )
    }
}