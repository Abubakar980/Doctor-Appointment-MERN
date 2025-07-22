import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'


export const AppContext = createContext();

export const AppContextProvider = (props) => {


    const currencySymbol = '$'
    const [doctors, setDoctors] = useState([])


    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(`http://localhost:3000/api/doctor/list`)
            if(data.success){
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    const value = {
        doctors,
        currencySymbol
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}