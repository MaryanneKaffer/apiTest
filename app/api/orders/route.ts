import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const order = await prisma.order.create({
      data: {
        id: body.id,
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
        code2: body.code2,
        code3: body.code3,
        code4: body.code4,
        qnt: body.qnt,
        qnt2: body.qnt2,
        qnt3: body.qnt3,
        qnt4: body.qnt4,
        size: body.size,
        size2: body.size2,
        size3: body.size3,
        size4: body.size4,
        description: body.description,
        description2: body.description2,
        description3: body.description3,
        description4: body.description4,
        cost: body.cost,
        cost2: body.cost2,
        cost3: body.cost3,
        cost4: body.cost4,
        discount: body.discount,
        observation: body.observation,
        total: body.total,
      },
    });

    return NextResponse.json(order);
  }
  catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const order = await prisma.order.delete({
      where: { id },
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Delete failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
