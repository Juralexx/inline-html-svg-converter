import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import styled from 'styled-components';
import Converter from './Converter';
import Head from './Head';
import GlobalStyles from './styles/GlobalStyles'

function App() {

    return (
        <RootContainer>
            <HelmetProvider>
                <Head />
            </HelmetProvider>
            <GlobalStyles />
            <Navbar>
                <div className='navbar__left'>
                    <img src='img/logo.png' alt="HTML SVG Converter" />
                    <p>HTML SVG Converter</p>
                </div>
            </Navbar>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <Converter extension='png' />
                    } />
                    {['png', 'jpg', 'svg']
                        .map(extension => (
                            <Route key={extension} path={`/html-svg-to-${extension}`} element={
                                <Converter extension={extension} />
                            } />
                        ))}
                    <Route path="*" element={
                        <Navigate to="/html-svg-to-png" />
                    } />
                </Routes>
            </BrowserRouter>
            <Footer>
                <div className='footer__inner'>
                    <p>Built by <a href='https://alexandrevurbier.com/' rel='noreferrer'>Alexandre Vurbier</a></p>
                    <img src='img/logo.png' alt="HTML SVG Converter" />
                </div>
            </Footer>
        </RootContainer>
    );
}

export default App;

/**
 * 
 */

const RootContainer = styled.div`
    position   : relative;
    height     : 100vh;
    width      : 100vw;
    background : var(--content);
`

const Navbar = styled.div`
    position        : relative;
    display         : flex;
    justify-content : flex-start;
    padding         : 20px 30px;

    @media(max-width: 768px) {
        padding : 10px 20px;
    }

    .navbar__left {
        display     : flex;
        align-items : center;
        font-weight : 600;

        img {
            max-width    : 40px;
            height       : auto;
            margin-right : 10px;
        }
    }
`

const Footer = styled.div`
    position        : absolute;
    bottom          : 0;
    left            : 0;
    right           : 0;
    display         : flex;
    justify-content : center;
    padding         : 15px 0;

    @media(max-width: 768px) {
        position : relative;
    }

    .footer__inner {
        display         : flex;
        flex-direction  : column;
        justify-content : center;
        align-items     : center;
    }

    p {
        margin-bottom : 8px;
    }

    a {
        color : var(--primary);
    }

    img {
        max-width    : 40px;
        height       : auto;
    }
`