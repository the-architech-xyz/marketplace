import { StateStorage } from 'zustand/middleware';

/**
 * Custom storage implementation for Zustand persistence
 */
export class CustomStorage implements StateStorage {
  private storage: Map<string, string> = new Map();

  getItem(name: string): string | null {
    return this.storage.get(name) || null;
  }

  setItem(name: string, value: string): void {
    this.storage.set(name, value);
  }

  removeItem(name: string): void {
    this.storage.delete(name);
  }
}

/**
 * IndexedDB storage implementation
 */
export class IndexedDBStorage implements StateStorage {
  private dbName: string;
  private storeName: string;

  constructor(dbName: string = 'zustand-storage', storeName: string = 'stores') {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  private async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async getItem(name: string): Promise<string | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get(name);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result || null);
      });
    } catch (error) {
      console.error('IndexedDB getItem error:', error);
      return null;
    }
  }

  async setItem(name: string, value: string): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.put(value, name);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.error('IndexedDB setItem error:', error);
    }
  }

  async removeItem(name: string): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(name);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.error('IndexedDB removeItem error:', error);
    }
  }
}

/**
 * Encrypted storage wrapper
 */
export class EncryptedStorage implements StateStorage {
  private storage: StateStorage;
  private encryptionKey: string;

  constructor(storage: StateStorage, encryptionKey: string) {
    this.storage = storage;
    this.encryptionKey = encryptionKey;
  }

  private encrypt(data: string): string {
    // Simple encryption - in production, use a proper encryption library
    return btoa(data + this.encryptionKey);
  }

  private decrypt(encryptedData: string): string {
    try {
      const decrypted = atob(encryptedData);
      return decrypted.slice(0, -this.encryptionKey.length);
    } catch (error) {
      console.error('Decryption error:', error);
      return '';
    }
  }

  getItem(name: string): string | null {
    const encrypted = this.storage.getItem(name);
    return encrypted ? this.decrypt(encrypted) : null;
  }

  setItem(name: string, value: string): void {
    const encrypted = this.encrypt(value);
    this.storage.setItem(name, encrypted);
  }

  removeItem(name: string): void {
    this.storage.removeItem(name);
  }
}

// Storage factory
export function createStorage(type: string, options?: any): StateStorage {
  switch (type) {
    case 'localStorage':
      return {
        getItem: (name: string) => localStorage.getItem(name),
        setItem: (name: string, value: string) => localStorage.setItem(name, value),
        removeItem: (name: string) => localStorage.removeItem(name),
      };
    
    case 'sessionStorage':
      return {
        getItem: (name: string) => sessionStorage.getItem(name),
        setItem: (name: string, value: string) => sessionStorage.setItem(name, value),
        removeItem: (name: string) => sessionStorage.removeItem(name),
      };
    
    case 'indexedDB':
      return new IndexedDBStorage(options?.dbName, options?.storeName);
    
    case 'custom':
      return new CustomStorage();
    
    default:
      throw new Error(`Unsupported storage type: ${type}`);
  }
}
