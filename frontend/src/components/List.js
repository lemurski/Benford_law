import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';




export default function List() {
    const [showGraph,setshowGraph] = useState(false)
    const [ls,setList] = useState([{name: "Benford'law", percentages: '[29.269169534179035, 18.20142776436752, 12.02300857685789, 9.485902110831493, 20.0067793128242, 7.036104976631914, 5.988392994710082, 5.351548456679164, 4.6376662729186995]', column:''}])
    const [selected,setSelected] = useState(ls[0]['name'])

    

    const law = [30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6]
    const lab = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']

    const handleSelected = (e) => {
        setSelected(e.target.value)
        console.log(e.target.value)
    }

    
    const listItems = ls.map((file) => 
        <option value={file['name']}>{file['name'] + ' - ' + file['column']}</option>
    )

    const DrawChart = () => {

        const graph_data = JSON.parse((ls.find(graph_data => graph_data.name === selected))['percentages'])

        var dat = graph_data.map((percentage,index) => {
            return {
                Data :percentage,
                Benford : law[index],
                labels : lab[index]

            }
        })

        return(
            <ResponsiveContainer width="80%" aspect={2}>
            <ComposedChart
              width={600}
              height={300}
              data={dat}
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="labels" />
              <YAxis domain={[0,35]} tickCount={8} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Data" fill="#3b82f6" />
              <Line dataKey="Benford" stroke='red' strokeWidth={3} />
            </ComposedChart>
            </ResponsiveContainer>
          
        )
    }

    const fetchData = () => {
        return axios.get('/api/list')
        .then((response) =>{
            return response.data})
        .then(data =>
            {   
                let lst = [{name: "Benford'law", percentages: '[29.269169534179035, 18.20142776436752, 12.02300857685789, 9.485902110831493, 20.0067793128242, 7.036104976631914, 5.988392994710082, 5.351548456679164, 4.6376662729186995]', column:''}]
                for (const key in data) {
                    lst.push(data[key]);
                }
                console.log(lst)
                setList(lst)
                return data[0]['percentages']})
    }

    const handleGraph = () => {
        showGraph ? (setshowGraph(false)): (setshowGraph(true),console.log(ls[0]['column']),console.log(ls))
    }

    useEffect(() =>{
        fetchData()
    },[])

    
    return(
        <div className="w-full min-h-screen py-16 px-28 flex flex-col bg-gray-200">
            <p className="mx-auto mb-16 text-blue-500 font-semibold text-4xl ">
                Select one of the uploaded files:
            </p>
            <div className='flex items-center justify-around mx-auto w-1/2'>
                <div className='text-xl text-blue-500'>
                    Select one of the uploaded files
                </div>
            <select onChange={handleSelected} className="w-80">
                {listItems}
            </select>
            </div>          
            
            <button onClick={handleGraph} className="bg-white text-blue-400 border shadow-md hover:scale-105 transition-all duration-300 border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white rounded-md mx-auto p-2 w-32 mt-28">{showGraph ? ('Close Graph'):('Show Graph')}</button>
            <div className='flex w-full transition-all justify-center items-center'>
            {showGraph ? (
                
                <DrawChart />
                
            ) : (<div></div>)}
            </div>
            <a href="/" className='px-3 py-2 mx-auto mt-10 bg-white border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white hover:scale-105 transition-all duration-300 rounded-lg'>Back to the Homepage</a>        
        </div>

    )

}