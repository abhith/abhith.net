function normalizeHero(article) {
  let hero = {
    full: {},
    regular: {},
    narrow: {},
    seo: {}
  };

  if (article.hero) {
    hero = {
      full: article.hero.full.fluid
    };
  } else {
    console.log("\u001B[33m", `Missing hero for "${article.title}"`);
  }

  return hero;
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
      tableOfContents: article.tableOfContents
    };
  }
};
