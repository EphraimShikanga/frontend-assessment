import { config } from "@/lib/config";
import type { ProductsResponse, ProductsQueryParams, Product } from "@/types/product";

/**
 * Fetch a paginated slice of products from the DummyJSON API.
 *
 * When a `search` query is provided, uses the `/products/search` endpoint
 * which performs server-side case-insensitive title matching — critical for
 * large catalogues (50 000+) where client-side filtering is not viable.
 */
export async function fetchProducts({
  page,
  pageSize,
  search,
}: ProductsQueryParams): Promise<ProductsResponse> {
  const skip = (page - 1) * pageSize;

  const baseEndpoint = search
    ? config.api.endpoints.productsSearch
    : config.api.endpoints.products;

  const url = new URL(baseEndpoint);
  url.searchParams.set("limit", String(pageSize));
  url.searchParams.set("skip", String(skip));
  // Only request the fields we actually render — saves bandwidth on large sets.
  url.searchParams.set(
    "select",
    "id,title,description,price,discountPercentage,category,rating,stock,brand,thumbnail,images",
  );

  if (search) {
    url.searchParams.set("q", search);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch products (${response.status})`);
  }

  return response.json();
}

/**
 * Fetch a single product by ID for the detail modal.
 * Returns the full product object (all fields).
 */
export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${config.api.endpoints.products}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product (${response.status})`);
  }

  return response.json();
}
