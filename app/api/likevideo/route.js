'use server'

import Video from '../../../models/Video'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { getServerSession } from "next-auth/next"

export async function POST(req) {
    if (req.method == "POST") {
        const data = await req.formData()
        const id = data.get("id")
        const likedby = data.get("likedby")
        await mongoose.connect(process.env.MONGO_URI)
                        console.log("Connected to database")
        const video = await Video.findById(id)
        await video.likes.push(likedby)
        await video.save()

        return NextResponse.json({
            success: true,
        })
    } else {
        return NextResponse.json({
            success: false,
            message: "Only POST Method Allowed!"
        })
    }
}
