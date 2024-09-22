import { getConfig } from "@/config";
import type { Tag } from "@/entity/tag";
import { XmlError } from "@/errors/xmlError";
import { XmlCore } from "@/infra/xml/xml2js/core";

export type TagXml = {
  $: {
    Id: string;
    TagName: string;
    Count: string;
    ExcerptPostId: string;
    WikiPostId: string;
  };
};

export type TagsXml = {
  tags: {
    row: TagXml[];
  };
};

/**
 * XMLから取得したデータをEntityに変換する
 * 型変換できないものはnullを返す
 */
export const convertTagsFromXml = (tagsXml: TagXml[]): Tag[] => {
  return tagsXml.map((tag) => ({
    id: Number.parseInt(tag.$.Id) || null,
    tagName: tag.$.TagName,
    count: Number.parseInt(tag.$.Count) || null,
    excerptPostId: Number.parseInt(tag.$.ExcerptPostId) || null,
    wikiPostId: Number.parseInt(tag.$.WikiPostId) || null,
  }));
};

/**
 * XMLファイルから情報を取得する
 */
export const tagsXml = async () => {
  try {
    const xmlPath = getConfig("xmlPath");
    const xml = await new XmlCore<TagsXml>().read(`${xmlPath}/Tags.xml`);
    return xml.entity((xml) => convertTagsFromXml(xml.tags.row));
  } catch (error) {
    throw new XmlError("failed to read tags xml", error);
  }
};
