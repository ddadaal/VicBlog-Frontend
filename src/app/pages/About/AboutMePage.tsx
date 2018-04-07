import React from 'react';
import { MarkdownDisplay } from "../../components/Common/MarkdownDisplay";
import { AsyncComponent } from "../../routes/AsyncComponent";
import { Spin } from "../../components/Common/Spin";
import { LocalizedDocumentTitle } from "../../internationalization/components/LocalizedDocumentTitle";

interface Props {

}

async function loadContent() {
  const md = (await import("../../../assets/about/aboutMe.md")).default;
  return <LocalizedDocumentTitle formatId={"about.aboutMe.document"}>
    <MarkdownDisplay content={md}/>
  </LocalizedDocumentTitle>;
}

export class AboutMePage extends React.Component<Props, {}> {
  render() {
    return <AsyncComponent render={loadContent} componentWhenLoading={<Spin/>}/>
  }
}
