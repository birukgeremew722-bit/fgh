import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  doc, 
  serverTimestamp,
  getDocs,
  where
} from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { Reservation, Order, ReservationStatus, OrderStatus } from '../types';

interface FirebaseContextType {
  createReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => Promise<string>;
  createOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => Promise<string>;
  reservations: Reservation[];
  orders: Order[];
  updateReservationStatus: (id: string, status: ReservationStatus) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  user: any;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        // For demo: if user is logged in, they are admin (normally check white-list)
        setIsAdminUser(true); 
      } else {
        setIsAdminUser(false);
      }
    });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!isAdminUser) return;

    const fetchSqlReservations = async () => {
      try {
        const response = await fetch('/api/reservations');
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Failed to fetch SQL reservations:", error);
      }
    };

    fetchSqlReservations();
    const interval = setInterval(fetchSqlReservations, 10000); // Poll every 10s for demo

    const unsubOrders = onSnapshot(
      query(collection(db, 'orders'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        setOrders(data);
      }
    );

    return () => {
      clearInterval(interval);
      unsubOrders();
    };
  }, [isAdminUser]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const createReservation = async (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation)
    });
    const data = await response.json();
    return data.id;
  };

  const createOrder = async (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  };

  const updateReservationStatus = async (id: string, status: ReservationStatus) => {
    await fetch(`/api/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    // Manually update local state for immediate feedback
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    await updateDoc(doc(db, 'orders', id), { status });
  };

  return (
    <FirebaseContext.Provider value={{ 
      createReservation, 
      createOrder, 
      reservations, 
      orders, 
      updateReservationStatus, 
      updateOrderStatus,
      login,
      logout,
      isAdmin: isAdminUser,
      user
    }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
