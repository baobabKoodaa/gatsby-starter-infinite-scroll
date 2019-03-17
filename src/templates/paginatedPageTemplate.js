import React from "react"
import Layout from "../components/layout.js"
import SEO from "../components/seo.js"
import { GlobalStateContext } from "../components/globalState.js"
import View from "../components/view.js"

class PaginatedPageTemplate extends React.Component {

    render() {
        return (
            <Layout>
                <GlobalStateContext.Consumer>
                    {globalState => (
                        <>
                            <SEO title="Home" />
                            <View globalState={globalState} pageContext={this.props.pageContext} />
                        </>
                    )}
                </GlobalStateContext.Consumer>
            </Layout>
        )
    }
}

export default PaginatedPageTemplate