const path = require(`path`)
const fs = require('fs');

exports.createPages = ({ graphql, actions}) => {
    const { createPage } = actions

    /* 
     * There are a few local images in this repo to show you how to fetch images with GraphQL.
     * In order to keep the repo small, the rest of the images are fetched from Unsplash by the client's
     * browser. Their URLs are stored in a text file. You don't want to fetch images like that in production.
     */
    var rawRemoteUrls = JSON.parse(fs.readFileSync('content/images/remote_image_urls.json', 'utf8'));
    const remoteImages = rawRemoteUrls.map(url => {
        const resizeParams = '?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop'
        return {
            "l": url,
            "s": url+resizeParams
        }
    })

    /* In production you should fetch your images with GraphQL like this: */
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

        const localImages = result.data.localImages.edges.map(edge => {
            return {
                "l": edge.node.childImageSharp.fluid.originalImg,
                "s": edge.node.childImageSharp.fixed.src
            }
        })

        const images = [...localImages, ...remoteImages]

        /* Gatsby will use this template to render the paginated pages (including the initial page for infinite scroll). */
        const paginatedPageTemplate = path.resolve(`src/templates/paginatedPageTemplate.js`)

        /* Iterate needed pages and create them. */
        const countImagesPerPage = 50
        const countPages = Math.ceil(images.length / countImagesPerPage)
        for (var currentPage=1; currentPage<=countPages; currentPage++) {
            const pathSuffix = (currentPage>1? currentPage : "") /* To create paths "/", "/2", "/3", ... */

            /* Collect images needed for this page. */
            const startIndexInclusive = countImagesPerPage * (currentPage - 1)
            const endIndexExclusive = startIndexInclusive + countImagesPerPage
            const pageImages = images.slice(startIndexInclusive, endIndexExclusive)

            /* Combine all data needed to construct this page. */
            const pageData = {
                path: `/${pathSuffix}`, 
                component: paginatedPageTemplate,
                context: {
                     /* If you need to pass additional data, you can pass it inside this context object. */
                    pageImages: pageImages,
                    currentPage: currentPage,
                    countPages: countPages
                }
            }

            /* Create normal pages (for pagination) and corresponding JSON (for infinite scroll). */
            createJSON(pageData)
            createPage(pageData)
        }
        console.log(`\nCreated ${countPages} pages of paginated content.`)


    })
}

function createJSON(pageData) {
    const pathSuffix = pageData.path.substring(1)
    const dir = "public/paginationJson/"
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    const filePath = dir+"index"+pathSuffix+".json";
    const dataToSave = JSON.stringify(pageData.context.pageImages);
    fs.writeFile(filePath, dataToSave, function(err) {
      if(err) {
        return console.log(err);
      }
    }); 
}
