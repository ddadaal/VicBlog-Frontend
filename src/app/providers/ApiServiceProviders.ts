import { ArticleListService } from "../api/ArticleListService";
import { ArticleService } from "../api/ArticleService";
import { HttpService } from "../api/HttpService";
import { LikeService } from "../api/LikeService";
import { UserService } from "../api/UserService";
import { CommentService } from "../api/CommentService";

export const apiServiceProviders = [
  ArticleListService,
  ArticleService,
  HttpService,
  LikeService,
  UserService,
  CommentService
];
