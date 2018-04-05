export class ArticleTag {
  text: string;
  selected: boolean = false;

  get color() {
    if (this.selected) {
      return "w3-blue";
    } else {
      return "w3-light-grey"
    }
  }


  constructor(text: string, selected: boolean) {
    this.text = text;
    this.selected = selected;
  }
}
