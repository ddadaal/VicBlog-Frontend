declare var APIROOTURL: string;

export const APIs = {
  login: `${APIROOTURL}/Account/Login`,
  register: `${APIROOTURL}/Account/Register`,
  articles: `${APIROOTURL}/Articles`,
  articleFilter: `${APIROOTURL}/Articles/Filter`,
  tags: `${APIROOTURL}/Articles/Tags`,
  comments: `${APIROOTURL}/Comments`,
  upload: `${APIROOTURL}/upload`,
  like: `${APIROOTURL}/Likes`,
  queryLiked: `${APIROOTURL}/Likes/QueryLiked`,
  likeHistory: `${APIROOTURL}/Likes/History`,
};
