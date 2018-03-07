function arrayEquals<T>(a: T[], b: T[]) {
  if (a === b) return true;
  if ((!a) || (!b)) return false;
  if (a.length != b.length) return false;

  a = a.sort();
  b = b.sort();

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function dateEquals(date1: Date, date2: Date) {
  if (date1 === date2) return true;
  if ((!date1) || (!date2)) return false;

  return date1.getTime() == date2.getTime();
}

export function articleFilterMatches(filter1: ArticleFilter, filter2: ArticleFilter) {
  if (filter1 == filter2) {
    return true;
  }
  if ((!filter1) || (!filter2)) {
    return false;
  }
  return filter1.equals(filter2);
}

export class ArticleFilter {
  tags?: string[];

  titleText?: string;

  createTimeBegin?: Date;

  createTimeEnd?: Date;

  editTimeBegin?: Date;

  editTimeEnd?: Date;

  minLike?: number;

  maxLike?: number;

  equals(other: ArticleFilter) {
    if (!other) { return false; }
    return this.titleText === other.titleText
      && this.minLike === other.minLike
      && this.maxLike === other.maxLike
      && arrayEquals(this.tags, other.tags)
      && dateEquals(this.createTimeBegin, other.createTimeBegin)
      && dateEquals(this.createTimeEnd, other.createTimeEnd)
      && dateEquals(this.editTimeBegin, other.editTimeBegin)
      && dateEquals(this.editTimeEnd, other.editTimeEnd)
      ;
  }

  clone() {
    return ArticleFilter.newInstance(this);
  }

  static newInstance(obj: ClassType<ArticleFilter>) {
    return Object.assign(new ArticleFilter(), obj);
  }
}
