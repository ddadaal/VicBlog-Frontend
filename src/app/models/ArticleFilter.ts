export class ArticleFilter {
  tags?: string[] | string | undefined;

  titleText?: string;

  createTimeBegin?: Date;

  createTimeEnd?: Date;

  editTimeBegin?: Date;

  editTimeEnd?: Date;

  minLike?: number;

  maxLike?: number;

  get tagsAsArray(): string[] {
    if (typeof this.tags == "undefined") {
      return [];
    }
    if (Array.isArray(this.tags)) {
      return this.tags;
    } else {
      return [this.tags];
    }

  }



  constructor(obj: Partial<ArticleFilter> = {}) {
    Object.assign(this, obj);

  }

}
