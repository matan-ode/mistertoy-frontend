import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '2em' }}>{text}</div>;

export function GoogleMap() {
    const [center, setCenter] = useState({ lat: 32.109333, lng: 34.855499 })
    const zoom = 11

    function onMapClicked({ lat, lng }) {
        console.log('click!', lat, lng)
        setCenter({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDcxHTWrhF8QyQqFrlc44h3WB-8wSVuVhk" }}
                center={center}
                defaultZoom={zoom}
                onClick={onMapClicked}
            >
                <AnyReactComponent
                    lat={32.0880503}
                    lng={34.7817676}
                    text="🚩"
                />
                <AnyReactComponent
                    lat={32.4365224}
                    lng={34.9296629}
                    text="🚩"
                />
                <AnyReactComponent
                    lat={32.0133587}
                    lng={34.7685172}
                    text="🚩"
                />
            </GoogleMapReact>
        </div>
    )
}