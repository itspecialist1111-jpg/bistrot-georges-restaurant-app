const menuItems = [
  {
    id: 1,
    name: "Classic Steak Frites",
    description: "Tender ribeye steak served with crispy golden fries and garlic butter.",
    price: 24.50,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Duck Confit",
    description: "Slow-cooked duck leg with puy lentils and red wine reduction.",
    price: 22.00,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "French Onion Soup",
    description: "Traditional soup topped with toasted baguette and melted Gruyère cheese.",
    price: 9.50,
    category: "Starter",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Crème Brûlée",
    description: "Classic vanilla custard with a crisp caramelized sugar topping.",
    price: 8.00,
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Moules-Frites",
    description: "Fresh mussels cooked in white wine, shallots, and parsley, served with fries.",
    price: 19.50,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1626509653293-247545d65494?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Escargots de Bourgogne",
    description: "Six Burgundy snails baked in garlic, parsley, and butter.",
    price: 12.00,
    category: "Starter",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800"
  }
];

let orders = [];

module.exports = { menuItems, orders };
