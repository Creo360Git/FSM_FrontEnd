import React, {useState, useEffect} from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch(url)
        .then((data)=>{
            return data.json()
        })
        .then(res=>{
            setData(res.data)
        })
        .catch(err=>console.log(err))
    },[url])
    return [data]
}
export default useFetch

// const fetchUsers = (url) => {
//     fetch(url)
//         .then((data)=>{
//             return data.json()
//         })
//         .then(res=>{
//             console.log(res)
//             return (res.data)
//         })
//         .catch(err=>console.log(err))
// }
// export default fetchUsers