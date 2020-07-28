export const getTechnician = (technicianId) => {
  return $.ajax({
    url: `/api/technicians/${technicianId}`,
    method: "GET",
    data: { technicianId },
  });
};

export const allTechnicians = () => {
  return $.ajax({
    url: `/api/technicians`,
    method: "GET",
  });
};

export const createTechnician = (technicianData) => {
  return $.ajax({
    url: `/api/technicians`,
    method: "POST",
    data: { technician: technicianData },
  });
};


export const editTechnician = (technicianId, technicianData) => {
  return $.ajax({
    url: `/api/technicians/${technicianId}`,
    method: "PATCH",
    data: { technician: technicianData },
  });
};

export const deleteTechnician = (technicianId) => {
  return $.ajax({
    url: `/api/technicians/${technicianId}`,
    method: "DELETE",
  });
};
