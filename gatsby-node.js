const path = require(`path`);
const { postsPerPage } = require(`./src/utils/siteConfig`);
const { paginate } = require(`gatsby-awesome-pagination`);

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allGhostPost(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        slug
                    }
                }
            }
            allGhostTag(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        url
                        postCount
                    }
                }
            }
            allGhostAuthor(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        url
                        postCount
                    }
                }
            }
            allGhostPage(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        slug
                        url
                    }
                }
            }
            allGhostPage(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        slug
                        url
                    }
                }
            }
        }
    `);

    // Check for any errors
    if (result.errors) {
        throw new Error(result.errors);
    }

    // Extract query results
    const tags = result.data.allGhostTag.edges;
    const authors = result.data.allGhostAuthor.edges;
    const pages = result.data.allGhostPage.edges;
    const posts = result.data.allGhostPost.edges;

    // Load templates
    const indexTemplate = path.resolve(`./src/templates/index.js`);
    const tagsTemplate = path.resolve(`./src/templates/tag.js`);
    const authorTemplate = path.resolve(`./src/templates/author.js`);
    const pageTemplate = path.resolve(`./src/templates/page.js`);
    const postTemplate = path.resolve(`./src/templates/post.js`);
    const showTemplate = path.resolve(`./src/templates/show.js`);
    const showsTemplate = path.resolve(`./src/templates/shows.js`);
    const teamTemplate = path.resolve(`./src/templates/team.js`);
    const weeTemplate = path.resolve(`./src/templates/weesessions.js`);

    // Create tag pages
    tags.forEach(({ node }) => {
        const totalPosts = node.postCount !== null ? node.postCount : 0;
        const numberOfPages = Math.ceil(totalPosts / postsPerPage);
        let template = tagsTemplate;

        // This part here defines, that our tag pages will use
        // a `/tag/:slug/` permalink.
        // if (node.slug === `hash-wee-sessions-team`) {
        //     node.url = `/wee-sessions/`;
        //     template = weeTemplate;
        // } else
        if (node.slug.startsWith(`hash-`) && node.slug.endsWith(`team`)) {
            node.url = `/teams/${node.slug.slice(5, -5)}/`;
            template = teamTemplate;
        } else if (node.slug === `hash-show`) {
            node.url = `/shows/all/`;
            template = showsTemplate;
        } else if (
            node.slug !== `hash-article` &&
            node.slug !== `hash-description` &&
            node.slug !== `hash-podcast` &&
            !node.slug.endsWith("star") &&
            !node.slug.endsWith("stars") &&
            node.slug.startsWith(`hash-`)
        ) {
            node.url = `/shows/${node.slug.slice(5)}/`;
            template = showTemplate;
        } else {
            node.url = `/tags/${node.slug}/`;
        }

        Array.from({ length: numberOfPages }).forEach((_, i) => {
            const currentPage = i + 1;
            const prevPageNumber = currentPage <= 1 ? null : currentPage - 1;
            const nextPageNumber =
                currentPage + 1 > numberOfPages ? null : currentPage + 1;
            const previousPagePath = prevPageNumber
                ? prevPageNumber === 1
                    ? node.url
                    : `${node.url}page/${prevPageNumber}/`
                : null;
            const nextPagePath = nextPageNumber
                ? `${node.url}page/${nextPageNumber}/`
                : null;

            createPage({
                path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
                component: template,
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.slug,
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numberOfPages: numberOfPages,
                    humanPageNumber: currentPage,
                    prevPageNumber: prevPageNumber,
                    nextPageNumber: nextPageNumber,
                    previousPagePath: previousPagePath,
                    nextPagePath: nextPagePath
                }
            });
        });
    });

    // Create author pages
    authors.forEach(({ node }) => {
        const totalPosts = node.postCount !== null ? node.postCount : 0;
        const numberOfPages = Math.ceil(totalPosts / postsPerPage);

        // This part here defines, that our author pages will use
        // a `/author/:slug/` permalink.
        node.url = `/author/${node.slug}/`;

        Array.from({ length: numberOfPages }).forEach((_, i) => {
            const currentPage = i + 1;
            const prevPageNumber = currentPage <= 1 ? null : currentPage - 1;
            const nextPageNumber =
                currentPage + 1 > numberOfPages ? null : currentPage + 1;
            const previousPagePath = prevPageNumber
                ? prevPageNumber === 1
                    ? node.url
                    : `${node.url}page/${prevPageNumber}/`
                : null;
            const nextPagePath = nextPageNumber
                ? `${node.url}page/${nextPageNumber}/`
                : null;

            createPage({
                path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
                component: authorTemplate,
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.slug,
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numberOfPages: numberOfPages,
                    humanPageNumber: currentPage,
                    prevPageNumber: prevPageNumber,
                    nextPageNumber: nextPageNumber,
                    previousPagePath: previousPagePath,
                    nextPagePath: nextPagePath
                }
            });
        });
    });

    // Create pages
    pages.forEach(({ node }) => {
        // This part here defines, that our pages will use
        // a `/:slug/` permalink.
        node.url = `/${node.slug}/`;

        createPage({
            path: node.url,
            component: pageTemplate,
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.slug
            }
        });
    });

    // Create post pages
    posts.forEach(({ node }) => {
        // This part here defines, that our posts will use
        // a `/:slug/` permalink.
        node.url = `/posts/${node.slug}/`;

        createPage({
            path: node.url,
            component: postTemplate,
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.slug
            }
        });
    });

    // Create pagination
    paginate({
        createPage,
        items: posts,
        itemsPerPage: postsPerPage,
        component: indexTemplate,
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/`;
            } else {
                return `/page`;
            }
        }
    });
};
