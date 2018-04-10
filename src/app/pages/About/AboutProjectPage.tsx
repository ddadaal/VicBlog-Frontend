import React from "react";
import { AsyncComponent } from "../../routes/AsyncComponent";
import { Spin } from "../../components/Common/Spin";
import { MarkdownDisplay } from "../../components/Common/MarkdownDisplay";
import { LocalizedDocumentTitle } from "../../internationalization/components/LocalizedDocumentTitle";
import json from "../../../assets/about/aboutProject.md";

export class AboutProjectPage extends React.Component<any, any> {
  render() {
    return <LocalizedDocumentTitle formatId={"about.aboutProject.document"}>
      <MarkdownDisplay content={json} />
    </LocalizedDocumentTitle>;
  }
}
