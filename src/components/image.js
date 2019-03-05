import React from "react"

const Image = props => {

    return (
        <React.Fragment>
            <div className="img-container" key={props.index}>
                <a href={props.item.l} target="_blank" rel="noopener noreferrer" >
                    <img
                        className="xxx"
                        //src="http:/sfdijfdsifiusasdasdasddf.com/jdfsdfosdif.jpg"
                        src={props.item.s}
                        alt=""
                        title=""
                    >
                    </img>
                </a>
            </div>
            <style jsx>
                {`
                    .xxx {
                        width: 100%;
                        display: block;
                        border-radius: 10px;
                        border: 1px solid gray;
                        transition: 0.2s ease-in-out;

                        :hover {
                            opacity: 0.4;
                            transform: scale(1.1);
                        }
                    }

                    .img-container {
                        width:200px;
                        height:200px;
                        background:#EEE;
                        border-radius: 10px;
                        border: 1px solid ghostwhite;
                        overflow: hidden;
                    }
                `}
            </style>
        </React.Fragment>
    )
}

export default Image