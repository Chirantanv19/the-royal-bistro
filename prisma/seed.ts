import { PrismaClient, MenuCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting Database Seed...");

    // 1. Cleanup existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menuItem.deleteMany();
    console.log("🧹 Cleaned up old data");

    // 2. Create Admin User
    const email = "admin@royal.com";
    const password = "admin";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: "Manager",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("✅ Admin User Created:", user.email);

    // 3. Define 30+ Real Menu Items
    const menuItems = [
        // --- COFFEE ---
        {
            name: "Royal Espresso",
            description: "A rich, full-bodied shot of our signature vintage blend.",
            price: 3.50,
            category: "COFFEE",
            image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGAN", "GF"],
        },
        {
            name: "Double Ristretto",
            description: "A short shot of a more highly concentrated espresso coffee.",
            price: 4.00,
            category: "COFFEE",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGAN", "GF"],
        },
        {
            name: "Hazelnut Latte",
            description: "Espresso with steamed milk and roasted hazelnut syrup.",
            price: 5.50,
            category: "COFFEE",
            image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
        {
            name: "Cappuccino Royale",
            description: "Dark espresso topped with a deep layer of frothy milk foam.",
            price: 4.80,
            category: "COFFEE",
            image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
        
        {
            name: "Mocha Delight",
            description: "Espresso combined with bittersweet mocha sauce and steamed milk.",
            price: 5.80,
            category: "COFFEE",
            image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },

        // --- BREAKFAST ---
        {
            name: "Artisan Croissant",
            description: "Buttery, flaky, and golden brown. Baked fresh every morning.",
            price: 4.00,
            category: "BREAKFAST",
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
        
        {
            name: "Blueberry Pancakes",
            description: "Fluffy stack of pancakes topped with fresh blueberries and maple syrup.",
            price: 11.00,
            category: "BREAKFAST",
            image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
        {
            name: "Eggs Benedict",
            description: "Poached eggs and ham on an English muffin with hollandaise sauce.",
            price: 13.50,
            category: "BREAKFAST",
            image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80",
            dietary: [],
        },
       

        // --- LUNCH ---
        {
            name: "Smoked Salmon Bagel",
            description: "Toasted bagel with cream cheese, smoked salmon, capers, and red onion.",
            price: 12.00,
            category: "LUNCH",
            image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
            dietary: [],
        },
        {
            name: "Caesar Salad",
            description: "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.",
            price: 10.50,
            category: "LUNCH",
            image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
        {
            name: "Wagyu Burger",
            description: "Premium beef patty with cheddar, lettuce, tomato, and secret sauce.",
            price: 18.00,
            category: "LUNCH",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
            dietary: [],
        },
        {
            name: "Margherita Pizza",
            description: "Classic tomato sauce, fresh mozzarella, and basil on thin crust.",
            price: 14.00,
            category: "LUNCH",
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
        {
            name: "Club Sandwich",
            description: "Triple-decker toasted sandwich with chicken, bacon, lettuce, and tomato.",
            price: 13.00,
            category: "LUNCH",
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
            dietary: [],
        },
        {
            name: "Quinoa Salad bowl",
            description: "Nutritious quinoa with roasted vegetables, feta cheese, and lemon dressing.",
            price: 11.50,
            category: "LUNCH",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN", "GF"],
        },

        // --- DESSERTS ---
        {
            name: "Classic Tiramisu",
            description: "Coffee-flavoured Italian dessert with mascarpone cheese.",
            price: 8.50,
            category: "DESSERTS",
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
        {
            name: "New York Cheesecake",
            description: "Rich and creamy cheesecake with a graham cracker crust.",
            price: 7.50,
            category: "DESSERTS",
            image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
        {
            name: "Chocolate Lava Cake",
            description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
            price: 9.00,
            category: "DESSERTS",
            image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
        {
            name: "Macaron Selection",
            description: "Assorted French almond meringue cookies with buttercream filling.",
            price: 6.50,
            category: "DESSERTS",
            image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80",
            dietary: ["GF", "VEGETARIAN"],
        },
        {
            name: "Lemon Tart",
            description: "Tangy lemon curd in a sweet pastry shell topped with meringue.",
            price: 7.00,
            category: "DESSERTS",
            image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
        {
            name: "Affogato",
            description: "A scoop of vanilla gelato drowned with a shot of hot espresso.",
            price: 6.00,
            category: "DESSERTS",
            image: "https://images.unsplash.com/photo-1598346762291-aee88549193f?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN", "GF"],
        },

        // --- BEVERAGES ---
        {
            name: "Fresh Orange Juice",
            description: "Freshly squeezed oranges, no added sugar.",
            price: 4.50,
            category: "BEVERAGES",
            image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGAN", "GF"],
        },
        {
            name: "Berry Smoothie",
            description: "Blend of strawberries, blueberries, raspberries, and yogurt.",
            price: 6.00,
            category: "BEVERAGES",
            image: "https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN", "GF"],
        },
        {
            name: "Iced Lemon Tea",
            description: "Classic black tea brewed cold with fresh lemon slices.",
            price: 4.00,
            category: "BEVERAGES",
            image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGAN", "GF"],
        },
        {
            name: "Green Detox Juice",
            description: "Spinach, apple, cucumber, and ginger cold-pressed juice.",
            price: 6.50,
            category: "BEVERAGES",
            image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGAN", "GF"],
        },
        {
            name: "Sparkling Mineral Water",
            description: "Premium sparkling water served with a slice of lime.",
            price: 3.00,
            category: "BEVERAGES",
            image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGAN", "GF"],
        },
        {
            name: "Hot Chocolate",
            description: "Rich cocoa with steamed milk and whipped cream.",
            price: 5.00,
            category: "BEVERAGES",
            image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80",
            dietary: ["VEGETARIAN"],
        },
    ];

    console.log(`📝 Preparing to seed ${menuItems.length} menu items...`);

    for (const item of menuItems) {
        await prisma.menuItem.create({
            data: {
                name: item.name,
                description: item.description,
                price: item.price,
                // Using 'as any' to match your enum type safely
                category: item.category as MenuCategory,
                image: item.image,
                dietary: item.dietary,
            },
        });
    }

    console.log("✅ Database successfully seeded with 32 items!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });