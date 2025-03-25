/*
  Warnings:

  - You are about to drop the column `carbohydrates` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `carbs` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `time` on the `Meal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "carbohydrates",
ADD COLUMN     "carbs" DOUBLE PRECISION NOT NULL,
DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;
