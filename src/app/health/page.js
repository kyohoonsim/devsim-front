"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"
import { BloodForm } from "./BloodForm";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function health() {
    const router = useRouter();
    const [myArray, setMyArray] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async() => {
        if (loading) {
            return;
        }

        try {
            setLoading(true);

            const options = {
                method: 'GET',
                credentials: "include",
            }
            fetch(process.env.NEXT_PUBLIC_API_URL + `blood-pressure`, options)
            .then(res=>res.json())
            .then(result=>{
                if (result.status_code == 200){
                    const newArray = result.data.blood_pressure_list;

                    // setMyArray 함수를 사용하여 상태 업데이트
                    setMyArray(newArray);
                    router.refresh();
                }
            })
        }
        catch (error) {
            console.error(error);
        }
    } 
    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <>
        <BloodForm />
        <div style={{ display: myArray ? "block" : "none"}}>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                width={500}
                height={300}
                data={myArray}
                margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 10,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="created_at" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="high" stroke="#ec4899" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="low" stroke="#2563eb" activeDot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
        

        <ul className="list-inside list-disc my-8">
            {myArray.map((blood) => (
                <li>{blood.created_at} ({blood.location}): {blood.high}/{blood.low}</li>

            ))}
        </ul>
        </>
    )
}
