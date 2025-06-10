// src/types/clients.ts
export interface Client {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  // другие поля клиента
}