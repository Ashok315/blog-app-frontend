import {useRef, useEffect} from "react"
import { FaTimes } from "react-icons/fa"


export const Modal=({title,isVisible,closeModal,modalType="",children,width="max-w-lg"})=>{

    const modalBackdropRef=useRef();
    
    const handleClickOutside=(e)=>{
        if(modalBackdropRef.current===e.target&&modalType!=="static"){
            closeModal();
        }  
    }

    useEffect(()=>{
        if(isVisible){
            document.body.style.overflow="hidden"  //hidden verticle scrollbar
        }
        else{
            document.body.style.overflow=""
        }
        return()=>{
            document.body.style.overflow="" // Cleanup on unmount
        }

    },[isVisible])
    
    return (
        <>
            {isVisible&&
                <div ref={modalBackdropRef} onClick={handleClickOutside} className='modal-wrapper fixed inset-0 backdrop-brightness-[0.4] overflow-y-scroll z-[90] px-4'>
                    <div className={`modal-content ${width} bg-white dark:bg-slate-700 mx-auto my-[5rem] rounded-[0.25rem] overflow-hidden shadow-xl`}>       
                       
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
