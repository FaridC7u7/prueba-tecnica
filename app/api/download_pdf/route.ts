import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Product } from '@/types/product';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const product: Product = body;

        if (!product) {
            return NextResponse.json({ message: 'Producto no encontrado' }, { status: 400 });
        }

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const { width, height } = page.getSize();
        const fontSize = 20;
        let yPos = height - 50;

        const title = 'FICHA TÉCNICA';
        const titleWidth = font.widthOfTextAtSize(title, fontSize);
        page.drawText(title, {
            x: (width - titleWidth) / 2,
            y: yPos,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
        });

        yPos -= 40;

        const drawField = (label: string, value: string) => {
            page.drawText(`${label}:`, { x: 50, y: yPos, size: 14, font, color: rgb(0, 0, 0) });
            page.drawText(value || 'No disponible', { x: 150, y: yPos, size: 14, font: normalFont });
            yPos -= 30;
        };

        drawField('ID', String(product.id));
        drawField('Nombre', product.name);
        drawField('Descripción', product.description);
        drawField('Precio', product.price);

        if (product.image) {
            try {
                const imageUrl = await fetch(product.image);
                const imageBuffer = await imageUrl.arrayBuffer();
                const image = await pdfDoc.embedPng(imageBuffer);

                page.drawImage(image, {
                    x: 50,
                    y: yPos - 200,
                    width: 500,
                    height: 200,
                });
                yPos -= 220;
            } catch (error) {
                console.warn('Error al cargar la imagen:', error);
            }
        }

        const pdfBytes = await pdfDoc.save();
        const pdfBuffer = Buffer.from(pdfBytes);

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="ficha-tecnica-${product.name}.pdf"`,
            },
        });
    } catch (error) {
        console.error('Error generando el PDF:', error);
        return NextResponse.json({ message: 'Error generando el PDF' }, { status: 500 });
    }
}