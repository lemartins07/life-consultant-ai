import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "../../../../lib/prisma";

const MIN_PASSWORD_LENGTH = 8;

export async function POST(request: Request) {
  let body: { email?: string; password?: string; name?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const email = body.email?.toLowerCase().trim();
  const password = body.password;
  const name = body.name?.trim();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists." },
      { status: 409 },
    );
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name: name || null,
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
