/** @jsx jsx */
import { jsx } from "theme-ui";

import PropTypes from "prop-types";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import TopicsBar from "./topics-bar";

const CardPostCss = (p) => css`
  margin: auto;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .featured-image {
    width: 100%;
    object-fit: cover;
    margin-right: 50px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  a {
    display: block;
    padding: 10px;
    overflow: hidden;
    align-items: center;
    max-width: 1000px;
    margin: auto;
    font-size: 14px;
    border-radius: 6px;
    margin-bottom: 20px;
    text-decoration: none;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.2);
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      color: ${p.theme.colors.link};
    }
  }
  .content {
    width: 100%;
    margin-top: 35px;
    .post-title {
      font-size: 18px;
      text-transform: capitalize;
      font-weight: 500;
      .blog-date {
        font-size: 12px;
        margin: 0;
        &:before {
          content: "|";
          color: #2bb673;
          font-size: 25px;
          top: auto;
          position: relative;
          margin-right: 10px;
        }
      }
    }
    .rounded {
      width: 70px;
      height: 3px;
      border-radius: 6px;
      background-image: linear-gradient(to right, #25aae1, #40e495);
      margin-left: 0;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .post-meta {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .author-block {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          border-radius: 50%;
        }
        .author-name {
          padding: 0 10px;
          span {
            display: block;
            margin-left: 5px;
            &:nth-child(2) {
              color: $primary-accent !important;
              small {
                color: $light-blue !important;
              }
            }
          }
        }
      }
      .stats-block {
        margin-left: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .comments,
        .likes {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 0 5px;
          svg {
            width: 16px;
            height: 16px;
            stroke: $white;
            stroke-width: 1.4px;
            cursor: pointer;
            transition: all 0.3s;
          }
          span {
            color: $white;
            padding: 0 2px;
            font-size: 0.75rem;
          }
        }
        .likes {
          svg {
            fill: $red;
            stroke: $red;
          }
        }
      }
    }
  }
  p {
    font-size: 0.9rem;
  }
`;

const StyledDiv = styled("div")`
  ${CardPostCss}
`;

const BlogCard = ({ post, tag }) => {
  return (
    <StyledDiv>
      <Link
        to={post.slug}
        sx={{
          color: "strongText",
        }}
      >
        <div className="featured-image card-image">
          <GatsbyImage image={post.hero.full} alt={post.title} />
          {tag && (
            <div className="card-content is-overlay is-clipped">
              <span className="tag is-primary">{tag}</span>
            </div>
          )}
        </div>
        <div className="content">
          <div className="post-title">{post.title}</div>
          <span className="blog-date">
            {post.date} &middot; {post.timeToRead}
          </span>
          <p className="ar-subtitle">{post.excerpt}</p>
          <div className="post-meta">
            <div className="author-block">
              <div className="image is-48x48">
                <img src="/img/abhith.jpg" alt="abhith rajan" />
              </div>
              <div className="author-name">
                <span>by Abhith Rajan</span>
                <TopicsBar topics={post.tags} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </StyledDiv>
  );
};
BlogCard.propTypes = {
  post: PropTypes.object.isRequired,
  tag: PropTypes.string,
};

export default BlogCard;
