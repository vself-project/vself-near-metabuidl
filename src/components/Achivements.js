import React from 'react';
import Image from 'next/image';
import { RARITY_IMAGES } from '../constants/general';

const Achivement = ({ rarity, counter, supply }) => {
  if (counter === undefined) return null;
  const data = supply < 0 ? counter : `${counter}/${supply}`;
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
        <div style={styles.counterBox}>
          <div style={styles.counter}>{data}</div>
        </div>
      </div>
    </div>
  );
};

export const Achivements = ({ counters, supplies }) => {
  return (
    <div style={styles.container}>
      {Object.keys(RARITY_IMAGES).map((rarity, index) => (
        <Achivement
          key={index}
          rarity={rarity}
          counter={counters[index]}
          supply={supplies[index]}
        />
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
  counterBox: {
    position: 'absolute',
    width: 136,
    height: 136,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    color: 'white',
  },
  counter: {
    height: 30,
    backgroundColor: '#022e52',
    margin: '-2px 0 0 0',
    padding: '0 8px 0 8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
};
