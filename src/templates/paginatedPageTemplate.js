import React from "react"
import Layout from "../components/layout.js"
import SEO from "../components/seo.js"
import Pagination from "../components/pagination.js"
import { InfiniteScroll } from "../components/infiniteScroll.tsx"
import { FaCog } from "react-icons/fa"
import theme from "../theme.yaml"
import Image from "../components/image.js"
import TrafficLight from "../components/trafficlight.js"

/** Template for "home" page with infinite scroll and fallback to pagination. */
class PaginatedPageTemplate extends React.Component {

    state = {
        /*  items contains posts which should be rendered
         *  items is initialized to 1 page of results, in order to:
         *    1. render a page to users who have JS disabled
         *    2. render initial paint fast for all users
         *  the initial page depends on pageContext.currentPage (corresponds to a path like "/", "/2", "/3",...)
         */
        items: this.props.pageContext.pageImages,
        /*
         *  isLoading is used to avoid triggering multiple simultaenous loadings
         */
        isLoading: true,
        /*
         *  cursor represents next page which infinite scroll should fetch
         */
        cursor: this.props.pageContext.currentPage+1,
        /*
         *  useInfiniteScroll to toggle between pagination and infinite scroll for this demo & as fallback in case of error.
         *  The case where "location state" exists is when we navigated to this page through a pagination link.
         */
        useInfiniteScroll: (this.props.location.state && "useInfiniteScroll" in this.props.location.state ? this.props.location.state.useInfiniteScroll : true)
    }

    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount() {
        this.setState(state => ({
          isLoading: false, /* Allow triggering infinite scroll load */
        }))
    }

    componentDidUpdate() {
        console.log("Showing " + this.state.items.length + " images.")
    }

    loadMore = () => {
        this.setState({ isLoading: true, error: undefined })
        fetch(`/paginationJson/index${this.state.cursor}.json`)
          .then(res => res.json())
          .then(
            res => {
              this.setState(state => ({
                items: [...state.items, ...res], // Add resulting post items to state.items
                cursor: state.cursor+1, // Update which page should be fetched next
                isLoading: false // Loading is complete so a new load can be triggered.
              }))
            },
            error => {
              this.setState({
                isLoading: false,
                error,
                useInfiniteScroll: false // Fallback to Pagination on error.
              })
            }
        )
    }

    /** This exists to demo toggling. You will not need this in production. */
    toggle(useInfiniteScroll) {
        if (useInfiniteScroll) {
            /* When we toggle back to infinite scroll, adjust scroll position. Otherwise we might load 1000s of items at once. */
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo(0, scrollTop-1);
            this.setState({
                useInfiniteScroll: true
            })
        } else {
            /* When we toggle back to pagination, reset items and cursor. */
            this.setState({
                useInfiniteScroll: false,
                items: this.props.pageContext.pageImages,
                cursor: this.props.pageContext.currentPage+1,
            })
        }
    }
    

    render() {
        const { pageContext } = this.props
        const paginationData = {
            currentPage: pageContext.currentPage,
            countPages: pageContext.countPages,
            useInfiniteScroll: this.state.useInfiniteScroll
        }
        return (
            <Layout>
                <SEO title="Home" />

                {/* Traffic Lights to toggle between Infinite Scroll and Pagination. */}
                <TrafficLight onClick={this.toggle} green={this.state.useInfiniteScroll} />

                {/* Infinite Scroll (and initial items in case of Pagination). */}
                <InfiniteScroll
                    throttle={100}
                    threshold={900}
                    isLoading={this.state.isLoading}
                    hasMore={this.state.cursor <= pageContext.countPages && this.state.useInfiniteScroll}
                    onLoadMore={this.loadMore}
                >
                    <div style={{
                        flexWrap: "wrap",
                        display: "flex",
                        maxWidth: "100%",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
                        {this.state.items.map((item, index) => <Image item={item} key={index}/> )}
                    </div>
                    
                </InfiniteScroll>


                {/* Show loading spinner if user is able to scroll to bottom. */}
                {this.state.isLoading && (
                    <div className="spinner">
                        <FaCog/>
                    </div>
                )}

                {/* Fallback to Pagination for non JS users. */} 
                {this.state.useInfiniteScroll && (
                    <noscript>
                        <style> 
                            {`.spinner { display: none !important; }`}
                        </style>
                        <Pagination paginationData={paginationData} />
                        <h4><center>Infinite Scroll does not work without JavaScript.</center></h4>
                    </noscript>
                )}

                {/* Fallback to Pagination on toggle (for demo) and also on error. */}
                {!this.state.useInfiniteScroll && (
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
                        display: ${this.state.useInfiniteScroll ? "block" : "none" };

                        :global(svg) {
                            fill: ${theme.color.brand.primaryLight};
                            animation: spinner 3s linear infinite;
                        }
                        
                    }
                    `}
                </style>
            </Layout>
        )
    }
}

export default PaginatedPageTemplate