const Navbar  = () => {
    return(
        <>
    <div className='flex justify-around bg-indigo-800 text-white p-2'  >  
    <div className='font-bold cursor-pointer hover:underline '  >iTask</div>
    <div className='flex gap-6' >
    <div className='cursor-pointer hover:underline hover:font-bold'>Home</div>
    <div className='cursor-pointer hover:underline hover:font-bold'>Your Task</div>
    </div>
    </div>
        </>
    )
}

export default Navbar