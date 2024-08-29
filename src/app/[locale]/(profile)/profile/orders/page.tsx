"use client";
import React, { useState, useEffect } from "react";
import { getUserOrders, updateProductAmount } from "./request";
import moment from "moment";
import { QuestionCircleOutlined, EditOutlined } from "@ant-design/icons";
import {
  Tag,
  Button,
  Dropdown,
  Space,
  Modal,
  Avatar,
  Card,
  Popconfirm,
  Input,
} from "antd";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  updateOrderStatus,
  updateItemStatusFromOrder,
  // addNextDeliveryDate,
} from "./request";
import { IoMdRemove, IoMdAdd, IoMdCreate } from "react-icons/io";
import { useTranslations } from "next-intl";
import { Timeline } from "antd";

const { Meta } = Card;

export default function OrderPage() {
  const [orders, setOrders] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [productQuantity, setProductQuantity] = useState();

  const { Search } = Input;

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders();
      if (response.status === 200) {
        setOrders(response?.data?.orders);
      } else {
        router.push('/login')
        
      }
    } catch (error: any) {
      router.push("/login");
      toast.error("Error occurred.", {
        position: "top-right",
        duration: 3500,
      });
      return error;
    }
  };

  // const getNextDeliveryDateFunc = async () => {
  //   await addNextDeliveryDate({});
  //   fetchOrders();
  // };

  const handleEditClick = (order: any) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const t = useTranslations("Products");
  const orderT = useTranslations("Orders");

  const handleModalClose = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const router = useRouter();

  const handleUpdateOrderStatus = async ({
    id,
    orderStatus,
  }: {
    id: string;
    orderStatus: string;
  }) => {
    try {
      const response = await updateOrderStatus({ id, orderStatus });
      if (response.status === 200) {
        setOrders(response?.data?.orders);
        toast.success(orderT("subscriptionStatusUpdaedSuccessfully"), {
          position: "top-right",
          duration: 3500,
        });
      }
    } catch (error: any) {
      toast.error(orderT("errorOccurred"), {
        position: "top-right",
        duration: 3500,
      });
      return error;
    }
  };

  const addRemoveItemFromOrder = async ({
    id,
    productId,
  }: {
    id: string;
    productId: string;
  }) => {
    try {
      const response = await updateItemStatusFromOrder({ id, productId });
      if (response.status === 200) {
        toast.success(orderT("productStatusChanged"), {
          position: "top-right",
          duration: 2000,
        });
      }

      fetchOrders();
    } catch (error: any) {
      toast.error("Error occurred.", {
        position: "top-right",
        duration: 2000,
      });
      return error;
    }
  };

  useEffect(() => {
    fetchOrders();
    // getNextDeliveryDateFunc();
  }, []);

  const todayDate = new Date();

  const handleChangeProductQuantity = (index: any) => {
    setSelectedItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleInputChange = (e: any) => {
    setProductQuantity(e.target.value); // Update edited value when input changes
  };

  const handleSaveProductQuantity = async (orderId : any, productId : any, amount: any) => {
    try {
      const response = await updateProductAmount({ id: orderId, productId, amount });
      if (response.status === 200) {
        toast.success(orderT("productQuantityChanged"), {
          position: "top-right",
          duration: 2000,
        });
      }
      setProductQuantity(amount)
      setSelectedItemIndex(null);
      fetchOrders();
    } catch (error: any) {
      toast.error("Error occurred.", {
        position: "top-right",
        duration: 2000,
      });
      return error;
    }
  }

  
  const handleSearch = (e: any) => {
    const searchInput = e.target.value.toLowerCase();
  
   const filteredProducts = selectedOrder?.orderItems.filter((item: any)=>{
    return t(item.name).toLowerCase().includes(searchInput);
   })

    setSelectedOrder((prev: any) => {
      return {
        ...prev,
        orderItems: filteredProducts,
      };
    });

    if(searchInput === ""){
      setSelectedOrder((prev: any) => {
        return {
          ...prev,
          orderItems: orders[0]?.orderItems,
        };
      });
    }

  }


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{orderT("orders")}</h1>

      
      {orders.length === 0 ? (
        <div>
          <h2 className="text-gray-600 ">{orderT("noOrders")}</h2>
        </div>
        
        ) : (<> 
       {orders?.map((order: any) => (
        <div
          key={order._id}
          className="w-full flex flex-wrap justify-between rounded-lg border border-gray-300 shadow-md mb-5 items-center py-4 px-4 text-sm leading-tight"
        >
          <Tag
            className="max-sm:mb-5"
            color={
              order.orderStatus == "Pending"
                ? "#facc15"
                : order.orderStatus == "Delivered"
                ? "#15803d"
                : order.orderStatus == "Subscribe"
                ? "#15803d"
                : order.orderStatus == "Postponed"
                ? "#f5760e"
                : order.orderStatus == "Processing"
                ? "#0ea5e9"
                : "#b91c1c"
            }
          >
            {orderT(order.orderStatus)}
          </Tag>

          <p className="text-gray-600 max-sm:mb-5">
            {moment(Number(order.orderDate)).format("YYYY-MM-DD")}
          </p>

          <p className="font-bold w-full flex justify-center max-sm:mx-auto max-sm:mb-5 sm:w-auto">
            {/* {Number(totalAmount).toLocaleString()} UZS */}
            {(order?.totalAmount.replace(/\B(?=(\d{3})+(?!\d))/g, "'"))} UZS
          </p>
          <Dropdown
            className="max-sm:mb-5"
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <Space>
                      <Button
                        className="w-32"
                        disabled={
                          order.orderStatus !== "Delivered" &&
                          order.orderStatus !== "Subscribe" &&
                          order.orderStatus !== "Pending"
                        }
                        onClick={() =>
                          handleUpdateOrderStatus({
                            id: order._id,
                            orderStatus: "Cancel",
                          })
                        }
                      >
                        {orderT("cancel")}
                      </Button>
                    </Space>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <Space>
                      <Button
                        className="w-32"
                        disabled={order.orderStatus !== "Cancel"}
                        onClick={() =>
                          handleUpdateOrderStatus({
                            id: order._id,
                            orderStatus: "Subscribe",
                          })
                        }
                      >
                        {orderT("subscribe")}
                      </Button>
                    </Space>
                  ),
                },
              ],
            }}
            placement="bottom"
          >
            <Button className="w-full sm:w-auto">
              {orderT("changeStatus")}
            </Button>
          </Dropdown>
          <EditOutlined
            onClick={() => handleEditClick(order)}
            style={{ fontSize: "20px" }}
            className="hover:text-gray-500 cursor-pointer max-sm:mb-5 max-sm:mx-auto"
          />
          {modalOpen && selectedOrder && (
            <Modal
              title={
                <p style={{ fontSize: "24px" }}>{orderT("orderDetails")}</p>
              }
              centered
              open={modalOpen}
              onOk={handleModalClose}
              onCancel={handleModalClose}
              okButtonProps={{ style: { backgroundColor: "green" } }}
              width={900}
              footer={false}
            >
              <div>
              <Search 
                placeholder={orderT("searchProducts")} 
                onChange={handleSearch}
                />

                {selectedOrder?.orderItems?.map((item: any) => (
                  <div key={item?._id}>
                    <Card
                      title={t(item?.name)}
                      style={{
                        // width: 320,
                        marginTop: 16,
                        backgroundColor: item?.cancelledFromOrder
                          ? "#f0f0f0"
                          : "white",
                      }}
                      extra={
                        <div style={{ cursor: "pointer" }}>
                         
                         {!item?.cancelledFromOrder  && <IoMdCreate 
                            onClick={() =>
                              handleChangeProductQuantity(item._id)
                            }
                            style={{ fontSize: "20px" }}
                            />}
                            
                         

                          <Popconfirm
                            title={
                              item.cancelledFromOrder
                                ? orderT("sureAddOrder")
                                : orderT("sureDeleteOrder")
                            }
                            onConfirm={() =>
                              addRemoveItemFromOrder({
                                id: selectedOrder._id,
                                productId: item.product,
                              })
                            }
                            icon={
                              <QuestionCircleOutlined
                                style={{ color: "black" }}
                              />
                            }
                            okType="default"
                            okText={orderT("yes")}
                            cancelText={orderT("no")}
                          >
                            {item?.cancelledFromOrder ? (
                              <IoMdAdd
                                style={{ color: "green", fontSize: "25px" }}
                              />
                            ) : (
                              <IoMdRemove
                                style={{ color: "red", fontSize: "25px" }}
                              />
                            )}
                          </Popconfirm>
                        </div>
                      }
                    >
                      <Meta
                        avatar={
                          <Avatar
                            src={item.files[0]}
                            style={{ boxShadow: "0 0 0 2px #f0f0f0" }}
                          />
                        }
                        description={
                          <div style={{ fontWeight: 500 }}>
                            {orderT("price")}:{" "}
                            <span style={{ color: "black" }}>
                              UZS {item.price}
                            </span>
                            <span>
                              <br />
                              {orderT("quantity")}:{" "}
                              {selectedItemIndex === item._id ? (
                                <Input
                                  type="number"
                                  defaultValue={item.amount}
                                  style={{ width: "70px", textAlign: "center" }}
                                  onChange={handleInputChange}
                                  min={1}
                                />
                              ) : (
                                <span>{item.amount}</span>
                              )}
                            </span>
                          </div>
                        }
                      />
                    </Card>
                    {selectedItemIndex === item._id && (
                      <Button style={{width: '100%'}} 
                      onClick={() => handleSaveProductQuantity(selectedOrder._id, item.product, productQuantity)}
                      className=""
                      >
                        {orderT("save")}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Modal>
          )}
        </div>
      ))}
      <Timeline mode="left">
        {orders[0]?.listDeliveryDates.map((order: any, index: any) => (
          <Timeline.Item
            key={index}
            color={
              orders[0]?.orderStatus === "Cancel"
                ? "red"
                : new Date(order) > todayDate
                ? "grey"
                : "green"
            }
          >
            {moment(order).format("DD-MM-YYYY")} -{" "}
            {orders[0]?.orderStatus === "Cancel"
              ? orderT("cancelled")
              : new Date(order) > todayDate
              ? orderT("pending")
              : orderT("delivered")}
          </Timeline.Item>
        ))}
      </Timeline>
      </>) }
      
     
    </div>
  );
}
