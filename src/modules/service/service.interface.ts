export interface IService {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  estimatedDuration: number;
}

export interface IUpdateService {
  title?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  estimatedDuration?: number;
  isAvailable?: boolean;
}