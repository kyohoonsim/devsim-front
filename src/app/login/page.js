"use client"

import { useRouter } from "next/navigation"

export default function login() {
    const router = useRouter();
    return (
        <>
        <div className="text-center">
            
            <form onSubmit={(e)=>{
                e.preventDefault();
                const username = e.target.id.value;
                const password = e.target.pwd.value;
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify({username, password})
                };
                fetch(process.env.NEXT_PUBLIC_API_URL + `login`, options)
                    .then(res=>res.json())
                    .then(result=>{
                        console.log(result);
                        if (result.status_code == 401){
                            alert(result.message);
                        } else if (result.status_code == 200){
                            alert("로그인에 성공하셨습니다.");
                            router.refresh();
                            router.push('/');
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
                        value="로그인"
                        className="hover:shadow-form rounded-md bg-pink-500 text-white py-2 px-3 text-center outline-none shadow">    
                    </input>
                </div>
            </form>
        </div>
        </>
    )
}
