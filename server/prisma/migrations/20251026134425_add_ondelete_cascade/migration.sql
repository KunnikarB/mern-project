-- DropForeignKey
ALTER TABLE "public"."PlaySession" DROP CONSTRAINT "PlaySession_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserStats" DROP CONSTRAINT "UserStats_userId_fkey";

-- AddForeignKey
ALTER TABLE "PlaySession" ADD CONSTRAINT "PlaySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
