import React from "react"
import { Location } from '@reach/router'
import Layout from "../components/layout"
// import { Link } from "gatsby"
import SEO from "../components/seo"
// import DynamicIcon from '../components/dynamicIcon';

const ViewPostDetailPage = (props) => (
  <Layout>
    <Location>

      {({ location }) => {
        if (!location || !location.href) return <></>
        var url = location.href.split("?id=")[1]
        if (url.includes(":/") && !url.includes("://")) {
          /* Something in Gatsby or React sometimes deforms the URL so we need to fix it here. */
          url = url.replace(":/", "://")
        }

        return (
          <>
            <SEO title="Hola Cabo | Post Details" />
            <div class="viewItemOuterContainer">
              {/* <div class="viewItemArrowPrevious">
                {props.previousItem ? (
                  <Link to={`/viewItem?id=${props.previousItem.l}`} state={{ caption: props.previousItem.caption, link: props.previousItem.link }}>
                    <DynamicIcon tag='arrowLeft' />
                  </Link>
                ) : ''}
              </div>
              <div class="viewItemArrowNext">
                {props.nextItem ? (
                  <Link to={`/viewItem?id=${props.nextItem.l}`} state={{ caption: props.nextItem.caption, link: props.nextItem.link }}>
                    <DynamicIcon tag='arrowRight' />
                  </Link>
                ) : ''}
              </div> */}
              <div class="viewItemContainer">
                <div class="viewItem">
                  <a href={location.state.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={url}
                      alt="Larger version"
                      title="Instagram Post from Hola Cabo"
                      class="viewItemImage"
                    />
                  </a>
                </div>
              </div>
              <div class="viewItemContainer">
                <div class="viewItem">
                  <p class="viewItemCaption">{location.state.caption}</p>
                  <a href={location.state.link} target="_blank" rel="noopener noreferrer">View on Instagram</a>
                </div>
              </div>
            </div>
          </>
        )
      }}
    </Location>
  </Layout >
)

export default ViewPostDetailPage
