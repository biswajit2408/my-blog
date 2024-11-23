import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [resources, setResources] = useState(null);

    // On component mount, check if there's any stored data
    useEffect(() => {
        const storedResources = localStorage.getItem('resources');
        if (storedResources) {
            setResources(JSON.parse(storedResources));
        }
    }, []);

    // Function to update localStorage and state
    const updateResources = (newData) => {
        const updatedResources = { ...resources, ...newData };
        setResources(updatedResources);
        localStorage.setItem('resources', JSON.stringify(updatedResources));
    };

    return (
        <AppContext.Provider value={{ resources, updateResources }}>
            {children}
        </AppContext.Provider>
    );
};
