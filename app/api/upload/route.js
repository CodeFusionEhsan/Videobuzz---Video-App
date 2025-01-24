import mongoose from 'mongoose'
import Video from '../../../models/Video'
import { writeFile } from "fs/promises";
import path from "path";
import {NextResponse} from 'next/server'

export async function POST(req, Response) {
    const formData = await req.formData()
    const id = formData.get('id')
    const title = formData.get('title')
    const description = formData.get('desc')
    const category = formData.get('category')
    const file = formData.get('video')

    if(!file) {
        return NextResponse.json({error: "No Files Received"})
    }

    if (id && title && description && file) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = Date.now() + file.name.replaceAll(" ", "_")
      await writeFile(path.join(process.cwd(), "public/videos/"+ filename), buffer)
      await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/Videobuzz?retryWrites=true&w=majority")
      console.log("Connected to database")

      const newupload = new Video({
        video: filename,
        title: title,
        description: description,
        uploaded_by: id,
        category: category
      })

      const result = await newupload.save()

      if(result) {
        return NextResponse.json({
          success: true,
          result: result
        })
      } else {
        return NextResponse.json({
          success: false,
        })
      }
    } else {
      return NextResponse.json({
        message: "Please fill all the fields",
        success: false
      })
    }
}