import React from 'react';
import { Comment } from "../../../../models/Comment";
import { LocaleMessage } from "../../../../internationalization/components";
import { CommentItem } from "./CommentItem";
import { Inject } from "react.di";
import { UserStore } from "../../../../stores";
import { CommentInput } from "./CommentInput";
import { observer } from "mobx-react";
import { CommentListPageIndicator } from "./CommentListPageIndicator";
import { PagingInfo } from "../../../../models/PagingInfo";
import { UserRole } from "../../../../models/User";

interface Props {
  list: Comment[];
  submit: (content: string) => Promise<void>;
  remove: (id: number) => Promise<void>;
  refresh: () => void;
  fetchPage(pageNumber: number): void;
  currentPageNumber: number;
  pagingInfo: PagingInfo;
}

@observer
export class CommentList extends React.Component<Props, {}> {

  @Inject userStore: UserStore;

  onRemoveProducer = (id: number) => async () => {
    await this.props.remove(id);
  };

  render() {
    return <div>
      {this.props.list.length == 0

        ? <p><LocaleMessage id={"article.comment.empty"}/></p>

        : this.props.list.map(x => {
          return <CommentItem comment={x} key={x.id}
                         onRemove={this.userStore.loggedIn
                         && (x.username === this.userStore.user.username || this.userStore.user.role === UserRole.Admin)
                           ? this.onRemoveProducer(x.id)
                           : null
                         }
                         refresh={this.props.refresh}
            />
        })}
        <CommentListPageIndicator fetchPage={this.props.fetchPage}
                                  currentPageNumber={this.props.currentPageNumber}
                                  pagingInfo={this.props.pagingInfo}/>
      <CommentInput submit={this.userStore.loggedIn ? this.props.submit : null} refresh={this.props.refresh}/>
    </div>;
  }
}
