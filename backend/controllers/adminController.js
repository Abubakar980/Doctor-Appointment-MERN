


// API FOR ADDING DOCTORS
export const addDoctor = async () => {
    try {
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body;
        const imageFile = req.file;

        console.log({name, email, password, speciality, degree, experience, about, fees, address}, imageFile);
        
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false, message:"Missing Details"})
        }


    } catch (error) {
        
    }
}