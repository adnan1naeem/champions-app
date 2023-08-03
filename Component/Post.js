export const postUserData = async (data, endpoint) => {
    const Data = data;
    try {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: 
                Data, 
        };

        const response = await fetch("http://16.24.45.175:8000/resetPassword", config);
        console.log("Response status code:", response.status); // Log the status code
        console.log(response)
        const responseData = await response.json();
        console.log("Data posted successfully:", responseData);
        if(response?.status===200){
            return responseData;
        }
        else if(response.status!==200){
            alert(responseData?.message)
            return;
        }
    } catch (error) {
        console.error("Error posting data:", error.message);
        throw error;
    }
};
