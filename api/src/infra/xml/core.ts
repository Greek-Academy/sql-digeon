import fs from "node:fs";
import type { Badge } from "@/entity/badge";
import type { Comment } from "@/entity/comment";
import type { Post } from "@/entity/post";
import type { PostHistory } from "@/entity/postHistory";
import type { PostLink } from "@/entity/postLink";
import type { Tag } from "@/entity/tag";
import type { User } from "@/entity/user";
import { badgesXml } from "@/infra/xml/badge";
import { commentsXml } from "@/infra/xml/comment";
import { postsXml } from "@/infra/xml/post";
import { postHistoriesXml } from "@/infra/xml/postHistory";
import { postLinksXml } from "@/infra/xml/postLink";
import { tagsXml } from "@/infra/xml/tag";
import { usersXml } from "@/infra/xml/user";
import xml2js from "xml2js";

export class XmlCore<T> {
  private xmlData: T | undefined;

  async read(filePath: string): Promise<this> {
    const data = fs.readFileSync(filePath, "utf8");
    this.xmlData = await xml2js.parseStringPromise(data);
    return this;
  }

  entity<U>(convertFn: (xml: T) => U[]): U[] {
    return convertFn(this.xmlData || ({} as T));
  }
}

export interface Xml {
  users: () => Promise<User[]>;
  badges: () => Promise<Badge[]>;
  posts: () => Promise<Post[]>;
  comments: () => Promise<Comment[]>;
  postHistories: () => Promise<PostHistory[]>;
  postLinks: () => Promise<PostLink[]>;
  tags: () => Promise<Tag[]>;
}

export class Xml2js implements Xml {
  users = usersXml;
  badges = badgesXml;
  posts = postsXml;
  comments = commentsXml;
  postHistories = postHistoriesXml;
  postLinks = postLinksXml;
  tags = tagsXml;
}
