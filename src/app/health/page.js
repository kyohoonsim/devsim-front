import { BloodForm } from "./BloodForm";
import { BloodLineChart } from './BloodLineChart';
import { cookies } from 'next/headers'


export default async function Health() {
    var chartYn = false;
    const cookieStore = cookies();

    const options = {
        method: 'GET',
        headers: { 'Cookie': cookieStore },
        credentials: "include",
        next: { revalidate: 0 }
    }
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + `blood-pressure`, options)
    const resp_json = await resp.json();
    // console.log(resp_json);
    const blood_pressure_list = resp_json.data.blood_pressure_list;
    var i;
    for (i=0; i<blood_pressure_list.length; i++){
        blood_pressure_list[i].created_at = new Date(blood_pressure_list[i].created_at).getTime()
    }
    chartYn = true;
    
    return (
        <>
        <BloodForm />

        <div style={{ display: chartYn ? "block" : "none"}}>
            <BloodLineChart 
                blood_pressure_list={blood_pressure_list}
            />
        </div>
        

        <ul className="list-inside list-disc my-8">
            {blood_pressure_list.map((blood) => (
                <li key={blood.created_at}>
                    {new Date(blood.created_at).toLocaleString()} ({blood.location}): {blood.high}/{blood.low}
                </li>
            ))}
        </ul>
        </>
    )
}
