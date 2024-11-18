-- CreateTable
CREATE TABLE "HeaderButtons" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "HeaderButtons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaticPages" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaticPages_pkey" PRIMARY KEY ("id")
);
