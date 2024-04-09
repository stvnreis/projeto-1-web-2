-- DropForeignKey
ALTER TABLE "author_article" DROP CONSTRAINT "author_article_article_id_fkey";

-- CreateTable
CREATE TABLE "article_grade_by_evaluator" (
    "article_id" VARCHAR(36) NOT NULL,
    "evaluator_id" VARCHAR(36) NOT NULL,
    "n1_value" INTEGER NOT NULL DEFAULT 0,
    "n2_value" INTEGER NOT NULL DEFAULT 0,
    "total_value" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "article_grade_by_evaluator_article_id_evaluator_id_key" ON "article_grade_by_evaluator"("article_id", "evaluator_id");

-- AddForeignKey
ALTER TABLE "author_article" ADD CONSTRAINT "author_article_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "article_grade_by_evaluator" ADD CONSTRAINT "article_grade_by_evaluator_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_grade_by_evaluator" ADD CONSTRAINT "article_grade_by_evaluator_evaluator_id_fkey" FOREIGN KEY ("evaluator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
