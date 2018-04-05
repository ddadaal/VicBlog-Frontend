export class PagingInfo {

  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPageNumber: number;

  constructor(json = {
    totalCount: 0,
    pageSize: 5,
    currentPage: 0,
    totalPageNumber: 0
  }) {
    Object.assign(this, json);
  }


}
