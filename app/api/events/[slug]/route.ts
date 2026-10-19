import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/events.model";
import connectDB from "@/lib/mongodb";


const GET = async (
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) => {

    try {

        await connectDB();

        const { slug } = await params;
        const event = await Event.findOne({slug: slug});

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(event, { status: 200 });
        
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : typeof error === "string"
                ? error
                : JSON.stringify(error) ?? String(error);

        return NextResponse.json(
            { 
                message: "Internal Server Error", 
                error: errorMessage
            }, { status: 500 });
    }

}

export {GET};