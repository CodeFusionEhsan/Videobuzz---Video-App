import Video from '../../../models/Video'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function POST(req) {
    if (req.method == "POST") {
        const data = await req.formData()
        const query = data.get("query")
        const mod_query = query.replace("-", " ")
        let f_query =  ""
        mod_query.split(" ").forEach(function(s) {
            if (s.search(/\./) !== -1) { s = "\""+s+"\""; }
            f_query += s + " ";
        });
        await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/Videobuzz?retryWrites=true&w=majority")
                        console.log("Connected to database")
        const videos = await Video.find({$text: {$search: f_query.trim()}})
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