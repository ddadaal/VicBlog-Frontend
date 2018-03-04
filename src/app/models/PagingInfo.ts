export class PagingInfo {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPageNumber: number;

  get nextPage() {
    return this.currentPage +1;
  }

  static fromJson(json: any) {
    return Object.assign(new PagingInfo(), json);
  }
}
