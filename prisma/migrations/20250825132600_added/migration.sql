/*
  Warnings:

  - Added the required column `birthDay` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "birthDay" TEXT NOT NULL,
ADD COLUMN     "weigth" DOUBLE PRECISION[];
