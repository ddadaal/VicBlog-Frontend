import * as React from "react";
import { LanguageSetting } from "./AttentionModalStore";
import { AsyncComponent } from "../../../routes/AsyncComponent";
import style from '../../style';
import { MarkdownDisplay } from "../../Common/MarkdownDisplay";

interface AttentionModalContentProps {
  language: LanguageSetting
}

export class AttentionModalContent extends React.Component<AttentionModalContentProps, {}> {

  load = async () => {
    const res = await import(`../../../../assets/registerAttention/${this.props.language.filename}.md`);

    return <div className={style("w3-container")}>
      <MarkdownDisplay content={res.default}/>
    </div>;
  };

  componentWhenLoading = <div className={style("w3-container")}>Loading...</div>;

  render() {
    return <AsyncComponent key={this.props.language.id} render={this.load}
                           componentWhenLoading={this.componentWhenLoading}/>
  };
}