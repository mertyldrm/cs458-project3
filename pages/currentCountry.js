/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useState } from 'react';
import styles from '../styles/currentCountry';

export default function currentCountry() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [result, setResult] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(latitude, longitude);
        axios.post('/api/findCurrentCountry', {
            latitude,
            longitude
        })
        .then((res) => {
            console.log(res.data);
            setResult(
                <div>
                    <hr style={{ backgroundColor: 'black', height: 5 }}/>
                    <div style={styles.resultDisplayer}>
                        <h2>The country with given latitude and longitude: </h2>
                        <h1 style={{ color: 'red' }}>{res.data}</h1>
                    </div>
                </div>);
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status == 400)
                setResult(
                    <div>
                        <hr style={{ backgroundColor: 'black', height: 5 }}/>
                        <div style={styles.resultDisplayer}>
                            <p style={{ color: 'red' }}>{err.response.data}</p>
                        </div>
                    </div>);
            else
                setResult(
                    <div>
                        <hr style={{ backgroundColor: 'black', height: 5 }}/>
                        <div style={styles.resultDisplayer}>
                            <h1 style={{ color: 'red' }}>No country is found with given latitude and longitude!</h1>
                        </div>
                    </div>);
        })
        // axios post service with the name data
    };

    return (
        <>
        <div style={styles.container}>
            <h1>Show Your Current Country</h1>
            <div style={styles.inputContainer}>
                <label htmlFor="latitude" style={styles.label}>Please enter latitude:</label>
                <input id="latitude" type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
            </div>
            <div style={styles.inputContainer}>
                <label htmlFor="longitude" style={styles.label}>Please enter longitude:</label>
                <input id="longitude" type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
            </div>
            <button onClick={handleSubmit} style={styles.submissionButton}>Show Current Country</button>
        </div>
        {result}
        </>
    )
}