import Video from '../../../models/Video'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function GET(req) {
    if (req.method == "GET") {
        await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/Videobuzz?retryWrites=true&w=majority")
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