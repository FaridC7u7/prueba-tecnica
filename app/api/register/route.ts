import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, password } = body;

        const filePath = path.join(process.cwd(), 'data', 'users.json');
        const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const existingUser = users.find((u: { username: string }) => u.username === username);
        if (existingUser) {
            return NextResponse.json({ message: 'El usuario ya existe' }, { status: 409 });
        }

        users.push({ username, password });
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        return NextResponse.json({ message: 'Usuario registrado exitosamente' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
    }
}
