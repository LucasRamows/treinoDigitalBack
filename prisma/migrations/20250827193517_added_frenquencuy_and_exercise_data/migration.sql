-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "frequency" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "public"."UserExercise" ADD COLUMN     "frequency" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "reps" INTEGER NOT NULL DEFAULT 12,
ADD COLUMN     "sessions" INTEGER NOT NULL DEFAULT 3;
