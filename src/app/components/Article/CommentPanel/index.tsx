import React from "react";
import style from '../../style';
import { Header } from "./Header";
import { Article } from "../../../models";

interface CommentPanelProps {
  article: Article
}

export class CommentPanel extends React.Component<CommentPanelProps> {

  render() {
    return <div className={style("w3-container")}>
      <Header/>
    </div>
  }
}
