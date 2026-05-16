import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Mezze (Starters)
  {
    id: 's1',
    name: 'Hummus',
    description: 'Creamy chickpea puree with tahini, lemon juice, and extra virgin olive oil.',
    price: 15,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80',
    popular: true
  },
  {
    id: 's2',
    name: 'Moutabal',
    description: 'Smoky grilled eggplant puree with tahini, garlic, and a drizzle of pomegranate molasses.',
    price: 16,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80'
  },
  {
    id: 's3',
    name: 'Tabouleh',
    description: 'Traditional Lebanese salad with finely chopped parsley, tomatoes, mint, onion, and bulgur.',
    price: 14,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
    popular: true
  },
  {
    id: 's4',
    name: 'Fattoush',
    description: 'Zesty salad with mixed greens, radishes, cucumbers, and toasted pita bread with sumac dressing.',
    price: 14,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80'
  },
  {
    id: 's5',
    name: 'Fried Kibbeh',
    description: 'Crispy cracked wheat shells stuffed with seasoned minced meat and toasted pine nuts.',
    price: 18,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80',
    popular: true
  },
  
  // Main Courses (Grills & Specialties)
  {
    id: 'm1',
    name: 'Mixed Grill',
    description: 'A grand selection of Shish Taouk, Lamb Kebab, and Kafta, served with garlic sauce and hummus.',
    price: 45,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800&q=80',
    popular: true
  },
  {
    id: 'm2',
    name: 'Shish Taouk',
    description: 'Skewers of tender chicken breast marinated in yogurt and spices, grilled to perfection.',
    price: 28,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80'
  },
  {
    id: 'm3',
    name: 'Lamb Chops',
    description: 'Premium marinated lamb chops grilled over open flame, served with roasted vegetables.',
    price: 42,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    popular: true
  },
  {
    id: 'm4',
    name: 'Sayadiyah',
    description: 'Classic Lebanese fish and rice dish with caramelized onions, toasted pine nuts, and tahini sauce.',
    price: 36,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80'
  },

  // Beverages
  {
    id: 'c1',
    name: 'Mint Lemonade',
    description: 'Refreshing blend of fresh lemon juice, garden mint, and a touch of sweetness.',
    price: 12,
    category: 'Cocktails',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80',
    popular: true
  },
  {
    id: 'c2',
    name: 'Arabic Coffee',
    description: 'Traditional slow-brewed coffee with cardamom premium beans.',
    price: 8,
    category: 'Cocktails',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80'
  },
  {
    id: 'c3',
    name: 'Arak',
    description: 'Traditional Levantine unsweetened distilled spirit with an anise flavor.',
    price: 22,
    category: 'Cocktails',
    image: 'https://images.unsplash.com/photo-1569701881644-2bcd94948831?w=800&q=80'
  },

  // Desserts
  {
    id: 'd1',
    name: 'Baklawa Selection',
    description: 'Assorted layers of filo pastry filled with pistachios and nuts, drizzled with orange blossom syrup.',
    price: 18,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1519003722822-6d51ceec68be?w=800&q=80',
    popular: true
  },
  {
    id: 'd2',
    name: 'Mouhallabieh',
    description: 'Creamy milk pudding scented with rose water and topped with crushed pistachios.',
    price: 14,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1579372781848-65586616fc73?w=800&q=80'
  }
];
