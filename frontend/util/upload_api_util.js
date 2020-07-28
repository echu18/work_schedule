


export const importFile = (dataType, fileData) => {
    let url;
    // let data = fileData.map(el => {
    //     return Object.values(el)
    // })
    let import_data = JSON.stringify(fileData)



    switch (dataType){
        case 'technician':
            url = `/api/import_technician_data`;
        case 'location':
            url = `/api/import_location_data`;
        case 'work-order':
            url = `/api/import_work_order_data`
    }

    return $.ajax({
        url: url,
        method: "POST",
        data: {import_data}
    });
};