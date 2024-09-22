import fs from "node:fs";
import type { IXml } from "@/infra/interface/xml";
import { badgesXml } from "@/infra/xml/xml2js/badge";
import { commentsXml } from "@/infra/xml/xml2js/comment";
import { postsXml } from "@/infra/xml/xml2js/post";
import { postHistoriesXml } from "@/infra/xml/xml2js/postHistory";
import { postLinksXml } from "@/infra/xml/xml2js/postLink";
import { tagsXml } from "@/infra/xml/xml2js/tag";
import { usersXml } from "@/infra/xml/xml2js/user";
import { votesXml } from "@/infra/xml/xml2js/vote";
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

export class Xml2js implements IXml {
  users = usersXml;
  badges = badgesXml;
  posts = postsXml;
  comments = commentsXml;
  postHistories = postHistoriesXml;
  postLinks = postLinksXml;
  tags = tagsXml;
  votes = votesXml;
}
