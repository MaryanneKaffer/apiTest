import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const order = await prisma.order.create({
      data: {
        date: body.date,
        type: body.type,
        contact: body.contact,
        corporateName: body.corporateName,
        phone: body.phone,
        address: body.address,
        city: body.city,
        state: body.state,
        cep: body.cep,
        cpfCnpj: body.cpfCnpj,
        ie: body.ie,
        district: body.district,
        payment: body.payment,
        email: body.email,
        deliveryAddress: body.deliveryAddress,
        code: body.code,
        qnt: body.qnt,
        size: body.size,
        description: body.description,
        cost: body.cost,
        total: body.total,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function GET() {
  const orders = await prisma.order.findMany();
  return NextResponse.json(orders);
}

