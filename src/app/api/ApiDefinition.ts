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
  likeHistory: `${APIROOTURL}/Likes/History`,
  termsAndConditions: `${APIROOTURL}/info/TermsAndConditions.md`,
  about: {
    project: `${APIROOTURL}/info/project.md`,
    me: `${APIROOTURL}/info/me.md`,
    tech: `${APIROOTURL}/info/tech.md`,
  },
  backendVersion: `${APIROOTURL}/info/version.json`,
  pv: `${APIROOTURL}/pv`,
};