import { useSelector } from 'react-redux';

const useUserData = () => {

    const userObj = useSelector((state) => state.userObj);

    return{
        PublicUserData : userObj?.publicUserData,
        UserInstituteData : userObj?.user,
        UserProfileData : userObj?.userProfile,
    };

};

export default useUserData;
