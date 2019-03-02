import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import theme from "../theme.yaml"

const Pagination = props => {

    const { currentPage, countPages } = props;
    const isFirst = currentPage === 1 || !currentPage;
    const isLast = currentPage === countPages;
    const prevPage = "/" + (currentPage - 1 > 1 ? (currentPage - 1) : "");
    const nextPage = "/" + (currentPage + 1);

    return (
        <React.Fragment>
            <div className="pagination">

                {/* "Prev" arrow and text */}
                {!isFirst && (
                    <Link to={prevPage} rel="prev">
                        <span className="prev-arrow">
                            <FaArrowLeft/>
                        </span>
                        <h4 className="prev-link-text">
                            {/*Prev*/}
                        </h4>
                    </Link>
                )}

                {/* Numbered page links. TODO: prevent "overflowing" page links when many links and tiny screen. */}
                {countPages > 1 && (
                    <ul className="pagination-numbers">
                        
                        {Array.from({ length: countPages }, (_, i) => (
                            <li key={`page-${i + 1}`} style={{ margin: 0 }}>
                                <Link
                                    to={`/${i === 0 ? "" : i + 1}`}
                                    style={{
                                        padding: "3px 8px",
                                        borderRadius: "5px",
                                        textDecoration: "none",
                                        color: i + 1 === currentPage ? "#ffffff" : "",
                                        background: i + 1 === currentPage ? theme.color.brand.primary : ""
                                    }}
                                >
                                    {i + 1}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* "Next" arrow and text */}
                {!isLast && (
                    <Link to={nextPage} rel="next">
                        <h4 className="next-link-text">
                            {/*Next*/}
                        </h4> 
                        <span className="next-arrow">
                            <FaArrowRight/>
                        </span>
                    </Link>
                )}


            </div>
            <style jsx>{`
                .next-arrow {
                    :global(svg) {
                    margin-left: 10px !important;
                    }
                }
            
                .pagination {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    padding: ${theme.space.l} ${theme.space.l} ${theme.space.l};
                    margin: ${theme.space.stack.l};

                    .pagination-numbers {
                    display: flex;
                    flexWrap: wrap;
                    maxWidth: 700px;
                    margin: 0 0 0 0;
                    alignItems: center;
                    list-style-type: none;
                    padding: 0;
                    lineHeight: 30px;
                    
                    :global(a):hover {
                        background: ${theme.color.brand.primaryLight};
                    }
                }


                .next-link-text {
                    color: &color-brand-primary;
                    width: 100%;
                    text-align: right;
                    margin-left: 20px;
                }
                .prev-link-text {
                    color: &color-brand-primary;
                    padding-right: 20px;
                }

                :global(a) {
                    display: flex;
                }

                :global(a:nth-child(2)) {
                    margin: 0;
                }



                h4 {
                    font-weight: 600;
                    margin: 0;
                    font-size: 1.1em;
                }
                :global(svg) {
                    fill: ${theme.color.special.attention};
                    width: ${theme.space.m};
                    height: ${theme.space.m};
                    flex-shrink: 0;
                    flex-grow: 0;
                    transition: all 0.5s;
                    margin: ${theme.space.inline.s};
                }
            }

            @from-width desktop {
                @media (hover: hover) {
                    .pagination :global(a:hover svg) {
                        transform: scale(1.5);
                    }
                }
            }
            `}
            </style>
        </React.Fragment>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    countPages: PropTypes.number.isRequired
};

export default Pagination;