import type { Comment } from "@/entity/comment";
import { XmlError } from "@/errors/xmlError";
import { XmlCore } from "@/infra/xml/xml2js/core";

export type CommentXml = {
  $: {
    Id: string;
    PostId: string;
    Score: string;
    Text: string;
    CreationDate: string;
    UserId: string;
    UserDisplayName: string;
  };
};

export type CommentsXml = {
  comments: {
    row: CommentXml[];
  };
};

/**
 * XMLから取得したデータをEntityに変換する
 * 型変換できないものはnullを返す
 */
export const convertCommentsFromXml = (
  commentsXml: CommentXml[],
): Comment[] => {
  return commentsXml.map((comment) => ({
    id: Number.parseInt(comment.$.Id) || null,
    postId: Number.parseInt(comment.$.PostId) || null,
    score: Number.parseInt(comment.$.Score) || null,
    text: comment.$.Text,
    creationDate: new Date(comment.$.CreationDate),
    userId: Number.parseInt(comment.$.UserId) || null,
    userDisplayName: comment.$.UserDisplayName,
  }));
};

/**
 * XMLファイルから情報を取得する
 */
export const commentsXml = async () => {
  try {
    const xmlPath = process.env.XML_PATH || "tmp";
    const xml = await new XmlCore<CommentsXml>().read(
      `${xmlPath}/Comments.xml`,
    );
    return xml.entity((xml) => convertCommentsFromXml(xml.comments.row));
  } catch (error) {
    throw new XmlError("failed to read comments xml", error);
  }
};
