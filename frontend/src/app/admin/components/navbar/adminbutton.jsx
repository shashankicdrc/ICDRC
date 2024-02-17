
import { useDispatch } from 'react-redux';
import {logoutAdmin} from '../../../../features/AdminSlice';

const AdminButton = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutAdmin(null))
    }
    return (
        <button onClick={handleLogout} className="max-w-max rounded-md px-3.5 py-1 flex justify-center items-center m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-orange-500 text-indigo-600 hover:text-white">
            <span className="absolute w-64 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-20 bg-orange-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
            <span className="relative text-orange-500 transition duration-300 group-hover:text-white ease">Logout</span>
        </button>
    );
};

export default AdminButton
