import { ArticleId } from "../../../models/Article";
import React from "react";
import { ArticleFetchError } from "../../../api/ArticleService";

interface ArticleFetchErrorContentProps {
  id: ArticleId;
  error: ArticleFetchError;
  refetch: () => void;
}

export class ArticleFetchErrorContent extends React.Component<ArticleFetchErrorContentProps, {}> {
  render() {
    return <div>
      error occurred.
    </div>
  }
}
