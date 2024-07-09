export const checkBlogPostData = (post) => {
  if (
    !post.blogPostTitle ||
    !post.region ||
    !post.content ||
    !post.campSiteName ||
    !post.blogPostDesc
  ) {
    return false;
  }

  return true;
};

export const checkMarketPostData = (post) => {
  if (
    !post.category ||
    !post.productName ||
    !post.region ||
    !post.price ||
    !post.desc ||
    !post.condition
  ) {
    return false;
  }

  return true;
};
