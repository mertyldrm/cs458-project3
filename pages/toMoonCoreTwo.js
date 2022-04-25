/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/currentCountry';

export default function toMoonCoreTwo() {
    const [result, setResult] = useState('');
    const [clicked, setClicked] = useState(false);
    const resultRef = useRef(result);
    resultRef.current = result;

    useEffect(() => {
      if(clicked === false){
        console.log("this is initial render");
      } else {
        console.log("this is not initial anymore");
        setTimeout(() => {
          if (resultRef.current === '') {
            setResult(
              <div>
                  <hr style={{ backgroundColor: 'black', height: 5 }}/>
                  <div style={styles.resultDisplayer}>
                      <p style={{ color: 'red' }}>An error occurred. You should allow browser to detect your location!</p>
                  </div>
              </div>);
          }
        }, 9000);
      };
    }, [clicked]);

    const getLocation = (e) => {
      setClicked(true);
      e.preventDefault();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(usePosition);
      }
      else {
        return "Location finder is not supported by this browser.";
      }
    }

    const usePosition = (coordinates) => {
      axios.post('/api/findDistanceToMoon', {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      })
      .then((res) => {
        console.log(res.data);
        setResult(
          <div>
              <hr style={{ backgroundColor: 'black', height: 5 }}/>
              <div style={styles.resultDisplayer}>
                  <h2>Your distance to Moon's Core: </h2>
                  <h1 style={{ color: 'red' }}>{res.data} km</h1>
              </div>
          </div>
        );
      })
      .catch((err) => {
        window.alert(err);
      })
    }

    return (
        <>
        <div style={styles.container}>
            <h1>Distance to the Moon's Core from Your Location</h1>
            <div style={styles.inputContainer}>
                <p style={{ width: '400px', lineHeight: '2'}}>By clicking the button, you can calculate the distance from your current position to the Moon's core: (You should allow this website to use your location. Otherwise, there will be no result shown)</p>
            </div>
            <button onClick={getLocation} style={styles.submissionButtonFour}>Show Distance to the Moon's Core</button>
        </div>
        {result}
        </>
    )
}