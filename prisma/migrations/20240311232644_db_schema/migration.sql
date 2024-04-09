-- CreateEnum
CREATE TYPE "role_type" AS ENUM ('ADMIN', 'AUTOR', 'AVALIADOR');

-- CreateEnum
CREATE TYPE "file_type" AS ENUM ('PDF');

-- CreateTable
CREATE TABLE "Role" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "role_type" NOT NULL,
    "can_submit_edit_delete_articles" BOOLEAN NOT NULL DEFAULT false,
    "can_manage_users" BOOLEAN NOT NULL DEFAULT false,
    "can_delete_articles_from_any_user" BOOLEAN NOT NULL DEFAULT false,
    "can_submit_article_to_evaluation" BOOLEAN NOT NULL DEFAULT false,
    "can_evaluate" BOOLEAN NOT NULL DEFAULT false,
    "can_publish_article" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article" (
    "id" VARCHAR(36) NOT NULL,
    "title" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_type" "file_type" NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author_article" (
    "author_id" VARCHAR(36) NOT NULL,
    "article_id" VARCHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "author_article_author_id_article_id_key" ON "author_article"("author_id", "article_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_article" ADD CONSTRAINT "author_article_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_article" ADD CONSTRAINT "author_article_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
