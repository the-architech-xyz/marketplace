// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  category    String
  image       String?
  featured    Boolean  @default(false)
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("products")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  avatar    String?
  role      String   @default("user")
  status    String   @default("active")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Post {
  id          String   @id @default(cuid())
  title       String
  content     String
  excerpt     String?
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  category    String
  tags        String[]
  featured    Boolean  @default(false)
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("posts")
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  postId    String
  post      Post     @relation(fields: [postId], references: [id])
  parentId  String?
  parent    Comment? @relation("CommentReplies", fields: [parentId], references: [id])
  replies   Comment[] @relation("CommentReplies")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("comments")
}