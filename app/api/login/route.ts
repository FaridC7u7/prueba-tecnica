import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const user = users.find((u: { username: string; password: string }) => u.username === username && u.password === password);

    if (user) {
      return NextResponse.json({ message: 'Login exitoso', isAuthenticated: true }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Credenciales incorrectas', isAuthenticated: false }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}