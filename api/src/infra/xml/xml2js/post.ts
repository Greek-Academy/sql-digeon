import type { Post } from "@/entity/post";
import { XmlCore } from "@/infra/xml/xml2js/core";

export type PostXml = {
  $: {
    Id: string;
    PostTypeId: string;
    AcceptedAnswerId: string;
    CreationDate: string;
    Score: string;
    Body: string;
    OwnerUserId: string;
    OwnerDisplayName: string;
    LastEditorUserId: string;
    LastEditorDisplayName: string;
    LastEditDate: string;
    LastActivityDate: string;
    Title: string;
    Tags: string;
    AnswerCount: string;
    CommentCount: string;
    CommunityOwnedDate: string;
    ContentLicense: string;
  };
};

export type PostsXml = {
  posts: {
    row: PostXml[];
  };
};

/**
 * XMLから取得したデータをEntityに変換する
 * 型変換できないものはnullを返す
 */
export const convertPostsFromXml = (postsXml: PostXml[]): Post[] => {
  return postsXml.map((post) => ({
    id: Number.parseInt(post.$.Id) || null,
    postTypeId: Number.parseInt(post.$.PostTypeId) || null,
    acceptedAnswerId: Number.parseInt(post.$.AcceptedAnswerId) || null,
    creationDate: new Date(post.$.CreationDate),
    score: Number.parseInt(post.$.Score) || null,
    body: post.$.Body,
    ownerUserId: Number.parseInt(post.$.OwnerUserId) || null,
    ownerDisplayName: post.$.OwnerDisplayName,
    lastEditorUserId: Number.parseInt(post.$.LastEditorUserId) || null,
    lastEditorDisplayName: post.$.LastEditorDisplayName,
    lastEditDate: new Date(post.$.LastEditDate),
    lastActivityDate: new Date(post.$.LastActivityDate),
    title: post.$.Title,
    tags: Number.parseInt(post.$.Tags) || null,
    answerCount: Number.parseInt(post.$.AnswerCount) || null,
    commentCount: Number.parseInt(post.$.CommentCount) || null,
    communityOwnedDate: new Date(post.$.CommunityOwnedDate),
    contentLicense: post.$.ContentLicense,
  }));
};

/**
 * XMLファイルから情報を取得する
 */
export const postsXml = async () => {
  try {
    const xmlPath = process.env.XML_PATH || "tmp";
    const xml = await new XmlCore<PostsXml>().read(`${xmlPath}/Posts.xml`);
    return xml.entity((xml) => convertPostsFromXml(xml.posts.row));
  } catch (error) {
    throw new Error(`XMLファイルの読み込みに失敗しました: ${error}`);
  }
};
