module.exports = ({ actions }) => {
  actions.createTypes(`
      type Article implements Node {
        id: ID!
        slug: String!
        title: String!
        date: Date! @dateformat
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
};
