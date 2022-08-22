import { Post, User } from "../db";
import { PostModel } from "../db/schemas/post";

class searchService {
  static getResultsByName = async ({ getResults }) => {
    const { name, page } = getResults;
    let users = [];
    if (page === 1) {
      users = await User.findByName({ name });
    }
    const posts = await Post.findByUserName({ getResults });
    return { users, posts };
  };

  static getResultsByTitle = async ({ getResults }) => {
    const posts = await Post.findByTitle({ getResults });
    return { users: [], posts };
  };

  static getResultsByContent = async ({ getResults }) => {
    const posts = await Post.findByContent({ getResults });
    return { users: [], posts };
  };

  static getResultsByKeyword = async ({ getResults }) => {
    const { keyword, page } = getResults;
    let users = [];
    if (page === 1) {
      users = await User.findByKeyword({ keyword });
    }
    const posts = await Post.findByKeyword({ getResults });

    return { users, posts };
  };
}

export { searchService };
