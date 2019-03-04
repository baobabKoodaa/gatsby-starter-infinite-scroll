import React from "react"
import Layout from "../components/layout.js"
import SEO from "../components/seo.js"
import Pagination from "../components/pagination.js"

class PaginatedPageTemplate extends React.Component {

    

    render() {
        const { pageContext } = this.props
        const items = pageContext.initialImages
        return (
            <Layout>
                <SEO title="Home" />

                {items.map((item, index) => {
                    return (
                        <a href={item.l} target="_blank" rel="noopener noreferrer" key={index}>
                            <img src={item.s} alt=""></img>
                        </a>
                    )
                })}

                <Pagination currentPage={pageContext.currentPage} countPages={pageContext.countPages} />
            </Layout>
        )
    }
}

export default PaginatedPageTemplate