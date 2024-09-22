import type { Vote } from "@/entity/vote";
import { XmlError } from "@/errors/xmlError";
import { XmlCore } from "@/infra/xml/xml2js/core";

export type VoteXml = {
  $: {
    Id: string;
    PostId: string;
    VoteTypeId: string;
    UserId: string;
    CreationDate: string;
    BountyAmount: string;
  };
};

export type VotesXml = {
  votes: {
    row: VoteXml[];
  };
};

/**
 * XMLから取得したデータをEntityに変換する
 * 型変換できないものはnullを返す
 */
export const convertVotesFromXml = (votesXml: VoteXml[]): Vote[] => {
  return votesXml.map((vote) => ({
    id: Number.parseInt(vote.$.Id) || null,
    postId: Number.parseInt(vote.$.PostId) || null,
    voteTypeId: Number.parseInt(vote.$.VoteTypeId) || null,
    userId: Number.parseInt(vote.$.UserId) || null,
    creationDate: new Date(vote.$.CreationDate),
    bountyAmount: Number.parseInt(vote.$.BountyAmount) || null,
  }));
};

/**
 * XMLファイルから情報を取得する
 */
export const votesXml = async () => {
  try {
    const xmlPath = process.env.XML_PATH || "tmp";
    const xml = await new XmlCore<VotesXml>().read(`${xmlPath}/Votes.xml`);
    return xml.entity((xml) => convertVotesFromXml(xml.votes.row));
  } catch (error) {
    throw new XmlError("failed to read votes xml", error);
  }
};
