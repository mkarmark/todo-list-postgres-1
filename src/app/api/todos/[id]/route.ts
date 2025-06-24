import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

export async function DELETE(
  req: NextRequest,
  context: any
) {
  const id = Number(context.params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 