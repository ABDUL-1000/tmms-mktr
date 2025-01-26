'use client'

import { getAllProducts, Product } from "@/lib/getAllProducts";
import { useEffect, useState } from "react";
interface ProductPageProps {
    product: Product[];
  }
  const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getAllProducts();
        console.log('productData', productData);
        if (Array.isArray(productData)) {
          setProducts(productData);
        } else {
          setError('Unexpected data format.');
        }
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!Array.isArray(products)) {
    return <p>Data is not in the expected format.</p>;
  }

  return (
    <div className="overflow-x-auto py-2">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Refinery</th>
            <th className="px-4 py-2">Amount (NGN)</th>
            <th className="px-4 py-2">Amount (USD)</th>
            <th className="px-4 py-2">Last Updated</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) =>{
            console.log(product);
            return(
            
            <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
            
              <td className="px-4 py-2">{product.name}</td>
              {/* <td className="px-4 py-2">{product.refinery.status}</td> */}
              <td className="px-4 py-2">{product.amountCostNGN}</td>
              <td className="px-4 py-2">{product.amountCostUSD}</td>
              {/* <td className="px-4 py-2">{product.updated_at}</td> */}
              <td className="px-4 py-2">{product.price}</td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;
