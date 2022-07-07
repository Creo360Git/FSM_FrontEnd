import React, {useState, useEffect} from 'react'
import SettingTab from "../components/Setting/SettingTab"
import { useDispatch } from "src/redux/Store"
import { changePageHeading } from "src/redux/Slices/Common"



const Settings = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(changePageHeading('Settings'))
    }, [dispatch])
    return(
        <SettingTab />
    )
}
export default Settings