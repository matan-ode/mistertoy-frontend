import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div style={{ fontSize: '2em' }}>{text}</div>;

export function GoogleMap() {
    const [center, setCenter] = useState({ lat: 32.109333, lng: 34.855499 })
    const [zoom, setZoom] = useState(8)

    function onMapClicked({ lat, lng }) {
        console.log('click!', lat, lng)
        setCenter({ lat, lng })
    }

    const branches = [
        {
            city: 'Hadera',
            id: 101,
            position: {
                lat:32.0880503,
                lng:34.7817676
            },
        },
        {
            city: 'Tel Aviv',
            id: 102,
            position: {
                lat: 32.4365224,
                lng: 34.9296629,
            },
        },
        {
            city: 'Jerusalem',
            id: 103,
            position: {
                lat: 32.0133587,
                lng: 34.7685172,
            },
        },
    ]

    return (
        // Important! Always set the container height explicitly
        <div>
            {branches.map(branch => {
                return (
                    <button
                        key={branch.id}
                        onClick={() => {
                            setCenter(branch.position)
                            setZoom(12)
                        }}
                    >
                        {branch.city}
                    </button>
                )
            })}
            <div style={{ height: '50vh', width: '100%' }}> {/* // Important! Always set the container height explicitly */}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDcxHTWrhF8QyQqFrlc44h3WB-8wSVuVhk" }}
                    center={center}
                    zoom={zoom}
                    onClick={onMapClicked}
                >
                    <Marker
                        lat={32.0880503}
                        lng={34.7817676}
                        text="🚩"
                    />
                    <Marker
                        lat={32.4365224}
                        lng={34.9296629}
                        text="🚩"
                    />
                    <Marker
                        lat={32.0133587}
                        lng={34.7685172}
                        text="🚩"
                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}