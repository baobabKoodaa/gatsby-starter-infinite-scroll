import React from "react"
import { Link } from "gatsby"

const GridItem = props => {

    return (
        <React.Fragment>
            <div className="img-container" key={props.index}>

                {props.item && props.js && (
                    <Link to={`/viewItem?id=${props.item.l}`}>
                        <img src={props.item.s} alt="" title="" />
                    </Link>
                )}
                {props.item && !props.js && (
                    <a href={props.item.l} target="_blank" rel="noopener noreferrer">
                        <img src={props.item.s} alt="" title="" />
                    </a>
                )}

            </div>
            <style jsx>
                {`
                    .img-container {
                        position: relative;
                        width:100%;
                        background:#EEE;
                        overflow: hidden;
                        z-index: 1;

                        align-items:stretch;
                        border-bottom-color:rgb(0, 0, 0);
                        border-bottom-style:solid;
                        border-bottom-width:0px;
                        border-image-outset:0px;
                        border-image-repeat:stretch;
                        border-image-slice:100%;
                        border-image-source:none;
                        border-image-width:1;
                        border-left-color:rgb(0, 0, 0);
                        border-left-style:solid;
                        border-left-width:0px;
                        border-right-color:rgb(0, 0, 0);
                        border-right-style:solid;
                        border-right-width:0px;
                        border-top-color:rgb(0, 0, 0);
                        border-top-style:solid;
                        border-top-width:0px;
                        box-sizing:border-box;
                        color:rgb(38, 38, 38);
                        display:block;
                        flex-basis:0%;
                        flex-direction:column;
                        flex-grow:1;
                        flex-shrink:0;
                        font-family:-apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                        font-size:14px;
                        font-stretch:100%;
                        font-style:normal;
                        font-variant-caps:normal;
                        font-variant-east-asian:normal;
                        font-variant-ligatures:normal;
                        font-variant-numeric:normal;
                        font-weight:400;
                        line-height:18px;
                        margin-bottom:0px;
                        margin-left:0px;
                        margin-right:28px;
                        margin-top:0px;
                        padding-bottom:0px;
                        padding-left:0px;
                        padding-right:0px;
                        padding-top:0px;
                        position:relative;
                        text-size-adjust:100%;
                        vertical-align:baseline;    
                        -webkit-box-align:stretch;
                        -webkit-box-direction:normal;
                        -webkit-box-flex:1;
                        -webkit-box-orient:vertical;
                    }

                    .img-container::before {
                        content: '';
                        display: block;
                        margin-top: 100%;
                        z-index: 1;
                    }

                    .img-container img {
                        top: 0;
                        display: block;
                        position: absolute;
                        width: 100%;
                        height: auto;
                        margin: 0 !important;
                        transition: 0.2s ease-in-out;
                        -webkit-transition: .2s ease-in-out;
                        z-index: 2;
                        :hover {
                            -webkit-filter: brightness(50%);
                            filter: brightness(50%);
                            transform: scale(1.1);
                        }
                    }
                `}
            </style>
        </React.Fragment>
    )
}

export default GridItem