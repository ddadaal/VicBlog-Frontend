import React from "react";
import { AsyncComponent } from "../../routes/AsyncComponent";
import { Spin } from "../../components/Common/Spin";
import { MarkdownDisplay } from "../../components/Common/MarkdownDisplay";
import { LocalizedDocumentTitle } from "../../internationalization/components/LocalizedDocumentTitle";

async function loadContent() {
  const md = (await import("../../../assets/about/aboutProject.md")).default;
  return <LocalizedDocumentTitle formatId={"about.aboutProject.document"}>
    <MarkdownDisplay content={md}/>
  </LocalizedDocumentTitle>;
}

export class AboutProjectPage extends React.Component<any, any> {
  render() {
    return <AsyncComponent render={loadContent} componentWhenLoading={<Spin/>}/>
  }
}
