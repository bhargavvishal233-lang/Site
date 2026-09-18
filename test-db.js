const { PrismaClient } = require('@prisma/client');
async function test(pw) {
  process.env.DATABASE_URL = `postgresql://postgres.findpquzfuytkieolhwy:${encodeURIComponent(pw)}@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true`;
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log(`Success with: ${pw}`);
    await prisma.$disconnect();
    return true;
  } catch (e) {
    console.log(`Failed with: ${pw}`);
    await prisma.$disconnect();
    return false;
  }
}
async function run() {
  if (await test('Kaustubh@1332006')) return;
  if (await test('Kaustubh@132006')) return;
}
run();
