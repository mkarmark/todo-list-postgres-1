import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://todo-list-postgres-db-2--mkuid060700v11nl--user@blackwave-38f9a0e0-westus2-pgsqlserver:ls96TRjx2uylSiUjijQc@blackwave-38f9a0e0-westus2-pgsqlserver.postgres.database.azure.com:5432/todo-list-postgres-db-2--mkuid060700v11nl--db?sslmode=require"
    }
  }
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 