-- DropForeignKey
ALTER TABLE "UserJobs" DROP CONSTRAINT "UserJobs_jobId_fkey";

-- AddForeignKey
ALTER TABLE "UserJobs" ADD CONSTRAINT "UserJobs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
