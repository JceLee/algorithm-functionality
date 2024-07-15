import { useState, useEffect } from "react";
import { MOCK_DATA } from "./MOCK_DATA.js";
import { Link, useSearchParams } from "react-router-dom";

const FilterSortTableAdvancedTimeAttack = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(MOCK_DATA);

  // QueryParams 로직 구현 - 1: 현재 쿼리 문자열에서 필터와 정렬 값을 가져오는 로직
  const getQueryParams = () => {
    return {
      category: searchParams.get("category") || "All",
      stock: searchParams.get("stock") || "All",
      manufacturer: searchParams.get("manufacturer") || "All",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      searchTerm: searchParams.get("searchTerm") || "",
      sortField: searchParams.get("sortField") || "name",
      sortOrder: searchParams.get("sortOrder") || "asc",
    };
  };

  // QueryParams 로직 구현 - 2: 현재 쿼리 문자열에서 필터와 정렬 값을 상태로 설정하는 로직
  const [filters, setFilters] = useState(getQueryParams);

  useEffect(() => {
    setFilters(getQueryParams());
  }, [searchParams]);

  // QueryParams 로직 구현 - 3: 쿼리 문자열을 업데이트하고 필터 상태를 갱신하는 로직
  const updateQueryParams = (newFilters) => {
    const updatedParams = {};
    for (const key in newFilters) {
      if (newFilters[key]) {
        updatedParams[key] = newFilters[key];
      }
    }
    setSearchParams(updatedParams);
    setFilters(newFilters);
  };

  // 필터 로직 구현
  const filterProducts = (products) => {
    return products.filter((product) => {
      if (filters.category !== "All" && product.category !== filters.category) {
        return false;
      }
      if (filters.stock !== "All" && product.stock !== filters.stock) {
        return false;
      }
      if (
        filters.manufacturer !== "All" &&
        product.manufacturer !== filters.manufacturer
      ) {
        return false;
      }
      if (filters.minPrice && product.price < parseFloat(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) {
        return false;
      }
      if (
        filters.searchTerm &&
        !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  };

  // 정렬 로직 구현
  const sortProducts = (products) => {
    return products.sort((a, b) => {
      const order = filters.sortOrder === "asc" ? 1 : -1;
      if (a[filters.sortField] < b[filters.sortField]) return -1 * order;
      if (a[filters.sortField] > b[filters.sortField]) return 1 * order;
      return 0;
    });
  };

  const filteredProducts = filterProducts(products);
  const sortedProducts = sortProducts(filteredProducts);

  const getSortIndicator = (field) => {
    if (filters.sortField === field) {
      return filters.sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="w-full text-center py-10">
        Week4 복잡한 제품 목록 필터 및 정렬
      </h2>
      <div className="flex gap-4 pb-4 justify-center">
        <select
          value={filters.category}
          onChange={(e) =>
            updateQueryParams({ ...filters, category: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </select>
        <select
          value={filters.stock}
          onChange={(e) =>
            updateQueryParams({ ...filters, stock: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="All">All Stock Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <select
          value={filters.manufacturer}
          onChange={(e) =>
            updateQueryParams({ ...filters, manufacturer: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="All">All Manufacturers</option>
          <option value="BrandA">BrandA</option>
          <option value="BrandB">BrandB</option>
          <option value="BrandC">BrandC</option>
          <option value="BrandD">BrandD</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) =>
            updateQueryParams({ ...filters, minPrice: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) =>
            updateQueryParams({ ...filters, maxPrice: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Search"
          value={filters.searchTerm}
          onChange={(e) =>
            updateQueryParams({ ...filters, searchTerm: e.target.value })
          }
          className="border p-2 rounded"
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="cursor-pointer p-2 border border-gray-300"
              onClick={() => {
                updateQueryParams({
                  ...filters,
                  sortField: "name",
                  sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
                });
              }}
            >
              Name {getSortIndicator("name")}
            </th>
            <th
              className="cursor-pointer p-2 border border-gray-300"
              onClick={() => {
                updateQueryParams({
                  ...filters,
                  sortField: "price",
                  sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
                });
              }}
            >
              Price {getSortIndicator("price")}
            </th>
            <th className="p-2 border border-gray-300">Category</th>
            <th
              className="cursor-pointer p-2 border border-gray-300"
              onClick={() => {
                updateQueryParams({
                  ...filters,
                  sortField: "rating",
                  sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
                });
              }}
            >
              Rating {getSortIndicator("rating")}
            </th>
            <th
              className="cursor-pointer p-2 border border-gray-300"
              onClick={() => {
                updateQueryParams({
                  ...filters,
                  sortField: "releaseDate",
                  sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
                });
              }}
            >
              Release Date {getSortIndicator("releaseDate")}
            </th>
            <th className="p-2 border border-gray-300">Stock</th>
            <th className="p-2 border border-gray-300">Manufacturer</th>
            <th
              className="cursor-pointer p-2 border border-gray-300"
              onClick={() => {
                updateQueryParams({
                  ...filters,
                  sortField: "reviews",
                  sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
                });
              }}
            >
              Reviews {getSortIndicator("reviews")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="p-2 border border-gray-300">
                <Link to={`/products/${product.id}?${searchParams.toString()}`}>
                  {product.name}
                </Link>
              </td>
              <td className="p-2 border border-gray-300">{product.price}</td>
              <td className="p-2 border border-gray-300">{product.category}</td>
              <td className="p-2 border border-gray-300">{product.rating}</td>
              <td className="p-2 border border-gray-300">
                {product.releaseDate}
              </td>
              <td className="p-2 border border-gray-300">{product.stock}</td>
              <td className="p-2 border border-gray-300">
                {product.manufacturer}
              </td>
              <td className="p-2 border border-gray-300">{product.reviews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilterSortTableAdvancedTimeAttack;
