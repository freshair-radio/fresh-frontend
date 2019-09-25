import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Pagination = ({ pageContext }) => {
    const {
        previousPagePath,
        nextPagePath,
        humanPageNumber,
        numberOfPages
    } = pageContext;

    return (
        <nav className="pagination" role="navigation">
            <div className="pagination-previous">
                {previousPagePath && (
                    <Link to={previousPagePath} rel="prev">
                        <h3>Previous</h3>
                    </Link>
                )}
            </div>
            {numberOfPages > 1 && (
                <div className="pagination-location">
                    <h3>
                        {humanPageNumber} of {numberOfPages}
                    </h3>
                </div>
            )}
            <div className="pagination-next">
                {nextPagePath && (
                    <Link to={nextPagePath} rel="next">
                        <h3>Next</h3>
                    </Link>
                )}
            </div>
        </nav>
    );
};

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired
};

export default Pagination;
