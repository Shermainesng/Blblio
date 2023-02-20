// import { prisma, Prisma } from "../../server/db/client"

import { prisma } from "@/server/db/client"



export default async function handler(req, res) {
    const {method} = req
    const {title, description, id} = req.body
   
    switch (method) {
        case 'POST': 
            const list = await prisma.list.create({
                data: {
                    title,
                    description
                },
            })
            res.status(201).json(list)
            break
        case 'PUT':
            console.log("THIS IS ID IN API" + id);
            const updateList = await prisma.list.update({
                where: {
                    id: id,
                },
                data:{
                    title: title,
                    description: description
                },
            });
            res.status(200).json(updateList);
            break
        case 'DELETE':
            const deleteList = await prisma.list.delete({
                where: {
                    id: id,
                }
            })
            res.status(200).json(deleteList);
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} not allowed`)

    }
}