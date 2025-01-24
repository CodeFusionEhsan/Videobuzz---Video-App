import Video from '../../../models/Video'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function POST(req) {
    if (req.method == "POST") {
        const data = await req.formData()
        const id = data.get("id")
        await mongoose.connect(process.env.MONGO_URI)
                        console.log("Connected to database")
        const video = await Video.findById(id)
        console.log(video)
        return NextResponse.json({
            success: true,
            result: video
        })
    } else {
        return NextResponse.json({
            success: false,
            message: "Only POST Method Allowed!"
        })
    }
}
