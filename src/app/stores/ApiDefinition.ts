declare var APIROOTURL: string;

export const APIs = {
  login: `${APIROOTURL}/login`,
  register: `${APIROOTURL}/register`,
  articles: `${APIROOTURL}/articles`,
  tags: `${APIROOTURL}/tags`,
  categories: `${APIROOTURL}/categories`,
  comments: `${APIROOTURL}/comments`,
  upload: `${APIROOTURL}/upload`,
  rate: `${APIROOTURL}/rate`,
  filteredList: `${APIROOTURL}/articles/filter`,
  termsAndConditions: `${APIROOTURL}/info/TermsAndConditions.md`,
  about: {
    project: `${APIROOTURL}/info/project.md`,
    me: `${APIROOTURL}/info/me.md`,
    tech: `${APIROOTURL}/info/tech.md`,
  },
  backendVersion: `${APIROOTURL}/info/version.json`,
  pv: `${APIROOTURL}/pv`,
};