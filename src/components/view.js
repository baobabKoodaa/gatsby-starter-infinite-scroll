import React from "react"
import { Link } from "gatsby"
import Pagination from "./pagination.js"
import { InfiniteScroll } from "./infiniteScroll.tsx"
import { FaCog } from "react-icons/fa"
import theme from "../theme.yaml"
import Grid from "./grid.js"
import TrafficLight from "./trafficlight.js"

class View extends React.Component {

    constructor(props) {
        super(props)
        console.log("*** Constructing View ***")
        if (!props.globalState.items || !props.globalState.useInfiniteScroll) {
            console.log("View is initializing items according to page " + props.pageContext.currentPage)
            props.globalState.updateState("items", props.pageContext.pageImages)
            props.globalState.updateState("cursor", props.pageContext.currentPage+1)
        }
    }

    componentDidMount() {
        this.props.globalState.updateState("isLoading", false);
    }

    render() {
        const g = this.props.globalState
        const pageContext = this.props.pageContext
        const paginationData = {
            currentPage: pageContext.currentPage,
            countPages: pageContext.countPages,
            useInfiniteScroll: g.useInfiniteScroll
        }

        /*
         * Typically currentlyVisibleItems come from global state.
         * In other cases we simply render the items of this page (corresponds to a path like "/", "/2", "/3",...)
         * The other cases are:
         * - If a user has JS disabled (we won't be able to manipulate global state).
         * - The very first render on initial pageload. 
         */
        const currentlyVisibleItems = g.items || pageContext.pageImages

        return(
            <>

                {/* Traffic Lights to toggle between Infinite Scroll and Pagination. */}
                <TrafficLight onClick={g.toggle} green={g.useInfiniteScroll} pageContext={pageContext} />

                {/* Infinite Scroll */}
                <InfiniteScroll
                    throttle={150}
                    threshold={1800}
                    isLoading={g.isLoading}
                    hasMore={g.hasMore(pageContext)}
                    onLoadMore={g.loadMore}
                >

                    {/* Visible items given as a child element for inf. scroll). */}
                    <Grid items={currentlyVisibleItems} />
                    
                </InfiniteScroll>

                {/* Notification for demo purposes. */}
                {g.useInfiniteScroll && !g.hasMore(pageContext) && !g.isLoading && (
                    <div style={{ paddingTop: "40px"}}>
                        <h4>
                        <center>
                            Congrats! You scrolled through all
                            {" "+g.items.length+" "}
                            items starting from page 
                            {" "+pageContext.currentPage}.
                            Go to page <Link to="/">one</Link>?
                        </center>
                        </h4>
                    </div>
                )}

                {/* Loading spinner. */}
                {g.isLoading && (
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