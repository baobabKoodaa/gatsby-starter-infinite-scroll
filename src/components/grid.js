import React from "react"

import GridItem from "./gridItem.js";

const Grid = (props) => {
    const g = props.globalState
    const currentPage = props.pageContext.currentPage
    
    const items = []
    var i = 0, j = 0 , numberOfItemsOnLatestPage = 0
    const js = !g.isInitializing()
    if (g.useInfiniteScroll && g["page"+currentPage]) {
        for (var pageNum=currentPage ;; pageNum++) {
            const key = "page"+pageNum
            if (g[key]) {
                /* Add gridItems that we have received metadata for. */
                numberOfItemsOnLatestPage = g[key].length
                for (j=0; j<numberOfItemsOnLatestPage; j++) {
                    items.push(<GridItem js={js} item={g[key][j]} key={"gi"+(i++)}/>)
                }
            }
            else {
                const lastFetchedPage = Math.min(g.cursor, props.pageContext.countPages)
                for (; pageNum <= lastFetchedPage; pageNum++) {
                    /* For each page that we have fetched, but haven't received metadata for, render empty gridItems. */
                    const expectedNumberOfItemsOnPage = numberOfItemsOnLatestPage
                    for (j=0; j<expectedNumberOfItemsOnPage; j++) {
                        items.push(<GridItem key={"gi"+(i++)}/>)
                    }
                }
                /* Don't add anything for pages that the user hasn't fetched (scrolled to) yet. */
                break;
            }
            
        }
    } else {
        /* This 'else' covers special cases when we don't have items in global state.
         * - If a user has JS disabled (we won't be able to manipulate global state).
         * - And the very first render on initial pageload. 
         * In these cases we simply render the items of this page (corresponds to a path like "/", "/2", "/3",...)
         */
        props.pageContext.pageImages.forEach(item => items.push(<GridItem item={item} key={"gi"+(i++)}/>))
    }

    console.log("Rendering " + i + " gridItems.")

    return (
        <>
            <div className="grid">
                {items}
            </div>
            <style jsx>
                {`
                    .grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        grid-gap: 1px;
                    }

                    @media (max-width: 800px) {
                        .grid {
                          grid-template-columns: 1fr 1fr 1fr;
                        }
                    }

                    @media (max-width: 300px) {
                        .grid {
                          grid-template-columns: 1fr;
                        }
                    }
                `}
            </style>
        </>
    )
    
}





export default Grid;