const readingTime = require("reading-time");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");
const crypto = require(`crypto`);

module.exports = ({ node, actions, getNode, createNodeId }) => {
  const { createNode, createNodeField, createParentChildLink } = actions;

  fmImagesToRelative(node); // convert image paths for gatsby images

  const contentPath = "content/blog";
  const fileNode = getNode(node.parent);
  const source = fileNode && fileNode.sourceInstanceName;

  if (node.internal.type === `AuthorsYaml`) {
    const fieldData = {
      ...node,
    };

    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Author`),
      parent: node.id,
      children: [],
      internal: {
        type: `Author`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Author`,
      },
    });

    createParentChildLink({ parent: fileNode, child: node });

    return;
  }

  if (node.internal.type === `TopicsYaml`) {
    const fieldData = {
      ...node,
    };

    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Topic`),
      parent: node.id,
      children: [],
      internal: {
        type: `Topic`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Topic`,
      },
    });

    createParentChildLink({ parent: fileNode, child: node });

    return;
  }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
  if (node.internal.type === `Mdx` && source === contentPath) {
    const value = createFilePath({ node, getNode });
    const fieldData = {
      author: node.frontmatter.author,
      date: node.frontmatter.date,
      hero: node.frontmatter.image,
      draft: node.frontmatter.draft || false,
      slug: `/blog${value}`,
      title: node.frontmatter.title,
      excerpt: node.frontmatter.description,
      tags: node.frontmatter.tags,
      lastModificationTime: node.frontmatter.lastModificationTime,
      commentId: node.frontmatter.commentId,
      timeToRead: readingTime(node.rawBody).text,
    };

    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Article`),
      parent: node.id,
      children: [],
      internal: {
        type: `Article`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Article Posts`,
      },
    });

    createParentChildLink({ parent: fileNode, child: node });
  }
};
