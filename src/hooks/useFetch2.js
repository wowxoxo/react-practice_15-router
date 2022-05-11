import { useCallback, useReducer } from "react";

const fetchReducer = (state, action) => {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: 'pending'
    }
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      status: 'complete'
    }
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.errorMessage,
      status: 'complete'
    }
  }
  return state
}

export const useFetch2 = (reqFn, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(fetchReducer, {
    data: null,
    error: null,
    status: startWithPending ? 'pending' : null
  })

  const sendRequest = useCallback(async function (requestData) {
    dispatch({ type: 'SEND' })
    try {
      const responseData = await reqFn(requestData);  
      dispatch({ type: 'SUCCESS', responseData})
    } catch (error) {
      dispatch({ type: 'ERROR', errorMessage: error.message || "Something went wrong"})
    }
  }, [reqFn])

  return {
    sendRequest,
    ...httpState
  }
}