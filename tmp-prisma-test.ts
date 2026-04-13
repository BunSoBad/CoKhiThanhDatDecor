import { prisma } from './src/lib/prisma';
async function main() {
  const cats = await prisma.category.findMany({ select: { slug: true } });
  console.log(cats);
  await prisma.$disconnect();
}
main().catch((err) => { console.error(err); process.exit(1); });
