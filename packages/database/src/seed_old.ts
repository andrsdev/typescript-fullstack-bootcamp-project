// const prisma = new PrismaClient();

// async function main() {

//     for (let i = 0; i < 10; i++) {
//         const product = await prisma.product.create({
//             data: {
//                 name: faker.commerce.productName(),
//                 description: faker.commerce.productDescription(),
//                 image: faker.image.url(),

//             }
//         })
//         const variants = await prisma.variant.createMany({
//             data: [{
//                 productId: product.id,
//                 name: "Standard",
//                 image: faker.image.url(),
//                 price: faker.number.int({ min: 500, max: 1500 }),
//                 stock: faker.number.int({ min: 0, max: 150 }),
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             },
//             {
//                 productId: product.id,
//                 name: "Gold",
//                 image: faker.image.url(),
//                 price: faker.number.int({ min: 500, max: 1500 }),
//                 stock: faker.number.int({ min: 0, max: 150 }),
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             },
//             {
//                 productId: product.id,
//                 name: "Ultimate",
//                 image: faker.image.url(),
//                 price: faker.number.int({ min: 500, max: 1500 }),
//                 stock: faker.number.int({ min: 0, max: 150 }),
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             }]
//         })

//         await prisma.collection.createMany({
//             data: [{
//                 name: "PlayStation 5",
//                 description: faker.commerce.productDescription(),
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             },
//             {
//                 name: "Xbox Series S/X",
//                 description: faker.commerce.productDescription(),
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             },
//             {
//                 name: "Nintendo Switch",
//                 description: faker.commerce.productDescription(),
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             },
//             {
//                 name: "PC",
//                 description: faker.commerce.productDescription(),
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             }]
//         })
//         await prisma.collection.update({
//             where: { id: faker.number.int({ min: 1, max: 3 }) },
//             data: {
//                 products: {
//                     connect: { id: product.id },
//                 }
//             }
//         })
//     }
// }

// main()
// .then(async ()=>{
//     await prisma.$disconnect()
// })
// .catch(async (e) =>{
//     console.error(e)
//     await prisma.$disconnect()
// })