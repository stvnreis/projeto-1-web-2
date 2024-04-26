/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_id_fkey";

-- DropTable
DROP TABLE "Role";

-- CreateTable
CREATE TABLE "role" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "role_type" NOT NULL,
    "can_submit_edit_delete_articles" BOOLEAN NOT NULL DEFAULT false,
    "can_manage_users" BOOLEAN NOT NULL DEFAULT false,
    "can_delete_articles_from_any_user" BOOLEAN NOT NULL DEFAULT false,
    "can_submit_article_to_evaluation" BOOLEAN NOT NULL DEFAULT false,
    "can_evaluate" BOOLEAN NOT NULL DEFAULT false,
    "can_publish_article" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
