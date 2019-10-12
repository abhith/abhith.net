function normalizeHero(article) {
  let hero = {
    full: {},
    regular: {},
    narrow: {},
    seo: {}
  };

  if (article.frontmatter.image) {
    hero = {
      full: article.frontmatter.image.full.fluid
    };
  } else {
    console.log(
      "\u001B[33m",
      `Missing hero for "${article.frontmatter.title}"`
    );
  }

  return hero;
}

module.exports.local = {
  articles: ({ node: article }) => {
    return {
      id: article.id,
      title: article.frontmatter.title,
      body: article.body,
      slug: article.fields.slug,
      excerpt: article.frontmatter.description,
      tags: article.frontmatter.tags,
      hero: normalizeHero(article),
      date: article.frontmatter.dateString,
      timeToRead: article.fields.readingTime.text,
      lastModifiedTime:
        article.frontmatter.lastModificationTime === null
          ? article.frontmatter.date
          : article.frontmatter.lastModificationTime,
      lastModifiedTimeString:
        article.frontmatter.lastModificationTime === null
          ? article.frontmatter.dateString
          : article.frontmatter.lastModificationTimeString,
      dateModifiedSeoFormat: article.frontmatter.dateModifiedSeoFormat,
      datePublishedSeoFormat: article.frontmatter.datePublishedSeoFormat
    };
  }
};
