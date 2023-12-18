"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';


export default function Coloring() {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState("/example2.png");
    const [uploadCheck, setUploadCheck] = useState(false);
    const [isLoading, setLoading] = useState(false);

    return (
        <>
        <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px]">

                <div style={{ display: uploadCheck ? "block" : "none" }}>
                <div className="my-4">생성된 도안에 만족하시나요? :D</div>
                <Link className="hover:shadow-form rounded-md bg-pink-500 text-white py-3 px-8 text-center text-base font-semibold outline-none shadow" href="/feedback">피드백 남기러 가기</Link>
                </div>
                <div className="flex justify-center my-8">
                    <img
                        src={imageUrl}
                        width="100%"
                        alt="처리된 이미지" 
                    />
                </div>
                

            <div className="flex flex-col min-h-[200px] items-center justify-center rounded-md border border-dashed border-pink-500 p-12 text-center">
                
                
                
                <h1 className="text-sm m-4">방법1. AI로 색칠공부 도안 랜덤 생성</h1>
                <p className="text-xs mb-4">경우에 따라서 20초 이상 소요될 수 있습니다.</p>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    console.log("생성 버튼 클릭!!");
                    setLoading(true);
                    const options = {
                    method: 'POST',
                    credentials: "include",
                }
                fetch(process.env.NEXT_PUBLIC_API_URL + `v1/coloring/generated-img`, options)
                    .then(res=>res.json())
                    .then(result=>{
                        console.log(result);
                        if (result.status_code == 200){
                            console.log("이미지 생성 성공");
                            setLoading(false);
                            const img_uri = result.data.img_uri.split("/")
                            let temp = 'https://' + img_uri[0] + '.s3.ap-northeast-2.amazonaws.com/' + img_uri[1]
                            setImageUrl(temp);
                            setUploadCheck((prevUploadCheck) => !prevUploadCheck)
                            console.log(temp);
                            router.refresh();
                        } else if (result.status_code == 401) {
                            alert("로그인을 먼저 해주세요.");
                        }
                    })
                }}>
                <div>
                    <button
                        type="submit"
                        className="hover:shadow-form w-full rounded-md bg-pink-500 text-white py-3 px-8 text-center text-base font-semibold outline-none shadow"
                    >
                    생성
                    </button>
                </div>
                <div style={{display: isLoading ? "block" : "none"}}>
                    <Image src="/Spinner-1s-200px.gif" width={100} height={100} alt="로딩중" />
                </div>
                </form>
            
            </div>


            <div className="flex flex-col min-h-[200px] items-center justify-center rounded-md border border-dashed border-pink-500 p-12 text-center mt-4">
                <h1 className="text-sm">방법2. 업로드한 이미지로 색칠공부 도안 생성</h1>
            
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    const myimage = e.target.myimage.files[0];
                    const formData = new FormData();
                    formData.append('file', myimage);

                    const options = {
                        method: 'POST',
                        credentials: "include",
                        body: formData
                    }
                    fetch(process.env.NEXT_PUBLIC_API_URL + `v1/coloring/uploadfile`, options)
                        .then(res=>res.json())
                        .then(result=>{
                            console.log(result);
                            if (result.status_code == 200){
                                console.log("이미지 업로드 성공");
                                const img_uri = result.data.img_uri.split("/")
                                let temp = 'https://' + img_uri[0] + '.s3.ap-northeast-2.amazonaws.com/' + img_uri[1]
                                setImageUrl(temp);
                                setUploadCheck((prevUploadCheck) => !prevUploadCheck)
                                console.log(temp);
                                router.refresh();
                            } else if (result.status_code == 401) {
                                alert("로그인을 먼저 해주세요.");
                            }
                        })
                }} encType="multipart/form-data">
            <div class="mb-2 pt-4">
                <div>
                <input
                    type="file" id="myimage" name="myimage" accept="image/png, image/jpeg"
                />
                <label htmlFor="myimage"></label>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="hover:shadow-form rounded-md bg-pink-500 text-white py-3 px-8 text-center text-base font-semibold outline-none shadow"
                >
                제출
                </button>
            </div>

                </form>

                </div>

                
                
            </div>
        </div>

        
        </>
    )
}