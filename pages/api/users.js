import { prisma } from "@/server/db/client"
export default async function handler(req, res) {
    const {method} = req
    const {id} = req.body
    switch (method) {
        case 'POST':
            const user = await prisma.User.create({
                data: {
                    name: "Sher",
                    id:1,
                },
            })
            break;
        }

}