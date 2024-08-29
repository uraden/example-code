"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import SingleProduct from '@/components/SingleProduct';

const DetailBeveragePage:React.FC<{ params: { productId: string } }> = ({ params }) => {

  return (
    <div>
      <SingleProduct />
    </div>
  );
}

export default DetailBeveragePage;