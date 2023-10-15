import React from 'react'
import { useState,useEffect } from 'react';
import "../../src/App.css";

const Tbody = () => {
  const [startD,setStartD]=useState(null);
  const [endD,setEndD]=useState(null);
  const [lc,setLc]=useState(null);
  const [exD,setExD]=useState([]);
  const [noD,SetNoD]=useState(null);
  const [tData,SetTData]=useState([]);

  const addRows =  ()=>{  
      if(noD && lc){
      let exdrr=(noD!==null)?lc/noD:null;
      SetTData([...tData,{startD,endD,exD,noD,lc,exdrr}]);
      }
      setExD([]);
  }; 

  useEffect(()=>{
    SetNoD(endD!=null?((new Date(endD).getTime()-new Date(startD).getTime()) / (1000 * 60 * 60 * 24))-1-exD.length:null);
  },[endD,startD,exD.length])
  return (
    <>
    <button onClick={addRows} className='bg-blue-700 text-white rounded-lg p-3 m1'>Save Data</button>
      <div className="relative overflow-x-auto">
        <table className="mx-auto mt-12 text-sm text-left text-white-500 dark:text-gray-400 border border-black-900" id='mainBody'>
          <thead className="text-sm text-white-900 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
              </th>
              <th scope="col" className="px-6 py-3">
                Dates Excluded
              </th>
              <th scope="col" className="px-6 py-3">
                Number Of Days
              </th>
              <th scope="col" className="px-6 py-3">
                Lead Count
              </th>
              <th scope="col" className="px-2 py-3">
                Expected DRR
              </th>
            </tr>
          </thead>
          <tbody className='ml-4'>
            <tr className="bg-gray-200 ml-8">
              <td  className="px-4 py-4 font-medium text-black-900 ml-4">
                <input type="date" id="SD" onChange={(e)=>{
                  setStartD(e.target.value.toLocaleString())
                }}/>
              </td>
              <td className="px-6 py-4">
              <input type="date" id="ED" disabled={startD===null?true:false} min={startD} onChange={(e)=>{
                  setEndD(e.target.value.toLocaleString())
                }}/>
              </td>
              <td className="px-6 py-4">
              <input type="date" id="ExD" disabled={startD===null || endD===null?true:false} min={startD} max={endD}onChange={(e)=>{if(!exD.includes(e.target.value.toLocaleString())&& startD!==e.target.value.toLocaleString()&& endD!==e.target.value.toLocaleString()){
                  setExD([...exD,e.target.value.toLocaleString()])}
                }}/>
              </td>
              <td className="px-6 py-4">
                {endD!=null?
                  ((new Date(endD).getTime()-new Date(startD).getTime()) / (1000 * 60 * 60 * 24))-1-exD.length:""
                }
              </td>
              <td className="px-6 py-4">
                <input type="number" id="LC" onChange={(e)=>{
                  setLc(e.target.value)
                }}/>
              </td>
              <td className="px-6 py-4">
                {lc/noD}
              </td>
            </tr>
          </tbody>
            {tData.length>=1 ?
            <tbody className='ml-4'>
             {tData.length>=1 && tData.map((item)=>{
              return(
              <tr className="bg-white ml-2">
                <td className="px-6 py-4">{item.startD}</td>
                <td className="px-6 py-4">{item.endD}</td>
                <td className="px-6 py-4">{item.exD}</td>
                <td className="px-6 py-4">{item.noD}</td>
                <td className="px-6 py-4">{item.lc}</td>
                <td className="px-6 py-4">{item.exdrr}</td>
              </tr> 
              )
            })}
            </tbody>:<></>}
        </table>
      </div>

    </>
  )
}

export default Tbody;