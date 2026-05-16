export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Starters' | 'Main Courses' | 'Cocktails' | 'Desserts';
  image: string;
  popular?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';
export type SeatingOption = 'indoor' | 'outdoor';

export interface Reservation {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: SeatingOption;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt?: any;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered';

export interface Order {
  id?: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  createdAt: any;
}
