const path = require(`path`)
const fetch = require('node-fetch');
const fs = require('fs');

/** This was used to fetch the list of random Unsplash image URLs.
  * You can run this from project root with: `npm run fetchUnsplash`.
  */
const fetchUnsplashImageUrls = async () => {

    /* Need to iterate through keywords to avoid cache trap */
    var keyword_index = 0
    const keywords = ["nature", "car", "fire", "water", "earth", "tree", "people", "love", "flowers",
                      "bike", "computer", "sports", "music", "technology", "city", "road", "baby"]
    
    write("[")
    const uniqueUrls = new Set()
    var goalCount = 10000
    while (uniqueUrls.size < goalCount) {
        const keyword = keywords[keyword_index]
        keyword_index = (keyword_index + 1) % keywords.length

        /* Fetch random image */
        const response = await fetch(`https://source.unsplash.com/random/200x200/?${keyword}`)
        const url = await response.url.split("?")[0]

        /* Check if we have this image already */
        if (uniqueUrls.has(url)) continue
        uniqueUrls.add(url)

        if (false) {
            /* Alternative: save URL and base64 of 200x200 image */
            const buffer = await response.buffer()
            const b64 = 'data:image/jpeg;base64,' + buffer.toString('base64')
            const resizeParams = '?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop'
            const img = {
                "l": url,
                "s": url+resizeParams,
                "b64": b64
            }
            const writableData = JSON.stringify(img) + (uniqueUrls.size < goalCount ? ",\n" : "\n]")
            write(writableData)
        } else {
            /* Alternative: keep only URL to minimize storage */
            const writableData = `"${url}"` + (uniqueUrls.size < goalCount ? ",\n" : "\n]")
            write(writableData)
        }
        
        console.log("Unique images: " + uniqueUrls.size)
    }
}

function write(data) {
    const dir = "temp"
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    var writeStream = fs.createWriteStream(`${dir}/unsplash_images.json`, {'flags': 'a'})
    writeStream.end(data)
}

fetchUnsplashImageUrls()