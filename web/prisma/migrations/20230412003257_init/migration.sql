-- CreateTable
CREATE TABLE "infliencer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nametags" TEXT[],

    CONSTRAINT "infliencer_pkey" PRIMARY KEY ("id")
);
