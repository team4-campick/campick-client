export const checkBlogPostData = (post) => {
  if (
    !post.blogPostTitle ||
    !post.region ||
    !post.city ||
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
    !post.city ||
    !post.price ||
    !post.desc ||
    !post.condition ||
    !post.isNegotiable
  ) {
    return false;
  }

  return true;
};
