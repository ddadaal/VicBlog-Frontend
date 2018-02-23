import * as React from "react";
import { LanguageSetting } from "./AttentionModalStore";
import { AsyncComponent } from "../../../routes/AsyncComponent";
import style from '../../style';

const MarkdownIt = require("markdown-it");

interface AttentionModalContentProps {
  language: LanguageSetting
}

export class AttentionModalContent extends React.Component<AttentionModalContentProps, any> {

  load = async () => {
    const res = await import(`../../../../assets/registerAttention/${this.props.language.filename}.md`);

    const md = new MarkdownIt();
    const content = md.render(res);
    return <div className={style("w3-container")} dangerouslySetInnerHTML={{__html: content}}/>;
  };

  componentWhenLoading = <div className={style("w3-container")}>Loading...</div>;

  render() {
    return <AsyncComponent key={this.props.language.id} render={this.load}
                           componentWhenLoading={this.componentWhenLoading}/>
  };
}