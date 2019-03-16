// Original by Azik Samarkandiy at http://cssdeck.com/labs/traffic-light-using-css
// Heavily modified by Baobab Koodaa.

import React from "react"

class TrafficLight extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            display: "none", // Hide for users who have JS disabled
            green: props.green,
        }
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount() {
        this.setState({
            display: "flex"
        })
    }

    onClick(bool) {
        this.setState({
            green: bool
        })
        this.props.onClick(bool, this.props.pageContext)
    }

    render() {
        const greenOpacity = (this.state.green ? 1.0 : 0.3)
        const redOpacity = (this.state.green ? 0.3 : 1.0)
        return (
            <React.Fragment>
                <div className="trafficlight" title="Toggle between Infinite Scroll and Pagination">
                    <div className="red" onClick={() => this.onClick(false)}></div>
                    <div className="green" onClick={() => this.onClick(true)}></div>
                </div>
                <style jsx>{`  
                .trafficlight{
                    display: ${this.state.display};
                    background: #222;
                    width: 100px;
                    height: 50px;
                    border-radius: 20px;
                    position: fixed;
                    right: 150px;
                    top: 20px;
                    border: solid 5px #333;
                    z-index: 99;
                }
                
                .trafficlight:after{
                    background: #222;
                    content: "";
                    width: 15px;
                    height: 20px;
                    margin-left: 10px;
                    position: fixed;
                    top: 0px;
                    z-index: -1;
                }
                
                .red{
                    background: red;
                    background-image: radial-gradient(brown, transparent);
                    background-size: 5px 5px; 
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    position: relative;
                    top: 8px;
                    left: 10px;
                    border: dotted 2px red;
                    box-shadow: 
                    0 0 20px #111 inset,
                    0 0 10px red;
                    opacity: ${redOpacity};
                    cursor: pointer;
                }
                
                .green{
                    background: green;
                    background-image: radial-gradient(lime, transparent);
                    background-size: 5px 5px;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    border: dotted 2px lime;
                    position: relative;
                    top: 8px;
                    left: 30px;
                    box-shadow: 
                    0 0 20px #111 inset,
                    0 0 10px lime;
                    cursor: pointer;
                    opacity: ${greenOpacity};
                }
                `}</style>
            </React.Fragment>
        )
    }
};

export default TrafficLight;