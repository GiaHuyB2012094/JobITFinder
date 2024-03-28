import RingLoader from 'react-spinners/RingLoader';
const Loader = () => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-5 flex-center bg-transparent z-[60]'>
            <RingLoader
                color="#6366f1"
                size={150}
                speedMultiplier={1}
            />
        </div>
    );
}

export default Loader
