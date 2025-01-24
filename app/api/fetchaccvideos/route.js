import Video from '../../../models/Video'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function POST(req) {
    if (req.method == "POST") {
        const data = await req.formData()
        const id = data.get("id")
        console.log(id)
        await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/Videobuzz?retryWrites=true&w=majority")
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