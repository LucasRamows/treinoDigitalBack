-- CreateEnum
CREATE TYPE "public"."WorkoutType" AS ENUM ('PROGRESSIVE', 'SPECIAL', 'PERSONAL');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('SUPERADMIN', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthDay" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Tasks" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isPriority" BOOLEAN NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Reminders" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tasksId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."UserGym" (
    "id" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL DEFAULT 1,
    "frequencyYear" INTEGER[],
    "workoutType" "public"."WorkoutType" NOT NULL DEFAULT 'PROGRESSIVE',
    "weigth" DOUBLE PRECISION[],
    "height" DOUBLE PRECISION[],
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserExercise" (
    "id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION[],
    "day" TEXT[],
    "sessions" INTEGER NOT NULL DEFAULT 3,
    "reps" INTEGER NOT NULL DEFAULT 12,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "frequency" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "public"."User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_id_key" ON "public"."Tasks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reminders_id_key" ON "public"."Reminders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserGym_id_key" ON "public"."UserGym"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserGym_userId_key" ON "public"."UserGym"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserExercise_id_key" ON "public"."UserExercise"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserExercise_userId_exerciseId_key" ON "public"."UserExercise"("userId", "exerciseId");

-- AddForeignKey
ALTER TABLE "public"."Tasks" ADD CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reminders" ADD CONSTRAINT "Reminders_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "public"."Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserGym" ADD CONSTRAINT "UserGym_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserExercise" ADD CONSTRAINT "UserExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."UserGym"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserExercise" ADD CONSTRAINT "UserExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
