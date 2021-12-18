import { createContext, useState } from 'react'

const UserContext = createContext({
    user: null,
    setUser: function(){},
    setCompany: function(){},
    removeUser: function(){}
})


export function UserContextProvider(props){
    const [activeUser, setActiveUser] = useState()

    function setUserHandler(userData){
        setActiveUser(userData)
    }
    function setCompanyHandler(userData){
        setActiveUser({user:{
            ...activeUser.user,
            company:userData
        }})
    }
    function removeUserHandler(userData){
        setActiveUser(userData)
    }

    const context = {
        user: activeUser,
        setUser: setUserHandler,
        setCompany: setCompanyHandler,
        removeUser: removeUserHandler,
    };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    )
}



export default UserContext