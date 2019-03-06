<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Starter Infinite Scroll
</h1>

This is a Gatsby starter intended for developers who need **infinite scroll** or **pagination** in their Gatsby project. 

Try out this live demo with 10k photos »»» [https://gatsby-starter-infinite-scroll.baobab.fi](https://gatsby-starter-infinite-scroll.baobab.fi)

## :zap: Get started

`gatsby new my-inf-scroll https://github.com/baobabKoodaa/gatsby-starter-infinite-scroll`.

The code is commented and you will be able to understand how it works. Start reading from [gatsby-node.js](https://github.com/baobabKoodaa/gatsby-starter-infinite-scroll/blob/master/gatsby-node.js) and then read [paginatedPageTemplate.js](https://github.com/baobabKoodaa/gatsby-starter-infinite-scroll/blob/master/src/templates/paginatedPageTemplate.js).

If you run into any difficulty, I will be happy to help.

## 🚀 To infinity and beyond!

- The default behavior is to use infinite scroll, but **fallback to pagination** if JS is disabled or an error occurs. Additionally, the demo has a **toggle** so you can test both modes without disabling JS in your browser.
- Previously published implementations for infinite scroll in Gatsby have been inefficient. In particular, they have loaded metadata for _all_ items during first load, and then used client side JS to filter to the desired items. The performance hit is not bad for small collections of items, but it becomes unbearable for large collections. This implementation is more **efficient by fetching only the needed items at all times**. This is possible by creating corresponding sets of pages and JSON.
- **Initial items are visible fast** because they are shipped along with the initial page, instead of separately fetched.
- **Many edge cases are considered**, such as large screens (where initial page fits to screen before scrolling is possible) and slow connections (the initial pageload is consistent even before the React component mounts).
- Includes a script that can fetch large amounts of random images from Unsplash.

## 🎓 Attribution

- Photos are from [Unsplash](https://unsplash.com). Unfortunately I couldn't get photographer attribution, because their main API is rate limited, and the non limited API (source.unsplash.com) only gave me photos.
- Infinite scroll uses some code from [react-simple-infinite-scroll](https://github.com/jaredpalmer/react-simple-infinite-scroll).
- Traffic lights are modified from work by Azik Samarkandiy.

I would love to see what you build with this. You can [drop me a message](https://blog.baobab.fi/contact) or star this repo.
