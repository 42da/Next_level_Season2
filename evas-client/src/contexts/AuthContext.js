import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/authServices';

const AuthContext = createContext();    // 인증 상태 공유를 위한 Context 생성


const AuthProvider = ({ children }) => {    //  상태와 인증 상태 함수 제공 
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser()); // useState를 사용하여 현재 사용자 상태를 초기화하고, 

    const login = async (username, password) => {
        const user = await AuthService.login(username, password);
        setCurrentUser(user);
        return user;
    };

    const logout = () => {
        AuthService.logout();
        setCurrentUser(null);
    };

    useEffect(() => {   // 컴포넌트가 마운트될 때 로컬 스토리지에서 현재 사용자 정보를 가져와 상태를 업데이트
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    
    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };  // AuthContext와 AuthProvider를 내보내어 다른 컴포넌트에서 사용할 수 있도록 함.