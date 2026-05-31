-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "ingredients" TEXT NOT NULL,
    "steps" TEXT NOT NULL,
    "youtubeUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_menuId_key" ON "Recipe"("menuId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
