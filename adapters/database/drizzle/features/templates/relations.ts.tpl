import { relations } from 'drizzle-orm';
import { users, posts, comments, categories, postCategories } from './schema';

// User relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}));

// Post relations
export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
  categories: many(postCategories),
}));

// Comment relations
export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}));

// Category relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(postCategories),
}));

// Post-Category junction table relations
export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
  post: one(posts, {
    fields: [postCategories.postId],
    references: [posts.id],
  }),
  category: one(categories, {
    fields: [postCategories.categoryId],
    references: [categories.id],
  }),
}));

// Export all relations
export const allRelations = {
  users: usersRelations,
  posts: postsRelations,
  comments: commentsRelations,
  categories: categoriesRelations,
  postCategories: postCategoriesRelations,
};
    },
    {
