function normalizeHero(article) {
  let hero = {
    full: {},
    regular: {},
    narrow: {},
    seo: {},
  };

  if (article.hero) {
    hero = {
      full: article.hero.full.gatsbyImageData,
      seo: article.hero.seo
    };
  } else {
    console.log("\u001B[33m", `Missing hero for "${article.title}"`);
  }

  return hero;
}

function normalizeAvatar(author) {
  let avatar = {
    small: {},
    medium: {},
    large: {},
  };

  if (author.avatar) {
    avatar = {
      small: author.avatar.small.gatsbyImageData,
      medium: author.avatar.medium.gatsbyImageData,
      large: author.avatar.large.gatsbyImageData,
    };
  } else {
    console.log("\u001B[33m", `Missing avatar for "${author.name}"`);
  }

  return avatar;
}

module.exports.local = {
  articles: ({ node: article }) => {
    return {
      ...article,
      hero: normalizeHero(article),
      date: article.dateString,
      timeToRead: article.timeToRead,
      lastModifiedTime:
        article.lastModificationTime === null
          ? article.date
          : article.lastModificationTime,
      lastModifiedTimeString:
        article.lastModificationTime === null
          ? article.dateString
          : article.lastModificationTimeString,
      dateModifiedSeoFormat: article.dateModifiedSeoFormat,
      datePublishedSeoFormat: article.datePublishedSeoFormat,
      commentId: article.commentId === null ? article.slug : article.commentId,
      tableOfContents: article.tableOfContents,
    };
  },
  authors: ({ node: author }) => {
    return {
      ...author,
      avatar: normalizeAvatar(author),
    };
  },
  snippets: ({ node: snippet }) => {
    return {
      ...snippet,
      date: snippet.dateString,
      timeToRead: snippet.timeToRead,
      lastModifiedTime:
        snippet.lastModificationTime === null
          ? snippet.date
          : snippet.lastModificationTime,
      lastModifiedTimeString:
        snippet.lastModificationTime === null
          ? snippet.dateString
          : snippet.lastModificationTimeString,
      dateModifiedSeoFormat: snippet.dateModifiedSeoFormat,
      datePublishedSeoFormat: snippet.datePublishedSeoFormat,
    };
  },
};
