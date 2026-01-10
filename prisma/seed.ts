import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting Database Seed...");

    // 1. Cleanup existing data to fix the broken images
    // Note: We delete dependent tables first (OrderItem) to avoid foreign key errors
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menuItem.deleteMany();

    // 2. Create Admin User
    const email = "admin@royal.com";
    const password = "admin";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {}, // If user exists, do nothing
        create: {
            email,
            name: "Manager",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("✅ Admin User Created:", user.email);

    // 3. Create Menu Items with REAL Image URLs
    const menuItems = [
        {
            name: "Royal Espresso",
            description: "A rich, full-bodied shot of our signature vintage blend.",
            price: 3.50,
            category: "COFFEE",
            image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGAN", "GF"],
        },
        {
            name: "Caramel Macchiato",
            description: "Freshly steamed milk with vanilla-flavored syrup marked with espresso.",
            price: 5.50,
            category: "COFFEE",
            image: "https://images.unsplash.com/photo-1485808191679-5f8c7c8606af?auto=format&fit=crop&w=800&q=80",
            dietary: ["GF"],
        },
        {
            name: "Artisan Croissant",
            description: "Buttery, flaky, and golden brown. Baked fresh every morning.",
            price: 4.00,
            category: "BREAKFAST",
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
        {
            name: "Smoked Salmon Bagel",
            description: "Toasted bagel with cream cheese, smoked salmon, capers, and red onion.",
            price: 12.00,
            category: "LUNCH",
            image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
            dietary: [],
        },
        {
            name: "Classic Tiramisu",
            description: "Coffee-flavoured Italian dessert with mascarpone cheese.",
            price: 8.50,
            category: "DESSERTS",
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
    ];

    for (const item of menuItems) {
        await prisma.menuItem.create({
            data: {
                name: item.name,
                description: item.description,
                price: item.price,
                category: item.category as any, // Cast to any to avoid TS enum issues if strict
                image: item.image,
                dietary: item.dietary,
            },
        });
    }

    console.log("✅ Menu Seeded with Valid Images");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });