export const SET_USER_PROFILE           = 'set user profile';

export function setUserProfile(googleUser) {
    return (dispatch) => {
        const profile = googleUser.getBasicProfile();
        
        dispatch({
            type : SET_USER_PROFILE,
            profile : {
                full_name : profile.getName(),
                first_name : profile.getGivenName(),
                last_name : profile.getFamilyName(),
                avatar : profile.getImageUrl(),
                email : profile.getEmail(),
                id_token : googleUser.getAuthResponse().id_token
            }
        });
    }
}