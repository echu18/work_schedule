export const getWorkOrder = (workOrderId) => {
  return $.ajax({
    url: `/api/work_orders/${workOrderId}`,
    method: "GET",
    data: { workOrderId }
  });
};

export const allWorkOrders = () => {
  return $.ajax({
    url: `/api/work_orders`,
    method: "GET",
  });
};

export const createWorkOrder = (workOrderData) => {
  return $.ajax({
    url: `/api/work_orders`,
    method: "POST",
    data: { work_order: workOrderData },
  });
};


export const editWorkOrder = (workOrderId, workOrderData) => {
  return $.ajax({
    url: `/api/work_orders/${workOrderId}`,
    method: "PATCH",
    data: { work_order: workOrderData },
  });
};

export const deleteWorkOrder = (workOrderId) => {
  return $.ajax({
    url: `/api/work_orders/${workOrderId}`,
    method: "DELETE",
  });
};
