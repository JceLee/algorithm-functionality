import { useState } from "react";
import { MOCK_DATA } from "./MOCK_DATA.js";

/*

필터링 기능:

카테고리: 'All', 'Electronics', 'Accessories' 중 선택하여 제품을 필터링할 수 있습니다.
재고 상태: 'All', 'In Stock', 'Out of Stock' 중 선택하여 제품을 필터링할 수 있습니다.
제조사: 'All', 'BrandA', 'BrandB', 'BrandC', 'BrandD' 중 선택하여 제품을 필터링할 수 있습니다.
가격 범위: 최소 가격과 최대 가격을 입력하여 해당 범위 내의 제품을 필터링할 수 있습니다.
검색어: 제품 이름을 입력하여 해당 이름을 포함하는 제품을 필터링할 수 있습니다.

정렬 기능:

정렬 가능 항목: Name, Price, Rating, Release Date, Review 항목을 기준으로 정렬할 수 있어야 합니다.
정렬 방향: 각 항목을 클릭할 때마다 오름차순(▲)과 내림차순(▼) 정렬이 변경되도록 합니다.
정렬 가능한 항목들은 커서 포인터로 표시하며, 현재 정렬 상태를 나타내는 기호(▲/▼)를 추가합니다.

*/

const FilterSortTableAdvanced = () => {
  const [products, setProducts] = useState(MOCK_DATA);
  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All");
  const [manufacturer, setManufacturer] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const filterProducts = (products) => {
    return products;
  };

  const sortProducts = (products) => {
    if (!sortField) return products;
    return products;
  };

  const filteredProducts = filterProducts(products);
  const sortedProducts = sortProducts(filteredProducts);

  const getSortIndicator = (field) => {
    if (sortField === field) {
      return sortOrder === "asc" ? "▲" : "▼";
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </select>
        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Stock Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <select
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
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
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="cursor-pointer p-2 border border-gray-300"
              onClick={() => {
                setSortField("name");
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Name {getSortIndicator("name")}
            </th>
            <th
              className="cursor-pointer p-2 border border-gray-300"
              onClick={() => {
                setSortField("price");
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Price {getSortIndicator("price")}
            </th>
            <th className="p-2 border border-gray-300">Category</th>
            <th
              className="cursor-pointer p-2 border border-gray-300"
              onClick={() => {
                setSortField("rating");
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Rating {getSortIndicator("rating")}
            </th>
            <th
              className="cursor-pointer p-2 border border-gray-300"
              onClick={() => {
                setSortField("releaseDate");
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Release Date {getSortIndicator("releaseDate")}
            </th>
            <th className="p-2 border border-gray-300">Stock</th>
            <th className="p-2 border border-gray-300">Manufacturer</th>
            <th
              className="cursor-pointer p-2 border border-gray-300"
              onClick={() => {
                setSortField("reviews");
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Reviews {getSortIndicator("reviews")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="p-2 border border-gray-300">{product.name}</td>
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

export default FilterSortTableAdvanced;
