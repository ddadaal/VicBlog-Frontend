import React from 'react';
import { Inject } from "react.di";
import { HomepageStore } from "../../../stores/HomepageStore";
import { LocaleMessage } from "../../../internationalization/components";
import { observer } from "mobx-react";
import { ContentPanel } from "../../../components/Common/ContentPanel";
import { FetchStatus } from "../../../stores/common";
import { FetchingPanel } from "./FetchingPanel";
import { ErrorPanel } from "./ErrorPanel";
import { SeeMore } from "./SeeMore";
import { ArticleItem } from "./ArticleItem";

interface Props {

}

@observer
export class RecentArticlesPanel extends React.Component<Props, {}> {

  @Inject homepageStore: HomepageStore;

  refresh = () => {
    this.homepageStore.expire();
    this.homepageStore.fetchRecentArticles();
  };

  chooseContent() {
    if (this.homepageStore.fetching) {
      return <FetchingPanel/>;
    }
    if (this.homepageStore.recentArticlesFetchStatus === FetchStatus.Error) {
      return <ErrorPanel error={this.homepageStore.recentArticlesFetchError} retry={this.refresh}/>
    }
    return this.homepageStore.recentArticles.map(x => <ArticleItem key={x.articleId} brief={x}/>);
  }

  render() {
    return <ContentPanel title={
        <>
          <span style={{fontWeight: "bold"}}><LocaleMessage id={"homepage.recentArticles.title"}/></span>
          <SeeMore id={"homepage.recentArticles.seeMore"} path={"/articles"}/>
        </>
      } >
        {this.chooseContent()}
      </ContentPanel>
  }
}
