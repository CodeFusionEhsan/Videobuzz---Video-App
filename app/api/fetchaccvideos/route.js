import Video from '../../../models/Video'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function POST(req) {
    if (req.method == "POST") {
        const data = await req.formData()
        const id = data.get("id")
        console.log(id)
        await mongoose.connect(process.env.MONGO_URI)
                        console.log("Connected to database")
        const videos = await Video.find({uploaded_by: id})
        console.log(videos)
        return NextResponse.json({
            success: true,
            result: videos
        })
    } else {
        return NextResponse.json({
            success: false,
            message: "Only POST Method Allowed!"
        })
    }
}
