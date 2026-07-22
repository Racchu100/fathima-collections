export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  bannerImage?: string | null;
  productCount?: number;
}

export interface ProductImage {
  id?: string;
  url: string;
  isPrimary?: boolean;
  sortOrder?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  material?: string | null;
  isFeatured: boolean;
  isTrending: boolean;
  isLimited: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  categoryId: string;
  category?: Category;
  images: (ProductImage | string)[];
  sizes: string[];
  colors: { name: string; hexCode?: string }[] | string[];
  tags?: string[];
  createdAt?: string;
}

export interface CartItem {
  id: string; // unique cart entry key: productId-size-color
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  stock: number;
}

export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupDate: string;
  pickupTime: string;
  addressNotes?: string;
}

export interface OrderItem {
  id: string;
  productId?: string;
  productName: string;
  image?: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  pickupDate: string;
  pickupTime: string;
  addressNotes?: string | null;
  status: 'PENDING' | 'READY_FOR_PICKUP' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  size: string;
  color: string;
  sort: 'latest' | 'price-asc' | 'price-desc' | 'popularity';
  searchQuery: string;
}

export interface StoreDetails {
  name: string;
  address: string;
  subAddress: string;
  city: string;
  pinCode: string;
  landmark: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  googleMapsUrl: string;
}

export const STORE_INFO: StoreDetails = {
  name: "Fathima Collection",
  address: "Basement Floor, Falnir Road",
  subAddress: "Below Malabar Gold, Attavar",
  city: "Mangaluru",
  pinCode: "575001",
  landmark: "Below Malabar Gold Jewellery",
  phone: "+91 98450 12345",
  whatsapp: "919845012345",
  email: "contact@fathimacollection.com",
  openingHours: "Mon - Sat: 10:00 AM - 9:30 PM | Sun: 11:00 AM - 8:30 PM",
  googleMapsUrl: "https://maps.google.com/?q=Fathima+Collection+Falnir+Road+Mangaluru",
};
