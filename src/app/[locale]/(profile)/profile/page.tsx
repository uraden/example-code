"use client"
import React, {useState, useEffect} from 'react'
import { getSingleUser } from '../../cart/request'
import { useTranslations } from 'next-intl'
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAllDeliveryLocation } from "./delivery-location/request";


import { Badge, Descriptions, Divider, Skeleton } from 'antd';
import type { DescriptionsProps } from 'antd';

export default function ProfilePage() {
  const t = useTranslations('Profile')

  const [user, setUser] = useState<any>(null)
  const [deliveryLocations, setDeliveryLocations] = useState<any>(null)

  const router = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      
      try {
        const response = await getSingleUser()
        if(response.status === 200) {
          setUser(response.data)
        } else {
          router.push(`${response.data.redirect}`);
        }
      } catch (error) {
        router.push(`/server-error`);
        toast.error("Error occurred.", {
          position: "top-right",
          duration: 3500,
        });
        console.log(error);
      }
    }

    const getAllDeliveryLocations = async () => {
      try {
        const response = await getAllDeliveryLocation();
        if (response.status === 200) {
          setDeliveryLocations(response.data);
        } else {
          // router.push(`${response.data.redirect}`);
        }
      } catch (error) {
        router.push(`/server-error`);
        toast.error("Error occurred.", {
          position: "top-right",
          duration: 3500,
        });
        console.log(error);
      }
    };
    
    getAllDeliveryLocations();

    fetchUser()
  }, [])



  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: t('name'),
      children: user?.user?.name,
    },
    {
      key: '2',
      label: t('phone'),
      children: `(+998) ${user?.user?.phone}`,
      span: 2,
    },
    {
      key: '3',
      label: t('email'),
      children: `${user?.user?.email}`,
    },
    {
      key: '4',
      label: t('status'),
      children: user?.user?.isVerified ? <Badge status="success" text={t('verified')} /> : <Badge status="default" text={t('notVerified')} />,
      span: 2,
    },
  
    {
      key: '5',
      label: t("address"),
      children: (
        <>
          <div>
            {deliveryLocations?.map((item: any) => (
              <div key={item.id}>
                <div>{item?.title}, {""} {item?.street} {''}  
                  <br />
                 {item?.city}, {''} {item?.country}
               
                </div>
                <Divider />
              </div>
              
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      
     <div className='block antialiased tracking-normal mb-4 font-sans text-2xl font-semibold leading-[1.3] text-blue-gray-900 choose-category'>
      {t('personalInfo')}
    </div>  

      {user ? <Descriptions bordered items={items} /> : <Skeleton active />}
    
    </div>
  )
}
