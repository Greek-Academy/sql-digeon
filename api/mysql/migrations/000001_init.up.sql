
CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `reputation` integer,
  `creation_date` timestamp,
  `display_name` varchar(255),
  `last_access_date` timestamp,
  `website_url` varchar(255),
  `location` varchar(255),
  `about_me` text,
  `views` integer,
  `up_votes` integer,
  `down_votes` integer,
  `account_id` integer
);

CREATE TABLE `badges` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `name` varchar(255),
  `date` timestamp,
  `class` integer,
  `tag_based` bool
);

CREATE TABLE `posts` (
  `id` integer PRIMARY KEY,
  `post_type_id` integer,
  `accepted_answer_id` integer,
  `creation_date` timestamp,
  `score` integer,
  `body` text,
  `owner_user_id` integer,
  `owner_display_name` varchar(255),
  `last_editor_user_id` integer,
  `last_editor_display_name` varchar(255),
  `last_edit_date` timestamp,
  `last_activity_date` timestamp,
  `title` varchar(255),
  `tags` integer,
  `answer_count` integer,
  `comment_count` integer,
  `community_owned_date` timestamp,
  `content_license` varchar(255)
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY,
  `post_id` integer,
  `score` integer,
  `text` text,
  `creation_date` timestamp,
  `user_id` integer,
  `user_display_name` varchar(255)
);

CREATE TABLE `post_history` (
  `id` integer PRIMARY KEY,
  `post_history_type_id` integer,
  `post_id` integer,
  `revision_guid` varchar(255),
  `creation_date` timestamp,
  `user_id` integer,
  `user_display_name` varchar(255),
  `comment` varchar(255),
  `text` text,
  `content_license` varchar(255)
);

CREATE TABLE `post_links` (
  `id` integer PRIMARY KEY,
  `creation_date` timestamp,
  `post_id` integer,
  `related_post_id` integer,
  `link_type_id` integer
);

CREATE TABLE `tags` (
  `id` integer PRIMARY KEY,
  `tag_name` varchar(255),
  `count` integer,
  `excerpt_post_id` integer,
  `wiki_post_id` integer
);

CREATE TABLE `votes` (
  `id` integer PRIMARY KEY,
  `post_id` integer,
  `vote_type_id` integer,
  `user_id` integer,
  `creation_date` timestamp,
  `bountry_amount` integer
);

ALTER TABLE `badges` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`owner_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`last_editor_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `post_history` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `post_history` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `post_links` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `post_links` ADD FOREIGN KEY (`related_post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `tags` ADD FOREIGN KEY (`excerpt_post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `tags` ADD FOREIGN KEY (`wiki_post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `votes` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);
