"use client"

import { useRouter } from "next/navigation"

export function BloodForm() {
    const router = useRouter();
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
                        console.log(result);
                        if (result.status_code == 401){
                            alert("로그인이 필요합니다.");
                        } else if (result.status_code == 200){
                            alert("혈압 입력에 성공하셨습니다.");
                            router.refresh();
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
        </>
    )
}
