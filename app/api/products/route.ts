import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const filePath = path.join(process.cwd(), 'data', 'products.json');
        const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener los productos' }, { status: 500 });
    }
}
