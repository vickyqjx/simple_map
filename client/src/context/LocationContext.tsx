import React from 'react';

type SetValue = (value: any) => void;

interface LocationContextInterface {
  selectedAddress: any;
  setSelectedAddress: SetValue;
  searchAddress: any;
  setSearchAddress: SetValue;
}

export const LocationCtx = React.createContext<LocationContextInterface>({
  searchAddress: '',
  selectedAddress: '',
  setSelectedAddress: () => {
  },
  setSearchAddress: () => {}
});

type LocationProviderProps = {
  initAddress?: string,
  children?: any,
}

const LocationProvider = ({initAddress, children}: LocationProviderProps) => {
  // Use State to keep the values
  const [selectedAddress, setSelectedAddress] = React.useState(initAddress);
  const [searchAddress, setSearchAddress] = React.useState(initAddress);

  return (
    <LocationCtx.Provider
      value={{
        selectedAddress, //address display on the text field
        setSelectedAddress,
        searchAddress, //address is used to pass to the backend
        setSearchAddress
      }}
    >
      {children}
    </LocationCtx.Provider>
  );
};

export default LocationProvider;
