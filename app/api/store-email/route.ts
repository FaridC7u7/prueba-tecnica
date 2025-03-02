import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        const filePath = path.join(process.cwd(), 'data', 'emails.json');
        const emails = JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]');

        emails.push({ email, date: new Date().toISOString() });
        fs.writeFileSync(filePath, JSON.stringify(emails, null, 2));

        return NextResponse.json({ message: 'Correo registrado' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al guardar el correo' }, { status: 500 });
    }
}
