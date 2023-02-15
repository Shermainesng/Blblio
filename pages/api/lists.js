import { Prisma } from "../../server/db/client"



export default async function handler(req, res) {
    const {method} = req

    switch (method) {
        case 'POST': 
            const {title, description} = req.body
            const list = await prisma.list.create({
                data: {
                    title,
                    description
                },
            })
            res.status(201).json(list)
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} not allowed`)

    }
}