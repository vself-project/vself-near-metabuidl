import React from 'react';
import Image from 'next/image';
import { RARITY_IMAGES } from '../constants/general';

const Achivement = ({ rarity, counter }) => {
  return (
    <div key={rarity} style={styles.achivementContainer}>
      <p style={styles.label}>{rarity}</p>
      <div style={styles.image}>
        <Image
          src={RARITY_IMAGES[rarity]}
          alt='No image'
          width={136}
          height={136}
          layout='intrinsic'
        />
        <div style={styles.counter}>{counter}</div>
      </div>
    </div>
  );
};

export const Achivements = ({ counters }) => {
  return (
    <div style={styles.container}>
      {Object.keys(RARITY_IMAGES).map((rarity, index) => (
        <Achivement key={index} rarity={rarity} counter={counters[index]} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: 850,
    height: 220,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 10px 10px 10px',
    margin: '0 0 40px 0',
    border: '1px solid black',
  },
  achivementContainer: {
    width: 150,
  },
  label: {
    margin: '0 0 10px 0',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
  },
  image: {
    backgroundColor: 'white',
    borderRadius: 8,
    border: '1px solid gray',
    display: 'flex',
    justifyContent: 'center',
  },
  counter: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#022e52',
    zIndex: 10,
    margin: '110px 0 0 126px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
};
