import React from 'react';

const useLocalStorage = (key: string) => {

  const setItem = (value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    }
    catch(error){
      console.log(error)
    }
  }

  const getItem = () => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : undefined
    }
    catch(error){
      console.log(error)
    }
  }

  const removeItem = () => {
    try {
      localStorage.removeItem(key)
    }
    catch(error){
      console.log(error)
    }
  }

  return { setItem, getItem, removeItem }
};

export default useLocalStorage;