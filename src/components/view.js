import React from "react"
import { Link } from "gatsby"
import Pagination from "./pagination.js"
import { InfiniteScroll } from "./infiniteScroll.js"
import { FaCog } from "react-icons/fa"
import theme from "../theme.yaml"
import Grid from "./grid.js"
import TrafficLight from "./trafficlight.js"

/** View for "home" page with infinite scroll and fallback to pagination. */
class View extends React.Component {

    constructor(props) {
        super(props)
        console.log("*** Constructing View ***")
        if (props.globalState.isInitializing() || !props.globalState.useInfiniteScroll) {
            const pageKey = "page" + props.pageContext.currentPage
            console.log(`View is initializing items according to ${pageKey}.`)
            props.globalState.updateState({
                [pageKey]: props.pageContext.pageImages,
                cursor: props.pageContext.currentPage+1
            })
        }
    }

    render() {
        const g = this.props.globalState
        const pageContext = this.props.pageContext
        const paginationData = {
            currentPage: pageContext.currentPage,
            countPages: pageContext.countPages,
            useInfiniteScroll: g.useInfiniteScroll
        }

        return(
            <>

                {/* Traffic Lights to toggle between Infinite Scroll and Pagination. */}
                <TrafficLight onClick={g.toggle} green={g.useInfiniteScroll} pageContext={pageContext} />

                {/* Infinite Scroll */}
                <InfiniteScroll
                    throttle={150}
                    threshold={1800}
                    hasMore={g.hasMore(pageContext)}
                    onLoadMore={g.loadMore}
                >

                    {/* Grid given as a child element for Infinite Scroll. */}
                    <Grid globalState={g} pageContext={pageContext} />
                    
                </InfiniteScroll>

                {/* Notification for demo purposes. */}
                {g.useInfiniteScroll && g.cursor !== 0 && !g.hasMore(pageContext) && (
                    <div style={{ paddingTop: "40px"}}>
                        <h4>
                        <center>
                            Congrats! You scrolled through all items starting from page
                            {" "+pageContext.currentPage}.
                            Go to page <Link to="/">one</Link>?
                        </center>
                        </h4>
                    </div>
                )}

                {/* Loading spinner. */}
                {(g.cursor === 0 || g.hasMore(pageContext)) && (
                    <div className="spinner">
                        <FaCog/>
                    </div>
                )}

                {/* Fallback to Pagination for non JS users. */} 
                {g.useInfiniteScroll && (
                    <noscript>
                        <style> 
                            {`.spinner { display: none !important; }`}
                        </style>
                        <Pagination paginationData={paginationData} />
                        <h4><center>Infinite Scroll does not work without JavaScript.</center></h4>
                    </noscript>
                )}

                {/* Fallback to Pagination on toggle (for demo) and also on error. */}
                {!g.useInfiniteScroll && (
                    <Pagination paginationData={paginationData} />
                )}

                <style jsx>{`
                    @keyframes spinner {
                        to {transform: rotate(360deg);}
                    }
                    .spinner {
                        margin-top: 40px;
                        font-size: 60px;
                        text-align: center;
                        display: ${g.useInfiniteScroll ? "block" : "none" };

                        :global(svg) {
                            fill: ${theme.color.brand.primaryLight};
                            animation: spinner 3s linear infinite;
                        }
                        
                    }
                    `}
                </style>

            </>


        )
    }
}

export default View