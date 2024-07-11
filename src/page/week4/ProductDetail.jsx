import { useParams, Link, useSearchParams } from "react-router-dom";
import { MOCK_DATA } from "./MOCK_DATA.js";

const ProductDetail = () => {
  const { id } = useParams();
  let [searchParams] = useSearchParams();

  const product = MOCK_DATA.find((product) => product.id === parseInt(id));

  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto py-10">
      <Link
        to={`/week-4-time-attack?${searchParams.toString()}`}
        className="mb-4"
      >
        Go Back
      </Link>
      <h2 className="text-center py-4">{product.name}</h2>
      <div className="flex justify-center">
        <table className="table-auto border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="p-2 border border-gray-300">Price</td>
              <td className="p-2 border border-gray-300">{product.price}</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300">Category</td>
              <td className="p-2 border border-gray-300">{product.category}</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300">Rating</td>
              <td className="p-2 border border-gray-300">{product.rating}</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300">Release Date</td>
              <td className="p-2 border border-gray-300">
                {product.releaseDate}
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300">Stock</td>
              <td className="p-2 border border-gray-300">{product.stock}</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300">Manufacturer</td>
              <td className="p-2 border border-gray-300">
                {product.manufacturer}
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300">Reviews</td>
              <td className="p-2 border border-gray-300">{product.reviews}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
