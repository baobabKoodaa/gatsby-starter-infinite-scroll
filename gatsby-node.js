const path = require(`path`)

exports.createPages = ({ graphql, actions}) => {
    const { createPage } = actions

    return graphql(`
        {
            localImages: allFile(
                filter: {
                    extension: {regex: "/(jpeg|jpg|png)/"},
                    sourceInstanceName: {eq: "images"}
                }
            ) {
                edges {
                    node {
                        childImageSharp {
                            fixed(quality: 95, width: 200, height: 200) {
                                src
                            }
                            fluid {
                                originalImg
                            }
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            throw result.errors
        }

        /* 
         * There are a few local images in this repo to show you how to fetch images with GraphQL.
         * In order to keep the repo small, the rest of the images are fetched from Unsplash by the client's
         * browser. Their URLs are stored in a text file. You don't want to fetch images like that in production.
         */
        const images = result.data.localImages.edges.map(edge => {
            return {
                "l": edge.node.childImageSharp.fluid.originalImg,
                "s": edge.node.childImageSharp.fixed.src
            }
        })

        /*
         * Gatsby will use this template to render the paginated pages (including the initial page for infinite scroll).
         */
        const paginatedPageTemplate = path.resolve(`src/templates/paginatedPageTemplate.js`)

        /*
         * Create normal pages (for pagination) and corresponding JSON (for infinite scroll).
         */
        const countImagesPerPage = 20
        const countPages = Math.ceil(images.length / countImagesPerPage)
        for (var pageNum=1; pageNum<=countPages; pageNum++) {

            /* Collect images needed for this page. */
            const startIndexInclusive = countImagesPerPage * (pageNum - 1)
            const endIndexExclusive = startIndexInclusive + countImagesPerPage
            const pageImages = images.slice(startIndexInclusive, endIndexExclusive)

            /* Combine all data needed to construct this page. */
            const pageData = {
                path: `/${pageNum > 1 ? pageNum : ""}`, /* Becomes "/", "/2", "/3", ... */
                component: paginatedPageTemplate,
                context: { initialImages: pageImages } /* If you need to pass additional data, you can pass it inside the context object. */
            }

            console.log("Creating page")

            createJSON(pageData)
            createPage(pageData)
        }


    })
}

function createJSON(pageData) {

}