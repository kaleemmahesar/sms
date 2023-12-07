import Image from 'react-bootstrap/Image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
// import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsArrowUpCircleFill } from 'react-icons/bs'

const DropzoneUpload = ({ className, getImageUrl, handleLoader, currentImageUrl, editForm }) => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  console.log(currentImageUrl)

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
      
    }
    
    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!files?.length) return
    handleLoader(true)
    const preset_key = "react-pakwheels"
    const cloud_name = "dbrgkbhcm"
    const formData = new FormData()
    formData.append('cloud_name', 'dbrgkbhcm')
    formData.append('upload_preset', preset_key)
    files.forEach(file => formData.append('file', file))
    const data = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
    getImageUrl(data.secure_url)
    handleLoader(false)
    console.log('worked')
  }

  return (
      <>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <BsArrowUpCircleFill className='w-5 h-5 fill-current' />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        {/* <div className='flex gap-4'>
          <h2 className='title text-3xl font-semibold'>Preview</h2>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
          >
            Remove all files
          </button>
          
        </div> */}

        {/* Accepted files */}
        {/* <h3 className='title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3'>
          Accepted Files
        </h3> */}
        <ul className='mt-6 p-0 mb-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {
            editForm ? 
            <li className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={currentImageUrl}
                width={100}
                height={100}
                className='h-full w-full object-contain rounded-md'
              /> 
            </li>
          : null }
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full object-contain rounded-md'
              />
              <button
                type='button'
                className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                onClick={() => removeFile(file.name)}
              >
                <AiFillCloseCircle className='w-5 h-5 fill-black hover:fill-secondary-400 transition-colors' />
              </button>
              {/* <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                {file.name}
              </p> */}
            </li>
          ))}
        </ul>
        <button
            type='button'
            onClick={handleUpload}
            className='ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors'>
            Upload to Cloudinary
          </button>
        {/* Rejected Files */}
        {/* <h3 className='title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3'>
          Rejected Files
        </h3> */}
        {/* <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between'>
              <div>
                <p className='mt-2 text-neutral-500 text-sm font-medium'>
                  {file.name}
                </p>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul> */}
        
      </section>
    </>
  )
}

export default DropzoneUpload