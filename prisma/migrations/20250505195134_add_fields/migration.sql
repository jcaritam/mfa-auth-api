/*
  Warnings:

  - Added the required column `mfa_enabled` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "mfa_enabled" BOOLEAN NOT NULL,
ADD COLUMN     "mfa_secret" TEXT,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
