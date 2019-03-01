import React from "react"
import Layout from "../components/layout.js";
import SEO from "../components/seo.js";

class PaginatedPageTemplate extends React.Component {

    render() {
        console.log(this.props.pageContext.initialImages)
        const items = this.props.pageContext.initialImages
        return (
            <Layout>
                <SEO title="Home" />
                <h1>Infinite scroll</h1>
                {items.map((item, index) => {
                    return (
                        <a href={item.l} target="_blank" rel="noopener noreferrer">
                            <img src={item.s} alt="" key={index}></img>
                        </a>
                    )
                })}

                
            </Layout>
        )
    }
}

export default PaginatedPageTemplate