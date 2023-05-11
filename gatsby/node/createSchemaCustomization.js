module.exports = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
      type Article implements Node {
        id: ID!
        slug: String!
        title: String!
        date: Date! @dateformat
        author: String!
        excerpt: String
        body: String!
        hero: File @fileByRelativePath
        timeToRead: String
        tags: [String]
        lastModificationTime: Date @dateformat
        commentId: String
        tableOfContents: JSON @link
      }
    `);

  createTypes(`
      type Snippet implements Node {
        id: ID!
        slug: String!
        title: String!
        date: Date! @dateformat
        author: String!
        excerpt: String
        body: String!
        timeToRead: String
        topics: [String]
        lastModificationTime: Date @dateformat
      }
    `);
};
