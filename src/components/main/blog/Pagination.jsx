export const Pagination=({
    postPerPage,
    totalPosts,
    currentPage,
    paginate
})=>{

    const totalPages=Array.from({length:Math.ceil(totalPosts/postPerPage)},(_,i)=>i+1);

    return(
        <>
            {totalPosts>0&& 
                <div className='text-center mt-10'>
                    <button onClick={()=>currentPage!==1&&paginate(currentPage-1)} className={`${currentPage==1?"cursor-default":"cursor-pointer hover:bg-gray-400 duration-200"} border border-slate-400 rounded-l-sm px-2 py-[0.2rem] text-sm`}>Prev</button>   
                            <ul className='inline-block'>
                                {totalPages?.map((pageNumber)=>
                                <li key={pageNumber.toString()} onClick={()=>paginate(pageNumber)} className={`${pageNumber==currentPage?"bg-primary text-white":'hover:bg-gray-400 duration-200'} inline-block cursor-pointer border border-slate-400 px-3 border-l-0  py-[0.2rem] text-sm`}>{pageNumber}</li>   
                                )}
                            </ul>
                    <button onClick={()=>currentPage<totalPages.length&& paginate(currentPage+1)} className={`${currentPage==totalPages.length?"cursor-default":"cursor-pointer hover:bg-gray-400 duration-200"} border border-l-0 border-slate-400 rounded-r-sm px-2 py-[0.2rem] text-sm`}>Next</button>
                 </div> 
             }
        </>
       
            
        
    )
}