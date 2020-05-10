// https://www.gatsbyjs.org/docs/node-apis/
// https://www.gatsbyjs.org/docs/api-files-gatsby-node/
// https://www.toptal.com/nodejs/gatsby-js-node-js-static-site-generator-pt-1
// https://www.gatsbyjs.org/docs/debugging-async-lifecycles/
const path = require(`path`)
const fs = require('fs');
const axios = require('axios');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // Instagram API
    const token = 'IGQVJWbXJDOWlsdHI0dGF3MHZAQZA1cwWDBOa2U5cUp0WWpXV0ZAFUXdzQmUwcG9ZALTJqTXVRb3FwdXZAKRUdMbGVkeXk4WFdNejRYaDNoOHM4bkxydWdsRnFLbFpJWnBud19Ba0VqV19BQ1NQY09aMTl1QQZDZD';

    // Fetch async data for page creation.
    const remoteImages = await getData(token);

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
                            fixed(quality: 95, width: 300, height: 300) {
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
        // GUARD: Throw error if results in errors
        if (result.errors) { throw result.errors }

        // const localImages = result.data.localImages.edges.map(edge => {
        //     return {
        //         "l": edge.node.childImageSharp.fluid.originalImg,
        //         "s": edge.node.childImageSharp.fixed.src
        //     }
        // })
        const images = [...remoteImages];

        /* Gatsby will use this template to render the paginated pages (including the initial page for infinite scroll). */
        const paginatedPageTemplate = path.resolve(`src/templates/paginatedPageTemplate.js`)

        /* Iterate needed pages and create them. */
        const countImagesPerPage = 20
        const countPages = Math.ceil(images.length / countImagesPerPage)
        for (var currentPage = 1; currentPage <= countPages; currentPage++) {
            const pathSuffix = (currentPage > 1 ? currentPage : "") /* To create paths "/", "/2", "/3", ... */

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
            createJSON(pageData);
            createPage(pageData);
        }
        console.log(`\nCreated ${countPages} pages of paginated content.`)
    })
}

async function getData(token) {
    const num_photos = 20;
    const response = await axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,permalink&access_token=' + token + '&count=' + num_photos);
    const responseData = await response.data.data;
    const images = await responseData.map(itemJSON => {
        // const previous = getPrevious(responseData, index - 1);
        // const next = getNext(responseData, index + 1);
        // let response = serialize(itemJSON);
        // response['previousItem'] = serialize(previous);;
        // response['nextItem'] = serialize(next);;
        return serialize(itemJSON);;
    });
    return images;
}

// function getNext(responseData, index) {
//     if (typeof responseData[index] === 'undefined') {
//         return null;
//     }
//     return responseData[index];
// }

// function getPrevious(responseData, index) {
//     if (typeof responseData[index] === 'undefined') {
//         return null;
//     }
//     return responseData[index];
// }

function serialize(itemJSON) {
    return {
        'id': itemJSON.id,
        'caption': itemJSON.caption,
        'link': itemJSON.permalink,
        'type': itemJSON.media_type,
        'l': itemJSON.media_url,
        's': itemJSON.media_url,
    };
}

function createJSON(pageData) {
    const pathSuffix = pageData.path.substring(1)
    const dir = "public/paginationJson/"
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const filePath = dir + "index" + pathSuffix + ".json";
    const dataToSave = JSON.stringify(pageData.context.pageImages);
    fs.writeFile(filePath, dataToSave, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}
