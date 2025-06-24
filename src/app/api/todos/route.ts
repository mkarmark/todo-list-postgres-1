import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://todo-list-postgres-db-2--mkuid060700v11nl--user@blackwave-38f9a0e0-westus2-pgsqlserver:ls96TRjx2uylSiUjijQc@blackwave-38f9a0e0-westus2-pgsqlserver.postgres.database.azure.com:5432/todo-list-postgres-db-2--mkuid060700v11nl--db?sslmode=require"
    }
  }
});

export async function GET() {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  if (!title || typeof title !== 'string') {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }
  const todo = await prisma.todo.create({ data: { title } });
  return NextResponse.json(todo, { status: 201 });
} 