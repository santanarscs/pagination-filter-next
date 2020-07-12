import useSWR from "swr";
import api from "../services/api";

const fetcher = url => api.get(url).then(res => res)

function useProducts(search) {
  const { term, page, limit, categoryId } = search;

  const { data: response, error } = useSWR(categoryId ? `products?q=${term || ""}&category_id=${categoryId}&_page=${page || 1}&_limit=${limit || 5}` : `products?q=${term || ""}&_page=${page || 1}&_limit=${limit || 5}`, fetcher)

  return {
    products: response?.data,
    isLoading: !error && !response?.data,
    isError: error,
    totalCount: response?.headers['x-total-count'],
    totalPages: Math.ceil(response?.headers['x-total-count'] / 5)
  }
}
export default useProducts;
