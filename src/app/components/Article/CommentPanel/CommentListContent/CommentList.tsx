import React from 'react';
import { Comment } from "../../../../models/Comment";
import { LocaleMessage } from "../../../../internationalization/components";
import { CommentItem } from "./CommentItem";
import { Inject } from "react.di";
import { UserStore } from "../../../../stores";
import { CommentInput } from "./CommentInput";
import { observer } from "mobx-react";

interface Props {
  list: Comment[];
  submit: (content: string) => Promise<void>;
  remove: (id: number) => Promise<void>;
  refresh: () => void;
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

        ? <LocaleMessage id={"article.comment.empty"}/>

        : this.props.list.map(x => {
          return <CommentItem comment={x} key={x.id}
                         onRemove={this.userStore.loggedIn && x.username === this.userStore.user.username
                           ? this.onRemoveProducer(x.id)
                           : null
                         }
                         refresh={this.props.refresh}
            />
        })}
      <CommentInput submit={this.userStore.loggedIn ? this.props.submit : null} refresh={this.props.refresh}/>
    </div>;
  }
}
