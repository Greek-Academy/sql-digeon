import { getConfig } from "@/config";
import type { PostHistory } from "@/entity/postHistory";
import { XmlError } from "@/errors/xmlError";
import { XmlCore } from "@/infra/xml/xml2js/core";

export type PostHistoryXml = {
  $: {
    Id: string;
    PostHistoryTypeId: string;
    PostId: string;
    RevisionGuid: string;
    CreationDate: string;
    UserId: string;
    UserDisplayName: string;
    Comment: string;
    Text: string;
    ContentLicense: string;
  };
};

export type PostHistoriesXml = {
  posthistory: {
    row: PostHistoryXml[];
  };
};

/**
 * XMLから取得したデータをEntityに変換する
 * 型変換できないものはnullを返す
 */
export const convertPostHistoriesFromXml = (
  postHistoriesXml: PostHistoryXml[],
): PostHistory[] => {
  return postHistoriesXml.map((postHistory) => ({
    id: Number.parseInt(postHistory.$.Id) || null,
    postHistoryTypeId: Number.parseInt(postHistory.$.PostHistoryTypeId) || null,
    postId: Number.parseInt(postHistory.$.PostId) || null,
    revisionGuid: postHistory.$.RevisionGuid,
    creationDate: new Date(postHistory.$.CreationDate),
    userId: Number.parseInt(postHistory.$.UserId) || null,
    userDisplayName: postHistory.$.UserDisplayName,
    comment: postHistory.$.Comment,
    text: postHistory.$.Text,
    contentLicense: postHistory.$.ContentLicense,
  }));
};

/**
 * XMLファイルから情報を取得する
 */
export const postHistoriesXml = async () => {
  try {
    const xmlPath = getConfig("xmlPath");
    const xml = await new XmlCore<PostHistoriesXml>().read(
      `${xmlPath}/PostHistory.xml`,
    );
    return xml.entity((xml) =>
      convertPostHistoriesFromXml(xml.posthistory.row),
    );
  } catch (error) {
    throw new XmlError("failed to read postHistories xml", error);
  }
};
