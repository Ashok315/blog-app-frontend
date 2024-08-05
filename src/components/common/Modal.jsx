import { useEffect, useRef, useState } from "react"
import { FaTimes } from "react-icons/fa"


export const Modal=({title,isVisible,closeModal,modalType="",children,width="max-w-lg"})=>{

    let modalBackdropRef=useRef();
    
    const handleClickOutside=(e)=>{
        if(modalBackdropRef.current===e.target&&modalType!=="static"){
            closeModal();
        }  
    }

    
    return (
        <>
           <style>
                {`${isVisible&&`body{
                                    overflow:hidden
                                }`
                    }
                
                `}
            </style>

           {isVisible&&
                <div ref={modalBackdropRef} onClick={handleClickOutside} className='modal-wrapper fixed inset-0 backdrop-brightness-[0.6] overflow-y-scroll z-[50] px-5]'>
                    <div className={`modal-content ${width}  bg-white mx-auto my-[5rem] rounded-[0.25rem] overflow-hidden shadow-xl`}>
                        <div className="modal-header flex justify-between items-center py-2 px-5 font-semibold text-white bg-lightPrimary">
                            <h1>{title}</h1>
                            <button onClick={closeModal} className='close-btn opacity-80 hover:opacity-100 duration-300' ><FaTimes className='text-lg'></FaTimes></button>
                        </div>
                        <div className="modal-body py-4 px-5">
                            {children}
                        </div>
                        <div className="modal-footer py-3 px-5 border-t border-gray-300 flex justify-end">
                            <button onClick={closeModal}  className='close-btn text-xs px-3.5 py-1.5 bg-red-500 opacity-90 hover:bg-red-600 duration-300 text-white rounded-[0.25rem]'>Close</button>
                        </div>
                    </div>
                </div>
           }
           
        </>
    )
}
