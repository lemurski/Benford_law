import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart,Line, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';


export default function Homepage() {

    const [selectedFile, setSelectedFile] = useState();
    const [columns, setColumns] = useState([])
    const [selectedCol, setSelectedCol] = useState('')
    const [iscolselected, setiscolselected] = useState(false)
    const [showGraph,setshowGraph] = useState(false)
    const [isFileLoaded, setIsFileLoaded] = useState(false)
    const [ls,setList] = useState([{name: 'test', percentages: '[29.269169534179035, 18.20142776436752, 12.02300857685789, 9.485902110831493, 20.0067793128242, 7.036104976631914, 5.988392994710082, 5.351548456679164, 4.6376662729186995]', column:'pipek'}])


    const law = [30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6]
    const lab = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']

    const listItems = columns.map((column) => 
        <option>{column}</option>
    )

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        setiscolselected(false)
	};

    const logFile = () => {
        checkColumns()
    }

    const fetchData = () => {
        return axios.get('/api/graph')
        .then((response) =>{
            return response.data})
        .then(data =>
            {   
                let lst = []
                for (const key in data) {
                    lst.push(data[key]);
                }
                console.log(lst)
                setList(lst)
                setIsFileLoaded(true)
                })
    }

    const DrawChart = () => {

        const graph_data = JSON.parse(ls[0]['percentages'])

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

    const checkColumns = () => {
        const formData = new FormData()
        formData.append('file', selectedFile);
        formData.append('name', selectedFile.name);
              
        
       

        axios.post('/api/columns',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
            var dat = JSON.parse(response.data)
            setColumns(dat)
            setiscolselected(true)})
        
    
    }

    const handleColChange = (e) => {
        setSelectedCol(e.target.value)
    }

    const getFile = () => {
        document.getElementById("upfile").click();
        console.log('click')
    }

    
    const handleGraph = () => {
        showGraph ? (setshowGraph(false)): (setshowGraph(true))
    }

    const handleSubmission = () => {
        const formData = new FormData()
        formData.append('file', selectedFile);
        formData.append('name', selectedFile.name);
        formData.append('column', selectedCol)
                

        const requestOptions = {
            method: "POST",
            body: formData,
        };

        console.log(selectedFile.name)
        
        fetch('/api/upload',requestOptions).then((response) => {response.json}).then(() => {fetchData()}).then(() => {alert("File uploaded click the Show Graph button to see how your data fits with the Benford's law")});
        
    }

    const renderLogButton = () => {
        if (selectedFile && iscolselected == false && isFileLoaded == false) {
            return(
                <div>
                    <button className="bg-white text-blue-400 hover:scale-105 transition-all duration-300 border shadow-md border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white rounded-md px-4 py-3 mt-10" onClick={logFile}>Next</button>
                </div>
            )
        }
        else if (selectedFile && iscolselected == true && isFileLoaded == false) {
            return(
                <div className='flex items-center flex-col'>
                <select onChange={handleColChange} className="w-auto border border-blue-400 rounded-lg mt-10 mx-auto">
                    <option> Select the column that you want to check!</option>
                    {listItems}
                </select>
                <button className="bg-white text-blue-400 border shadow-md hover:scale-105 transition-all duration-300 border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white mt-10 rounded-md p-2" onClick={handleSubmission}>Submit</button>
                </div>
            )
        }
        else if ( isFileLoaded == true) {
            return(
            <div>
                <button onClick={handleGraph} className="bg-white text-blue-400 border shadow-md hover:scale-105 transition-all duration-300 border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white rounded-md mx-auto p-2 w-32 mt-28">{showGraph ? ('Close Graph'):('Show Graph')}</button>
            </div>
            )
        }
        
    }

    return(
        <div className="w-full min-h-screen p-28 flex flex-col bg-gray-100">
            <div className="mx-auto text-blue-400 font-semibold text-3xl ">
                Check if you data is compliant with Benford's Law
                
            </div>
            <a href="/list" className='px-3 py-2 mx-auto mt-10 bg-white border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white hover:scale-105 transition-all duration-300 rounded-lg'>See uploaded files!</a>        


            <div className='mx-auto flex flex-col items-center mt-14'>
            
			<input type="file" id='upfile' className='hidden' name="file" onChange={changeHandler} />
			{selectedFile ? ( 
                
				<div className='flex text-lg flex-col items-center'>
					<p className='mb-5'>Filename: {selectedFile.name}</p>
					<p className='mb-5'>Filetype: {selectedFile.type ? (selectedFile.type) : ('Could not detect file type')}</p>
					<p className='mb-5'>Size in bytes: {selectedFile.size}</p>
					<p className='mb-5'>
						Last Modified Date:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
                <div>
				<p className='text-2xl mb-8 text-gray-700'>Select a file to show details</p>
                <p className='text-md mb-8 text-gray-700'>Supports any flat file! (tsv, csv, dms, etc.)</p>
                </div>
			)}
            
                <label onClick={getFile} className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-400 border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white hover:scale-105 transition-all duration-300 rounded-lg shadow-lg tracking-wide uppercase border ">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">Select a file</span>
                </label>
            
            <div className='flex mt-10 flex-col'>
               
                {renderLogButton()}
			</div>

        
            
		</div>
            
        
        <div id='graph' className='flex w-full mt-10 transition-all justify-center items-center'>
            {showGraph ? (
                
                <DrawChart />
                
            ) : (<div></div>)}
            </div>

        </div>
        
    )


}