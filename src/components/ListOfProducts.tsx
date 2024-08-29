import React, {useState, useEffect} from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../reduxStore/feature/cartSlice";
import ProductNotFound from "./ProductNotFound";
import {useTranslations} from 'next-intl';
import { addProductToOrder } from "../app/[locale]/request";
import { getUserOrders, isLoggedIn } from "../app/[locale]/(profile)/profile/orders/request";
import { toast } from "sonner";

type Products = {
  _id: string;
  name: string;
  price: number;
  category: string;
  extraInfo: string;
  imageUrl: string;
  files: string[];
  imageAlt: string;
  unitOfMeasure: string;
  id: string;
}[];

const ListOfProducts: React.FC<{ products?: Products }> = ({
  products = [],
}) => {
  const [orderId, setOrderId] = useState('');
  const [itemInOrder, setItemInOrder] = useState([]);
  const t = useTranslations('Products');
  const funcT = useTranslations('Functions');
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoggedInAndIfOrderExists = async () => {
      const response = await isLoggedIn();

      if(response.data.isLoggedIn){
        const response = await getUserOrders();
        if(response.data.orders.length) {
          setOrderId(response.data.orders[0]._id);
          setItemInOrder(response.data.orders[0].orderItems);
        }
      }
    }

    checkLoggedInAndIfOrderExists();
  }, []);


  const addItemToOrderAndCart = async (product: any) => {
    const { _id: productId, quantity: amount, price, files, name } = product;
    if(itemInOrder.length){
     
      const productExist = itemInOrder.find((item: any) => item.product === productId);
    
      if(productExist){
        toast.info(funcT('productAlreadyInYourSubscriptionOrder'),  {
          position: "top-right",
          duration: 2000,
        });
        return;
      }
      try {
        const response = await addProductToOrder({
          productId,
          amount,
          price,
          files,
          name,
          id: orderId,
        });
        
       if(response.status === 200){
        toast.success(funcT('prodcutAddedToSubscription'),  {
          position: "top-right",
          duration: 2000,
        });
       } else if(response.status === 400){
        toast.info(funcT('productAlreadyInYourSubscriptionOrder'),  {
          position: "top-right",
          duration: 2000,
        });
       }

      } catch (error: any) {
        console.log(error);
    }
  } else {
    dispatch(addItemToCart(product as any));
  }
}

  return (
    <div>
      {products.length === 0 ? (
        <ProductNotFound />
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.map((product, index) => (
            <div key={index} className="mb-8">
              <Link
                href={`/${product.category}/${product._id}`}
                className="group"
              >
                <div
                  style={{ height: 350 }}
                  className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 shadow-xl"
                >
                  <img
                    src={product.files[0]}
                    alt={product.imageAlt}
                    className="hover:scale-105 transition duration-500 h-full w-full object-cover object-center group-hover:opacity-75"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 h-10">{t(product.name)}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {" "}
                  <span className="font-bold"> UZS </span>
                  {product.price.toLocaleString()}
                </p>
              </Link>
  
              <div key={`${product.id}-unit`} className="text-gray-500 text-sm">
                {product?.unitOfMeasure} {t(product.extraInfo[0])}
              </div>
          
              <button
                className="mt-4 block w-full bg-gray-100 border rounded-md py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
                // onClick={() => dispatch(addItemToCart(product as any))}
                onClick={() => addItemToOrderAndCart(product)}
              >
                {itemInOrder.length ? funcT('addToSubsc') : funcT('addToCart')} 
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default ListOfProducts;

