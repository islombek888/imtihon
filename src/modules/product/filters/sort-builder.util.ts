
export function buildSort(sortBy?: string) {
  switch (sortBy) {
    case 'price_asc':
      return { price: 1, createdAt: -1 };
    case 'price_desc':
      return { price: -1, createdAt: -1 };
    case 'rating_desc':
      return { rating: -1, createdAt: -1 };
    case 'bestseller':
      return { salesCount: -1, createdAt: -1 };
    case 'newest':
    default:
      return { createdAt: -1 };
  }
}