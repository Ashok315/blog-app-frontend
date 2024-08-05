import { BlogForm, ContentContainer, MainContainer } from "../../components"

export const AddBlog=()=>{
    return(
        <div className='mt-auto'>
            <MainContainer>
                <ContentContainer>  
                    <div className="max-w-[40rem] mx-auto py-8 px-5 md:px-14 shadow-2xl bg-white rounded-md">
                        <h1 className='text-xl font-semibold text-center mb-6'>Add Blog</h1>
                        <BlogForm></BlogForm>  
                </div>             
                </ContentContainer>
            </MainContainer>
        </div>
    )
}