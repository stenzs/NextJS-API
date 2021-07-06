import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async(req, res) => {

    if (req.method === 'POST') {
        let { author, title } = req.body
        if (author === '' || author === undefined) {author = 'Anonymous'}
        if (title === '' || title === undefined) {title = ''}
        //Проверка наличия имени пользователя (регистр учитывается)
        const exist = await prisma.user.findFirst({
            where: {
                name: author,
            },
            select: {
                name: true,
            }
        })
        if (exist === null) {
            //Если такого имени пользователя еще нет
            await prisma.user.create({
                data: {
                    name: author,
                },
            })
            const newPost = await prisma.post.create({
                data: {
                    title: title,
                    author: { connect: { name: author } },
                },
            })
            res.json(newPost)
        } else {
            //Если имя пользователя уже существует
            const newPost2 = await prisma.post.create({
                data: {
                    title: title,
                    author: { connect: { name: author } },
                },
            })
            res.json(newPost2)
        }
    } else if (req.method === 'GET') {
        const posts = await prisma.post.findMany({
            include: { author: true },
        })
        res.json(posts)
    }
}