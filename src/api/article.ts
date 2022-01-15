import http from "../utils/http";

export function getArticles() {
  return http.get("/articles")
}

