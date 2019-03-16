import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import theme from "../theme.yaml"

const Pagination = props => {

    const { currentPage, countPages } = props.paginationData;
    const isFirst = currentPage === 1 || !currentPage;
    const isLast = currentPage === countPages;
    const prevPage = "/" + (currentPage - 1 > 1 ? (currentPage - 1) : "");
    const nextPage = "/" + (currentPage + 1);
    const verticalAlignment = { paddingTop: "0.25em" }

    var visiblePageNumbers = selectRelevantPageLinks(currentPage, countPages)

    return (
        <React.Fragment>
            <div className="pagination">

                {/* "Prev" arrow */}
                {!isFirst && (
                    <Link to={prevPage} rel="prev" style={verticalAlignment} >
                        <span className="prev-arrow">
                            <FaArrowLeft/>
                        </span>
                    </Link>
                )}

                {/* Numbered page links. */}
                {countPages > 1 && (
                    <React.Fragment>
                        {visiblePageNumbers.map(num => {
                            if (isNaN(num)) {
                                return <span key={`dots-${num}`}>.....</span>
                            }
                            return (
                                <span className="pagination-numbers" key={`page-${num}`} >
                                    <Link
                                        to={`/${num === 1 ? "" : num}`}
                                        style={{
                                            padding: "3px 8px",
                                            borderRadius: "5px",
                                            textDecoration: "none",
                                            color: num === currentPage ? "#ffffff" : "#666",
                                            background: num === currentPage ? theme.color.brand.primary : "",
                                            lineHeight: "30px",
                                            verticalAlign: "middle"
                                        }}
                                        className="pagination-numbers"
                                    >
                                        {num}
                                    </Link>
                                </span>
                            )
                        })}
                    </React.Fragment>
                )}

                {/* "Next" arrow */}
                {!isLast && (
                    <Link to={nextPage} rel="next" style={verticalAlignment} >
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

                .pagination-numbers:hover {
                    background: ${theme.color.brand.primaryLight};
                    border-radius: 5px;
                }
            
                .pagination {
                    display: flex;
                    maxWidth: 700px;
                    flex-wrap: wrap;
                    flex-direction: row;
                    justify-content: center;
                    padding: ${theme.space.l} ${theme.space.l} ${theme.space.l};
                    margin: ${theme.space.stack.l};
                    margin-bottom: 0;

                    :global(a:nth-child(2)) {
                        margin: 0;
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

function selectRelevantPageLinks(currentPage, countPages) {
    var visiblePageNumbers = []
    if (countPages <= 10) {
        /* If there are not too much, show everything. */
        for (let i=1; i<=countPages; i++) {
            visiblePageNumbers.push(i)
        }
    } else {
        /* Always show beginning, end, current, and around current. */
        if (currentPage <= 5) {
            /* If beginning and current are not too far, we don't want to "dot dot" between them. */
            for (let i=1; i<currentPage; i++) {
                visiblePageNumbers.push(i)
            }
        } else {
            visiblePageNumbers.push(1)
            visiblePageNumbers.push("dots-left-half")
            visiblePageNumbers.push(currentPage-2)
            visiblePageNumbers.push(currentPage-1)
        }
        visiblePageNumbers.push(currentPage)
        if (currentPage >= countPages-4) {
            /* If current and end are not too far, we don't want to "dot dot" between them. */
            for (let i=currentPage+1; i<countPages; i++) {
                visiblePageNumbers.push(i)
            }
        } else {
            visiblePageNumbers.push(currentPage+1)
            visiblePageNumbers.push(currentPage+2)
            visiblePageNumbers.push("dots-right-half")
        }
        if (currentPage !== countPages) {
            visiblePageNumbers.push(countPages)
        }
    }
    return visiblePageNumbers
}

Pagination.propTypes = {
    paginationData: PropTypes.object.isRequired
};

export default Pagination;