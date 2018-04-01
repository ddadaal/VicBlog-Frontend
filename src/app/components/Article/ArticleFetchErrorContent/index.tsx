import { ArticleId } from "../../../models/Article";
import { ArticleFetchError } from "../../../stores/ArticleStore";
import React from "react";

interface ArticleFetchErrorContentProps {
  id: ArticleId,
  error: ArticleFetchError,
  refetch: () => void
}

export class ArticleFetchErrorContent extends React.Component<ArticleFetchErrorContentProps, {}> {
  render() {
    return <div>
      error occurred.
    </div>
  }
}
