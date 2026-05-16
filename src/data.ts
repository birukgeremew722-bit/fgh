import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: 's1',
    name: 'Truffle Fries',
    description: 'Crispy golden fries tossed in white truffle oil, topped with aged Parmesan and fresh parsley.',
    price: 14,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80',
    popular: true
  },
  {
    id: 's2',
    name: 'Crispy Calamari',
    description: 'Tender calamari rings, lightly battered and fried, served with a zesty lemon aioli.',
    price: 18,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80'
  },
  {
    id: 's3',
    name: 'Garlic Bread Supreme',
    description: 'Artisanal loaf toasted with garlic confit butter, mozzarella, and a hint of rosemary.',
    price: 12,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1619535814782-b3d00f73571d?w=800&q=80'
  },
  {
    id: 's4',
    name: 'Hummus & Pita',
    description: 'Creamy chickpea puree with tahini, olive oil, and fresh warm pita bread.',
    price: 15,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=800&q=80',
    popular: true
  },
  // Main Courses
  {
    id: 'm1',
    name: 'Wagyu Beef Burger',
    description: 'Premium Wagyu patty, truffle mayo, caramelized onions, and Gruyère cheese on a brioche bun.',
    price: 32,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    popular: true
  },
  {
    id: 'm2',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon fillet with citrus glaze, served over a bed of quinoa and seasonal greens.',
    price: 38,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80'
  },
  {
    id: 'm3',
    name: 'Creamy Alfredo Pasta',
    description: 'Handcrafted fettuccine in a rich Parmesan cream sauce with roasted garlic.',
    price: 26,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1645112481338-350711cc955a?w=800&q=80'
  },
  {
    id: 'm4',
    name: 'BBQ Steak',
    description: 'Prime dry-aged ribeye with house-made smoky BBQ rub, served with roasted root vegetables.',
    price: 52,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80',
    popular: true
  },
  // Cocktails
  {
    id: 'c1',
    name: 'Espresso Martini',
    description: 'Premium vodka, fresh espresso, Coffee liqueur, and a touch of vanilla.',
    price: 16,
    category: 'Cocktails',
    image: 'https://images.unsplash.com/photo-1545438102-799c3991ffb2?w=800&q=80',
    popular: true
  },
  {
    id: 'c2',
    name: 'Mojito',
    description: 'White rum, fresh mint, lime juice, and sparkling soda over crushed ice.',
    price: 14,
    category: 'Cocktails',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80'
  },
  {
    id: 'c3',
    name: 'Old Fashioned',
    description: 'Small-batch bourbon, sugar cube, aromatic bitters, and orange zest.',
    price: 18,
    category: 'Cocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80'
  },
  {
    id: 'c4',
    name: 'Margarita',
    description: 'Tequila blanco, Cointreau, fresh lime juice, and a salt rim.',
    price: 15,
    category: 'Cocktails',
    image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=800&q=80'
  },
  // Desserts
  {
    id: 'd1',
    name: 'Chocolate Lava Cake',
    description: 'Warm dark chocolate cake with a molten center, served with vanilla bean gelato.',
    price: 14,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
    popular: true
  },
  {
    id: 'd2',
    name: 'Cheesecake',
    description: 'New York style cheesecake with a berry compote and graham cracker crust.',
    price: 12,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80'
  },
  {
    id: 'd3',
    name: 'Tiramisu',
    description: 'Layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa powder.',
    price: 13,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    popular: true
  }
];
