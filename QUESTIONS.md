1. more error handling - adding some typescript interfaces/checks 
2. not an issue on RN as a mobile app - to optimize I would look for alternatives for flatlist, more efficient grouping algorithm
3. Not from the latest but Hooks:

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  -- much cleaner than classes - can add logic to a simpler component with hooks - no need to go to classes 
  -- much more reusable code with smaller pieces of logic -- custom hooks

4. Based on logs - if crash report submitted to app store/google play - if performance issue would emulate it locally to replicate it
5. Storing data on the device (even redux info) - what is persistent and what should not be - where to store ? Async storage or more secure options depending on data (iOS Keychain or Android keystore -- but more complicated due to native functionalities - needs a bridge)
    - api endpoints called - must use ssl connections, conceive the endpoint as much as possible - probably through gateways - especially if not public endpoints
6. Would add a depth part - not sure if the feed part also has this role or not - select the top x levels of the orderbook when connecting 
    Maybe add an extra filter option - based on the amount of the orders at a price or filtering based on price