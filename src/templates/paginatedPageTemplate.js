import React from "react"
import Layout from "../components/layout.js"
import SEO from "../components/seo.js"
import Pagination from "../components/pagination.js"
import { InfiniteScroll } from "../components/infiniteScroll.tsx"
import { FaCog } from "react-icons/fa"
import theme from "../theme.yaml"
import Image from "../components/image.js"

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
        cursor: this.props.pageContext.currentPage+1
    }

    componentDidMount() {
        this.setState(state => ({
          isLoading: false, /* Allow triggering infinite scroll load */
        }))
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
              console.log("Showing " + this.state.items.length + " images.")
            },
            error => {
              this.setState({
                isLoading: false,
                error,
                // TOOD: maybe fallback to pagination on error, too?
              })
            }
        )
      }
    

    render() {
        const { pageContext } = this.props
        return (
            <Layout>
                <SEO title="Home" />

                {/* Infinite Scroll (and initial items in case of Pagination). */}
                <InfiniteScroll
                    throttle={100}
                    threshold={900}
                    isLoading={this.state.isLoading}
                    hasMore={this.state.cursor <= pageContext.countPages}
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
                <noscript>
                    <style> 
                        {`.spinner { display: none !important; }`}
                    </style>
                    <Pagination currentPage={pageContext.currentPage} countPages={pageContext.countPages} />
                </noscript>

                <style jsx>{`
                    @keyframes spinner {
                        to {transform: rotate(360deg);}
                    }
                    .spinner {
                        margin-top: 40px;
                        font-size: 60px;
                        text-align: center;
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