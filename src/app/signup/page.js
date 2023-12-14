"use client"

import { useRouter } from "next/navigation"

export default function signup() {
    const router = useRouter();
    return (
        <>
        <div className="text-center">
            <div className="my-10">
                회원가입을 하시면 dev-sim의 다양한 서비스를 이용하실 수 있습니다. 
            </div>
            
            <form onSubmit={(e)=>{
                e.preventDefault();
                const username = e.target.id.value;
                const password = e.target.pwd.value;
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password})
                };
                fetch(process.env.NEXT_PUBLIC_API_URL + `signup`, options)
                    .then(res=>res.json())
                    .then(result=>{
                        console.log(result);
                        if (result.status_code == 409){
                            alert("이미 존재하는 아이디입니다.");
                        } else if (result.status_code == 200){
                            alert("회원가입에 성공하셨습니다.");
                            router.refresh();
                            router.push('/login');
                        } else {
                            alert("회원가입에 실패했습니다.");
                        }
                        
                    })
            }

            }>
                <div className="my-2 flex flex-row justify-center">
                    <label for="inputId">
                        <div className="w-24 text-left">아이디</div>
                    </label>
                    <input 
                        type="text" 
                        name="id" 
                        id="inputId"
                        placeholder="유저네임"
                        className="rounded-md border border-dashed border-pink-500 w-32">
                    </input>
                </div>
                <div className="my-2 flex flex-row justify-center">
                    <label for="inputPwd" className="w-24 text-left">
                        <div>
                            비밀번호
                        </div>
                    </label>
                    <input
                        type="password"
                        name="pwd"
                        id="inputPwd"
                        placeholder="비밀번호"
                        className="rounded-md border border-dashed border-pink-500 w-32">
                    </input>
                </div>
                <div className="my-8">
                    <input 
                        type="submit"
                        value="회원가입"
                        className="hover:shadow-form rounded-md bg-pink-500 text-white py-2 px-3 text-center outline-none shadow">    
                    </input>
                </div>
            </form>
            <div className="my-10">
                <div className="font-bold">dev-sim 회원 혜택</div>
                <ul className="list-decimal list-inside">
                    <li>
                        혈압, 체중 관리 기능 이용 가능
                    </li>
                    <li>색칠공부 도안 생성 가능</li>
                </ul>
            </div>
        </div>
        </>
    )
}
