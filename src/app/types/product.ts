export interface Product {
  productId: string;
  name: string;
  originalPrice: number;
  discountedPrice?: number;
  imageUrl: string;
  category: string[];
  isNew?: boolean;
}
