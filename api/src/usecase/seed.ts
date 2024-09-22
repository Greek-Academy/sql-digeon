import type { Xml } from "@/infra/xml/core";
import type { BadgeRepository } from "@/repository/interface/badge";
import type { CommentRepository } from "@/repository/interface/comment";
import type { PostRepository } from "@/repository/interface/post";
import type { PostHistoryRepository } from "@/repository/interface/postHistory";
import type { PostLinkRepository } from "@/repository/interface/postLink";
import type { TagRepository } from "@/repository/interface/tag";
import type { Translation } from "@/repository/interface/translation";
import type { UserRepository } from "@/repository/interface/user";
import type { VoteRepository } from "@/repository/interface/vote";

export class SeedUseCase {
  constructor(
    private xml: Xml,
    private translation: Translation,
    private userRepository: UserRepository,
    private badgeRepository: BadgeRepository,
    private postRepository: PostRepository,
    private commentRepository: CommentRepository,
    private postHistoryRepository: PostHistoryRepository,
    private postLinkRepository: PostLinkRepository,
    private tagRepository: TagRepository,
    private voteRepository: VoteRepository,
  ) {}

  async execute(): Promise<void> {
    try {
      await this.translation.begin();

      console.log("users");
      let users = await this.xml.users();
      await this.userRepository.create(users);
      users = [];

      console.log("badges");
      let badges = await this.xml.badges();
      await this.badgeRepository.create(badges);
      badges = [];

      console.log("posts");
      let posts = await this.xml.posts();
      await this.postRepository.create(posts);
      posts = [];

      console.log("comments");
      let comments = await this.xml.comments();
      await this.commentRepository.create(comments);
      comments = [];

      console.log("postHistories");
      let postHistories = await this.xml.postHistories();
      await this.postHistoryRepository.create(postHistories);
      postHistories = [];

      console.log("postLinks");
      let postLinks = await this.xml.postLinks();
      await this.postLinkRepository.create(postLinks);
      postLinks = [];

      console.log("tags");
      let tags = await this.xml.tags();
      await this.tagRepository.create(tags);
      tags = [];

      console.log("votes");
      let votes = await this.xml.votes();
      await this.voteRepository.create(votes);
      votes = [];

      await this.translation.commit();
    } catch (error) {
      await this.translation.rollback();
      throw error;
    }
  }
}
