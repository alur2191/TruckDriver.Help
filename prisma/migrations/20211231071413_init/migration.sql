-- CreateTable
CREATE TABLE "Beta" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "mcnumber" INTEGER NOT NULL,
    "usdot" INTEGER NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "Beta_pkey" PRIMARY KEY ("id")
);
