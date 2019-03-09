import React from "react"

const GridItem = props => {

    return (
        <React.Fragment>
            <div className="img-container" key={props.index}>
                <a href={props.item.l} target="_blank" rel="noopener noreferrer" >
                    <img
                        src={props.item.s}
                        alt=""
                        title=""
                    />
                </a> 
            </div>
            <style jsx>
                {`
                    .img-container {
                        position: relative;
                        width:100%;
                        background:#EEE;
                        border-radius: 5px;
                        border: 1px solid ghostwhite;
                        overflow: hidden;
                        z-index: 1;
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
                        border-radius: 5px;
                        border: 1px solid gray;
                        transition: 0.2s ease-in-out;
                        z-index: 2;

                        :hover {
                            opacity: 0.4;
                            transform: scale(1.1);
                        }
                    }
                `}
            </style>
        </React.Fragment>
    )
}

export default GridItem