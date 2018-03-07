export class PagingInfo {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPageNumber: number;

  get nextPage() {
    return this.currentPage +1;
  }

  static fromJson(json: ClassType<PagingInfo>) {
    return Object.assign(new PagingInfo(), json);
  }

  static get newInstance() {
    return PagingInfo.fromJson({
      totalCount: 0,
      pageSize: 5,
      currentPage: 0,
      totalPageNumber: 0
    })
  }

}
