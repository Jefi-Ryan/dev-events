import connectDB from "@/lib/mongodb";
import {v2 as cloudinary} from "cloudinary";
import Event from "@/database/events.model";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const POST = async (req: NextRequest) => {

    try {

        await connectDB();

        const data = await req.formData();

        let eventData;

        try {
            eventData = Object.fromEntries(data.entries());
            
        } catch (error) {
            return NextResponse.json({ 
                message: "Invalid JSON format.", 
                error: error instanceof Error ? error.message: "Unknown" 
            }, { status: 401 });
        }

        const file = data.get("image");
        if (!(file instanceof File)) {
            return NextResponse.json(
                { message: "Invalid request", error: 'Expected an image file in the "image" field.' },
                { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();

        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'devevents'}, (error, uploadResult) => {
                if (error) {
                    return reject(error);
                }
                return resolve(uploadResult);
            }).end(buffer);
        });

        eventData.image = (uploadResult as {secure_url : string}).secure_url;

        const event = await Event.insertOne(eventData);

        return NextResponse.json(
            { 
                message: "Inserted Successfully!",
                event: event 
            }, { status: 201 });
        
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


const GET = async (req: NextRequest) => {

    try {

        await connectDB();

        const events = await Event.find();

        return NextResponse.json(
            { 
                message: "Events Fetched Successfully!",
                events: events
            }, { status: 200 });
        
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

export {POST, GET};