import { changeLanguage } from "i18next";
import { createContext, useEffect, useState } from "react";

const LanguageContext = createContext();



export const LanguageProvider = ({ children }) => {
    const [appLang, setAppLang] = useState('en');

    let localstoraheLang = localStorage.getItem('lang')

    useEffect(() => {
        if (localstoraheLang) {
            setAppLang(localstoraheLang)
        }
        else {
            localStorage.setItem('lang', 'en')
            
        }
    }, [localstoraheLang]);

    return (
        <LanguageContext.Provider
            value={{
                appLang,
                setAppLang,
            }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
