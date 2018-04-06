import { CommentListFetchError, CommentService } from "../../../api/CommentService";
import { ArticleId } from "../../../models/Article";
import { action, computed, observable, runInAction } from "mobx";
import { PagingInfo } from "../../../models/PagingInfo";
import { Comment } from "../../../models/Comment";
import moment from 'moment';
import { FetchStatus } from "../../../stores/common";


const defaultPageSize = 5;
const updateThresholdMinutes = 30;

export class CommentStore {
  constructor(private commentService: CommentService, private articleId: ArticleId) {
    this.fetchPage();
  }

  @observable fetchStatus = FetchStatus.NotStarted;

  @observable pagingInfo: PagingInfo = new PagingInfo();

  @observable fetchedLists: Map<number, Comment[]> = new Map<number, Comment[]>();

  @observable currentPageNumber: number = 1;

  @computed get listOfCurrentPage() {
    return this.fetchedLists.get(this.currentPageNumber) || [];
  }

  expired: boolean = false;

  lastUpdated: Date;

  @observable error: CommentListFetchError;

  @action expire() {
    this.expired = true;
  }

  @action async fetchPage() {
    this.fetchStatus = FetchStatus.Fetching;
    if (this.expired || this.pageNeedRefetch(this.currentPageNumber)) {
      try {
        const response = await this.commentService.fetchComments(this.articleId, defaultPageSize, this.currentPageNumber);
        runInAction(() => {
          this.lastUpdated = new Date();
          this.pagingInfo = response.pagingInfo;
          this.fetchedLists.set(this.currentPageNumber, response.list);
        });
      } catch (e) {
        runInAction(() => {
          this.fetchStatus = FetchStatus.Error;
          this.error = e;
        });
        return;
      }
    }
    runInAction( () => {
      this.expired = false;
      this.fetchStatus = FetchStatus.Fetched;
    });
  };

  async removeComment(id: number, token: string) {
    await this.commentService.removeComment(id, token);
  }

  private pageNeedRefetch(pageNumber: number) {
    return this.isOutdated || !this.fetchedLists.has(pageNumber);
  }

  async submitComment(content: string, token: string) {
    await this.commentService.submitComment(this.articleId, content, token);
  }


  private get isOutdated() {
    return !this.lastUpdated || moment().diff(this.lastUpdated, "minutes") >= updateThresholdMinutes;
  }


}
