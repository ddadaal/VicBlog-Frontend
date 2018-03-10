class PagingInfoFields {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPageNumber: number;
}

export class PagingInfo extends PagingInfoFields {
  get nextPage() {
    return this.currentPage +1;
  }

  static fromJson(json: PagingInfoFields) {
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
