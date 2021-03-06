import React from 'react';
import Image from 'next/image';
import { capitalizeFirstLetter } from '../utils/general';
import { Button } from './Button';
import { RARITY_IMAGES, NFT_SUPPLIES } from '../constants/general';

export const Modal = ({ award, onClick }) => {
  const getCongratulations = (award) => {
    let message = Object.keys(RARITY_IMAGES)[award];
    message = `Congratulations! ${capitalizeFirstLetter(message)} catch today!`;
    if (award) {
      message += ` \n There will be minted only ${NFT_SUPPLIES[award]} of them ever!`;
    } else {
      message += ` \n Lucky you!`;
    }
    return message;
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <p style={styles.congratulations}>{getCongratulations(award)}</p>
        <Image
          src={RARITY_IMAGES[Object.keys(RARITY_IMAGES)[award]]}
          alt='No image'
          width={200}
          height={200}
          layout='intrinsic'
        />
        <Button label={'Cool'} style={{ normal: styles.button }} onClick={onClick} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 500,
    height: 340,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: '15px 20px 10px 20px',
  },
  congratulations: {
    margin: 0,
    textAlign: 'center',
    whiteSpace: 'pre-line',
  },
  button: {
    margin: 0,
    padding: '10px 30px 10px 30px',
    fontSize: 18,
  },
};
