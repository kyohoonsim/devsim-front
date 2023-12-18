"use client"

import React, { useEffect, useState } from 'react';
import { LineChart, Line, ReferenceArea, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export function BloodLineChart(props) {
    const data = props.blood_pressure_list;

    return (
        <>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
            }}
            
            >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis 
                dataKey="created_at" 
                type="number" 
                scale="time" 
                domain={['auto', 'auto']} 
                tickFormatter={(value) => new Date(value).toLocaleString()}
            />
            <YAxis domain={[40, 200]}/>
            <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleString()}
            />
            <Legend />
            <Line type="monotone" dataKey="high" stroke="#ec4899" strokeWidth={3} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="low" stroke="#2563eb" strokeWidth={3} activeDot={{ r: 4 }} />
            <ReferenceArea 
                y1={160}
                y2={200}
                fillOpacity={0}
                label={{ position: 'insideBottomLeft', value: '중등도이상 고혈압(수축기)', fill: 'black', fillOpacity: '0.4' }} 
            />
            <ReferenceArea 
                y1={140}
                y2={159}
                fillOpacity={0}
                label={{ position: 'insideBottomLeft', value: '경도 고혈압(수축기)', fill: 'black', fillOpacity: '0.4' }} 
            />
            <ReferenceArea 
                y1={120}
                y2={139}
                fillOpacity={0}
                label={{ position: 'insideBottomLeft', value: '고혈압 전단계(수축기)', fill: 'black', fillOpacity: '0.4' }} 
            />
            <ReferenceArea 
                y1={100}
                y2={120}
                fill="green"
                fillOpacity={0.3}
                label={{ position: 'insideBottomLeft', value: '정상(수축기)', fill: 'black', fillOpacity: '0.4' }} 
            />
            <ReferenceArea 
                y1={100}
                y2={120}
                fillOpacity={0}
                label={{ position: 'insideBottomRight', value: '중등도이상 고혈압(이완기)', fill: 'black', fillOpacity: '0.4' }} 
            />
            <ReferenceArea 
                y1={90}
                y2={99}
                fillOpacity={0}
                label={{ position: 'insideBottomRight', value: '경도 고혈압(이완기)', fill: 'black', fillOpacity: '0.4' }} 
            />
            <ReferenceArea 
                y1={80}
                y2={89}
                fillOpacity={0}
                label={{ position: 'insideBottomRight', value: '고혈압 전단계(이완기)', fill: 'black', fillOpacity: '0.4' }} 
            />
            <ReferenceArea 
                y1={60}
                y2={80}
                fill="green"
                fillOpacity={0.3}
                label={{ position: 'insideBottomRight', value: '정상(이완기)', fill: 'black', fillOpacity: '0.4' }} 
            />
            </LineChart>
        </ResponsiveContainer>
        </>
    )
}