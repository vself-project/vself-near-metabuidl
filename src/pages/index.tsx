import React, { useContext, useEffect } from 'react';
import { appStore, onAppMount } from '../state/app';
import { Contract } from '../components/Contract';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { state, dispatch, update } = useContext(appStore);  
  const { near, wallet, account, loading } = state;

  const onMount = () => {
    dispatch(onAppMount());
  };
  useEffect(onMount, []);
    
  if (loading) {
    return (
	  <div className="root">
        <h3>Workin on it!</h3>
      </div>
	)
  }
    
  return (
    <div style={styles.container}>
      <Header {...{ wallet, account }} />
      <Contract {...{ near, update, wallet, account }} />
      <Footer/>
    </div>
  );
}

const styles = {
  container: { minWidth: 900 }
};

export default Home;
