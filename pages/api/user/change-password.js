import { getSession } from "next-auth/client"

async function handler(req, res) {
    if (req.method !== 'PATCH') {
        return 
    }

    const session = getSession({req: req});

    if (!session) {
        res
    }
}

export default handler