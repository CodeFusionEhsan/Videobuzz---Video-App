import Video from '../../../models/Video'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function GET(req) {
    if (req.method == "GET") {
        await mongoose.connect(process.env.MONGO_URI)
                        console.log("Connected to database")
        const videos = await Video.find()
        console.log(videos)
        return NextResponse.json({
            success: true,
            result: videos
        })
    } else {
        return NextResponse.json({
            success: false,
            message: "Only GET Method Allowed!"
        })
    }
}
