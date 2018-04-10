import React from 'react';
import { MarkdownDisplay } from "../../components/Common/MarkdownDisplay";
import { AsyncComponent } from "../../routes/AsyncComponent";
import { Spin } from "../../components/Common/Spin";
import { LocalizedDocumentTitle } from "../../internationalization/components/LocalizedDocumentTitle";
import json from "../../../assets/about/aboutMe.md";

interface Props {

}

export class AboutMePage extends React.Component<Props, {}> {
  render() {
    return <LocalizedDocumentTitle formatId={"about.aboutMe.document"}>
      <MarkdownDisplay content={json} />
    </LocalizedDocumentTitle>
  }
}
