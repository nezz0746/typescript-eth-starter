import { Request, Response } from 'express'
import { create } from 'ipfs-http-client'
import nodeHtmlToImage from 'node-html-to-image'
import { promises as fs } from 'fs'

const deleteImage = async (path: string) => {
  return fs.unlink(path)
}

export default class ImageController {
  public async makeWordImage(
    req: Request<{}, {}, { word: string }>,
    res: Response
  ): Promise<void> {
    try {
      const ipfs = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
      })

      const { word } = req.body

      const fileName = 'tmpimage.jpeg'

      const fileOutput = `./${fileName}`

      await nodeHtmlToImage({
        output: fileOutput,
        html: `<html>
        <head>
        <style>
              body {
                width: 2700px;
                height: 2700px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                background-color: white;
              }
              p {
                font-size: 300px;
                color: black;
              }
            </style>
          </head>
          <body><p>${word}</p></body>
          </html>
          `,
      })

      const file = await fs.readFile(fileOutput)

      const { path } = await ipfs.add(file)

      await deleteImage(fileOutput)

      res.json({ path: `https://ipfs.io/ipfs/${path}` })
    } catch (error) {
      console.log('error', error)
      res.json({ message: 'error' })
    }
  }
}

export const imageController = new ImageController()
