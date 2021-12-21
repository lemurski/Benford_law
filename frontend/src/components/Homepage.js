import React, { useState, useEffect } from 'react';

export default function Homepage() {

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [Name, setName] = useState('default');

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const handleSubmission = () => {
        const formData = new FormData()
        formData.append('file', selectedFile);
        console.log(selectedFile.name)
        setName(selectedFile.name)
        formData.append('name', selectedFile.name   );
        console.log(name)        

        const requestOptions = {
            method: "POST",
            body: formData,
          };
        
        fetch('/api/upload',requestOptions).then((response) => {console.log(response)})
        
    }

    return(
        <div className="w-full h-screen p-28 flex flex-col bg-blue-400">
            <div className="mx-auto text-white font-semibold text-3xl ">
                Check if you data is compliant with Benford's Law
            </div>

            <div className='mx-auto mt-36'>
            <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? ( 
                
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
                <button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
            </div>


        </div>
        
    )


}