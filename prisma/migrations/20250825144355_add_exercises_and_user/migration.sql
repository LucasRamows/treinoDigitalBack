/*
  Warnings:

  - You are about to drop the column `day` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Exercise` table. All the data in the column will be lost.
  - The `workoutType` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `description` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."WorkoutType" AS ENUM ('PROGRESSIVE', 'SPECIAL', 'PERSONAL');

-- DropForeignKey
ALTER TABLE "public"."Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Exercise" DROP COLUMN "day",
DROP COLUMN "status",
DROP COLUMN "userId",
DROP COLUMN "weight",
ADD COLUMN     "description" TEXT NOT NULL,
ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "public"."Exercise_id_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "workoutType",
ADD COLUMN     "workoutType" "public"."WorkoutType" NOT NULL DEFAULT 'PROGRESSIVE';

-- DropEnum
DROP TYPE "public"."workoutType";

-- CreateTable
CREATE TABLE "public"."UserExercise" (
    "id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION[],
    "day" TEXT[],
    "status" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserExercise_id_key" ON "public"."UserExercise"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserExercise_userId_exerciseId_key" ON "public"."UserExercise"("userId", "exerciseId");

-- AddForeignKey
ALTER TABLE "public"."UserExercise" ADD CONSTRAINT "UserExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserExercise" ADD CONSTRAINT "UserExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
