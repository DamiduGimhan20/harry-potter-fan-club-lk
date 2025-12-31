import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
export function useFirestore<T extends { id?: string }>(collectionName: string) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, collectionName), (snapshot) => {
      const data = snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => {
        return {
          id: docSnap.id,
          ...(docSnap.data() as Omit<T, 'id'>),
        } as T;
      });
      setItems(data);
    });

    return () => unsub();
  }, [collectionName]);

  const add = async (item: Omit<T, 'id'>) => {
    await addDoc(collection(db, collectionName), item);
  };

  const update = async (id: string, item: Partial<Omit<T, 'id'>>) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, item);
  };

  const remove = async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  const getSingle = async (id: string): Promise<T | null> => {
    const docRef = doc(db, collectionName, id);
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<T, 'id'>),
      } as T;
    }
    return null;
  };

  return { items, add, update, remove, getSingle };
}