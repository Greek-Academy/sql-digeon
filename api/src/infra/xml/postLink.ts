import type { PostLink } from "@/entity/postLink";
import { XmlCore } from "@/infra/xml/core";

export type PostLinkXml = {
  $: {
    Id: string;
    CreationDate: string;
    PostId: string;
    RelatedPostId: string;
    LinkTypeId: string;
  };
};

export type PostLinksXml = {
  postlinks: {
    row: PostLinkXml[];
  };
};

/**
 * XMLから取得したデータをEntityに変換する
 * 型変換できないものはnullを返す
 */
export const convertPostLinksFromXml = (
  postLinksXml: PostLinkXml[],
): PostLink[] => {
  return postLinksXml.map((postLink) => ({
    id: Number.parseInt(postLink.$.Id) || null,
    creationDate: new Date(postLink.$.CreationDate),
    postId: Number.parseInt(postLink.$.PostId) || null,
    relatedPostId: Number.parseInt(postLink.$.RelatedPostId) || null,
    linkTypeId: Number.parseInt(postLink.$.LinkTypeId) || null,
  }));
};

/**
 * XMLファイルから情報を取得する
 */
export const postLinksXml = async () => {
  try {
    const xmlPath = process.env.XML_PATH || "tmp";
    const xml = await new XmlCore<PostLinksXml>().read(
      `${xmlPath}/PostLinks.xml`,
    );
    return xml.entity((xml) => convertPostLinksFromXml(xml.postlinks.row));
  } catch (error) {
    throw new Error(`XMLファイルの読み込みに失敗しました: ${error}`);
  }
};
