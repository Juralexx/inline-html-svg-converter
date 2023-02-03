import React from 'react';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';
import { ClassicInput, DropdownInput, Textarea } from './components/Inputs';
import { Button } from './components/Button';

function Converter(props) {
    const [html, setHtml] = React.useState({ svg: String(), width: String(), height: String() })
    const [extension, setExtension] = React.useState({ extension: props.extension, label: `Inline HTML SVG to ${props.extension}` })

    const checkIfIsHTML = (string) => {
        let regexp = new RegExp(/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i)
        if (regexp.test(string)) return true
        else return false
    }

    const convert = () => {
        let svg = document.querySelector('.inner__svg svg');
        let canvas = document.getElementById('c');
        let width = html.width > 0 ? html.width : 300
        let height = html.height > 0 ? html.height : 300
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        canvas.width = width;
        canvas.height = height;

        if (props.extension !== 'svg') {
            let data = new XMLSerializer().serializeToString(svg);
            let win = window.URL || window.webkitURL || window;
            let img = new Image();
            let blob = new Blob([data], { type: 'image/svg+xml' });
            let url = win.createObjectURL(blob);

            img.onload = () => {
                canvas.getContext('2d').drawImage(img, 0, 0);
                win.revokeObjectURL(url);
                let uri = canvas.toDataURL(`image/${extension.extension}`).replace(`image/${extension.extension}`, 'octet/stream');
                let a = document.createElement('a');
                document.body.appendChild(a);
                a.style = 'display: none';
                a.href = uri
                a.download = (svg?.id || svg?.getAttribute('name') || svg?.getAttribute('aria-label') || 'untitled') + `.${extension.extension}`;
                a.click();
                window.URL.revokeObjectURL(uri);
                document.body.removeChild(a);
            };
            img.src = url;
        } else {
            let data = new XMLSerializer().serializeToString(svg);
            let win = window.URL || window.webkitURL || window;
            let doc = document.implementation.createHTMLDocument('svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"');
            let blob = new Blob([data], { type: 'text/html' });
            let url = win.createObjectURL(blob);

            doc.body.appendChild(svg)
            let a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = url
            a.download = (svg?.id || svg?.getAttribute('name') || svg?.getAttribute('aria-label') || 'untitled') + `.${extension.extension}`;
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            doc.src = url;
        }

        setHtml({ svg: String(), width: String(), height: String() })
    }

    return (
        <RootInner>
            <h1>Convert inline HTML SVG to <span>{extension.extension}</span></h1>
            <p>Use this free online SVG to PNG converter to convert SVG files to PNG images,
                quickly and easily, without having to install any software.</p>
            <ul>
                <li>
                    <img src='img/convert.png' alt='' />
                    Paste or drop your html in the textarea.
                </li>
                <li>
                    <img src='img/convert.png' alt='' />
                    Choose the desired width and height of the converted image.
                </li>
            </ul>
            <DropdownInput value={extension.label} onChange={() => { }}>
                <NavLink to='/html-svg-to-png' data-label="HTML SVG to PNG" onClick={e => setExtension({ extension: 'png', label: e.target.dataset.label })}>
                    HTML SVG to PNG
                </NavLink>
                <NavLink to='/html-svg-to-jpg' data-label="HTML SVG to JPG" onClick={e => setExtension({ extension: 'jpg', label: e.target.dataset.label })}>
                    HTML SVG to JPG
                </NavLink>
                <NavLink to='/html-svg-to-svg' data-label="HTML SVG to SVG" onClick={e => setExtension({ extension: 'svg', label: e.target.dataset.label })}>
                    HTML SVG to SVG
                </NavLink>
            </DropdownInput>
            <div className='inner__'>
                <div className='inner__top'>
                    <div className='inner__top-left'>
                        <Textarea
                            type="text"
                            placeholder="Paste your SVG : <svg> ... </svg>"
                            value={html.svg}
                            onChange={e => setHtml(prev => ({ ...prev, svg: e.target.value }))}
                        />
                    </div>
                    <div className='inner__top-right'>
                        {checkIfIsHTML(html.svg) ? (
                            <div id="d" className='inner__svg' dangerouslySetInnerHTML={{ __html: html.svg }}></div>
                        ) : (
                            <div className='inner__svg'>
                                <img src='img/empty-svg.png' alt='' />
                            </div>
                        )}
                    </div>
                </div>
                <div className="inner__bottom">
                    <div className='inner__bottom-left'>
                        <ClassicInput
                            type="number"
                            placeholder="Image width"
                            min="20"
                            max="9999"
                            value={html.width}
                            onChange={e => setHtml(prev => ({ ...prev, width: e.target.value }))}
                        />
                        <ClassicInput
                            type="number"
                            placeholder="Image height"
                            min="20"
                            max="9999"
                            value={html.height}
                            onChange={e => setHtml(prev => ({ ...prev, height: e.target.value }))}
                        />
                    </div>
                    <div className='inner__bottom-left'>
                        <Button onClick={() => convert()}>Convert</Button>
                    </div>
                </div>
            </div>

            <canvas id="c"></canvas>
        </RootInner>
    );
}

