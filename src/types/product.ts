/** A single product from the DummyJSON API. */
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

/** Paginated response wrapper from DummyJSON. */
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/** Parameters accepted by the products fetch function. */
export interface ProductsQueryParams {
  page: number;
  pageSize: number;
  /** Optional search query — uses DummyJSON `/products/search` endpoint. */
  search?: string;
}
