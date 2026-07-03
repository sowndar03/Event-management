/*
  Warnings:

  - You are about to drop the column `timestamp` on the `audit_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `audit_logs` DROP COLUMN `timestamp`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
