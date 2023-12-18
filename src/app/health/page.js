"use client"

import { BloodLineChart } from './BloodLineChart';
// import { cookies } from 'next/headers'
import React, { useEffect, useState } from 'react';


export default function Health() {
    const [ chartYn, setChartYn] = useState(false);
    // const cookieStore = cookies();
    const [ bloodPressureList, setBloodPressureList ] = useState([]);
    const [ high, setHigh ] = useState('');
    const [ low, setLow ] = useState('');
    const [ location, setLocation ] = useState('');

    
    const options = {
        method: 'GET',
        // headers: { 'Cookie': cookieStore },
        credentials: "include",
        next: { revalidate: 0 }
    }
    var blood_pressure_list;
    const fetchData = async () => {
        const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + `blood-pressure`, options)
        const resp_json = await resp.json();
        // console.log(resp_json);
        blood_pressure_list = resp_json.data.blood_pressure_list;
        // console.log(blood_pressure_list);
        var i;
        for (i=0; i<blood_pressure_list.length; i++){
            blood_pressure_list[i].created_at = new Date(blood_pressure_list[i].created_at).getTime()
        }
        setBloodPressureList(blood_pressure_list);
        setChartYn(true);
        // console.log(chartYn);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <div className="text-center">
            <form onSubmit={(e)=>{
                e.preventDefault();
                const high = e.target.high.value;
                const low = e.target.low.value;
                const location = e.target.location.value;
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify({high, low, location})
                };
                fetch(process.env.NEXT_PUBLIC_API_URL + `blood-pressure`, options)
                    .then(res=>res.json())
                    .then(result=>{
                        // console.log(result);
                        if (result.status_code == 401){
                            alert("로그인이 필요합니다.");
                        } else if (result.status_code == 200){
                            alert("혈압 입력에 성공하셨습니다.");
                            // router.refresh();
                            fetchData();
                            setHigh('');
                            setLow('');
                            setLocation('');
                        } else {
                            alert("혈압 입력에 실패했습니다.");
                        }
                        
                    })
            }

            }>
                <div className="my-2 flex flex-row justify-center">
                    <label for="inputHigh">
                        <div className="w-24 text-left">수축기 혈압</div>
                    </label>
                    <input 
                        type="text" 
                        name="high" 
                        id="inputHigh"
                        placeholder="수축기 혈압"
                        value={high}
                        onChange={e=>setHigh(e.target.value)}
                        className="rounded-md border border-dashed border-pink-500 w-32">
                    </input>
                </div>
                <div className="my-2 flex flex-row justify-center">
                    <label for="inputLow" className="w-24 text-left">
                        <div>
                            이완기 혈압
                        </div>
                    </label>
                    <input
                        type="text"
                        name="low"
                        id="inputLow"
                        placeholder="이완기 혈압"
                        value={low}
                        onChange={e=>setLow(e.target.value)}
                        className="rounded-md border border-dashed border-pink-500 w-32">
                    </input>
                </div>
                <div className="my-2 flex flex-row justify-center">
                    <label for="inputLocation" className="w-24 text-left">
                        <div>
                            장소
                        </div>
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="inputLocation"
                        placeholder="측정 장소"
                        value={location}
                        onChange={e=>setLocation(e.target.value)}
                        className="rounded-md border border-dashed border-pink-500 w-32">
                    </input>
                </div>
                <div className="my-8">
                    <input 
                        type="submit"
                        value="혈압 등록"
                        className="hover:shadow-form rounded-md bg-pink-500 text-white py-2 px-3 text-center outline-none shadow">    
                    </input>
                </div>
            </form>
        </div>

        <div style={{ display: chartYn ? "block" : "none"}}>
            <BloodLineChart 
                blood_pressure_list={bloodPressureList}
            />
            <div className="flex justify-center text-center my-8">
                <table className="table-auto border-collapse border border-slate-400">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 bg-pink-500 text-white p-2">
                                시간
                            </th>
                            <th className="border border-slate-300 bg-pink-500 text-white p-2">
                                장소
                            </th>
                            <th className="border border-slate-300 bg-pink-500 text-white p-2">
                                수축기혈압
                            </th>
                            <th className="border border-slate-300 bg-pink-500 text-white p-2">
                                이완기혈압
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bloodPressureList.map((blood) => (
                            <tr key={blood.created_at}>
                                <td className="border border-slate-300 p-2">
                                    {new Date(blood.created_at).toLocaleString()} 
                                </td>
                                <td className="border border-slate-300 p-2">
                                    {blood.location} 
                                </td>
                                <td className="border border-slate-300 p-2">
                                    {blood.high} 
                                </td>
                                <td className="border border-slate-300 p-2">
                                    {blood.low} 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
        
        
        </>
    )
}
