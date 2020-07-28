


export const importFile = (dataType, fileData) => {
    let url;
    // let data = fileData.map(el => {
    //     return Object.values(el)
    // })
    let import_data = JSON.stringify(fileData)

debugger

    switch (dataType){
        case 'technician':
            url = `/api/import_technician_data`;
            break;
        case 'location':
            url = `/api/import_location_data`;
            break;
        case 'work-order':
            url = `/api/import_work_order_data`;
            break;
    }

    return $.ajax({
        url: url,
        method: "POST",
        data: {import_data}
    });
};