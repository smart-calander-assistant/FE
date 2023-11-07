import React, {useState} from 'react';
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';

const SearchPlace = ({onPlaceSelect}) => {
    const [value, setValue] = useState(null);
    const [latLng, setLatLng] = useState({latitude: 37.5050881, longitude: 126.9571012});

    const handlePlaceSelect = async (selectedPlace) => {
        setValue(selectedPlace);
        const placeLabel = selectedPlace ? selectedPlace.label : '';

        if (selectedPlace) {
            const results = await geocodeByAddress(placeLabel);
            const {lat, lng} = await getLatLng(results[0]);

            setLatLng({latitude: lat, longitude: lng});
            onPlaceSelect({
                place: selectedPlace.value.structured_formatting.main_text,
                coordinates: {latitude: lat, longitude: lng}
            });
        }
    }

    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey="API_KEY"
                apiOptions={{language: 'ko', region: 'kr'}}
                onLoadFailed={(error) => (console.error("could not inject google script", error))}
                selectProps={{
                    value,
                    onChange: handlePlaceSelect,
                }}
            />
        </div>
    );
}

export default SearchPlace;