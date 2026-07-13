-- CreateTable
CREATE TABLE "configuration" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "configuration_pkey" PRIMARY KEY ("key")
);