export default Converter;

const RootInner = styled.div`
    position  : relative;
    width     : 100%;
    max-width : 992px;
    padding   : 50px;
    margin    : 0 auto;

    h1 {
        font-weight : 700;
        span {
            text-transform : uppercase;
        }
    }

    p {
        font-size : 16px;
        padding   : 5px 0;
    }

    ul {
        margin-bottom : 30px;

        li {
            position     : relative;
            font-size    : 16px;
            line-height  : 22px;
            padding-left : 10px;
            display      : flex;
            img {
                width        : 15px;
                height       : 10px;
                margin-right : 7px;
                margin-top   : 6px;
            }
        }
    }

    .imgs__displayer {
        display       : flex;
        align-items   : center;
        margin-bottom : 10px;

        img {
            width : 30px;

            &:nth-child(1) {
                width  : 25px;
            }

            &:nth-child(2) {
                width  : 15px;
                margin : 0 15px;
            }
        }
    }

    button {
        height  : 44px;
        padding : 0 30px;
    }

    .inner__ {
        margin-top : 10px;
    }

    .inner__top {
        display         : flex;
        justify-content : space-between;
        width           : 100%;
        padding-bottom  : 10px;

        .inner__top-left {
            display        : flex;
            width          : 70%;

            textarea {
                width : 100%;
            }
        }

        .inner__top-right {
            display     : flex;
            width       : 30%;
            margin-left : 20px;

            textarea {
                width : 100%;
            }
        }
    }

    .inner__bottom {
        display         : flex;
        justify-content : space-between;
        width           : 100%;

        .inner__bottom-left {
            display     : flex;
            align-items : center;
            width       : 100%;

            .classic-input {
                width : 48%;
                input {
                    width : 100%;
                }
                &:nth-child(2) {
                    margin : 0 10px;
                }
            }
        }

        .inner__bottom-left {
            .btn {
                width : 100%;
            }
        }
    }
    
    .inner__svg {
        display          : flex;
        align-items      : center;
        justify-content  : center;
        width            : 100%;
        height           : 100%;
        background-color : var(--content-light);
        border-radius    : var(--rounded-sm);

        img, svg {
            width  : 80px;
            height : 80px;
        }
    }

    canvas {
        box-shadow : var(--shadow-tiny);
        max-width  : 100%;
        width      : 0;
    }
    
    @media(max-width: 768px) {
        padding : 50px 20px;
        h1 {
            font-size : 24px;
        }
        p {
            font-size  : 14px;
            text-align : justify;
        }
        ul {
            li {
                font-size : 14px;
                text-align : justify;
            }
        }

        .inner__top {
            flex-direction : column;
            .inner__top-left {
                width : 100%;
            }
            .inner__top-right {
                width       : 100%;
                margin-left : 0;
                margin-top  : 10px;
            }
        }

        .inner__bottom {
            flex-direction : column;
            .inner__bottom-left {
                justify-content : space-between;
                margin-bottom   : 10px;
                .classic-input {
                    &:nth-child(2) {
                        margin : 0 0 0 10px;
                    }
                }
            }
        }

        .inner__svg {
            padding : 30px 0;
        }
    }
`