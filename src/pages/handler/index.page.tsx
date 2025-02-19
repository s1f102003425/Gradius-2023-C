import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  const hoge = true;
  const [isFiring, setIsFiring] = useState(false);
  const [layerPosition, setLayerPosition] = useState({ x: 0, y: 0 });

  // const keydown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   const game = await apiClient.handler.$post({
  //     body: { position: layerPosition, key: e.code },
  //   });
  //   setLayerPosition(game.position);
  // };
  const handleButtonClick = async (operation: string) => {
    const game = await apiClient.handler.$post({
      body: { position: layerPosition, key: operation },
    });
    setLayerPosition(game.position);
  };
  const createClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    await apiClient.create.$post();
    console.log(e);
  };
  // const shotClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   const game =await apiClient.shot.$post({
  //     body:{position:layerPosition,key}
  //   })

  //   console.log(e);
  // };
  // useEffect(() => {
  //   const shotClick = (e: React.MouseEvent) => {
  //     if (!isFiring) {
  //       const shotInterval = setInterval(() => {
  //         const fired = () => setIsFiring(true);
  //         fired();
  //         console.log(e);
  //       }, 50);

  //       setTimeout(() => {
  //         clearInterval(shotInterval);
  //         setIsFiring(false);
  //       }, 1000);
  //     }
  //   };
  // }, [shotClick]);
  const shotMouseDown = () => {
    setIsFiring(true);
  };
  const shotMouseUp = () => {
    setIsFiring(false);
  };

  console.log(`x:${layerPosition.x},y:${layerPosition.y}`);
  if (!hoge) return <Loading visible />;

  return (
    <>
      <div className={styles['debug-board']}>
        <div className={styles['debug-value']}>X:{layerPosition.x}</div>
        <div className={styles['debug-value']}>Y:{layerPosition.y}</div>
        <div className={styles['debug-value']}>isFiring:{isFiring ? '〇' : '×'}</div>
      </div>
      <div className={styles['handler-board']}>
        <button className={styles['minus-y']} onClick={() => handleButtonClick('+Y')}>
          +Y
        </button>
        <button className={styles['minus-x']} onClick={() => handleButtonClick('-X')}>
          -X
        </button>
        <button className={styles['plus-x']} onClick={() => handleButtonClick('+X')}>
          +X
        </button>
        <button className={styles['plus-y']} onClick={() => handleButtonClick('-Y')}>
          -Y
        </button>
      </div>
      <div className={styles['create-button']} onClick={createClick}>
        create
      </div>
      <div className={styles.shot} onMouseDown={shotMouseDown} onMouseUp={shotMouseUp}>
        shot
      </div>
    </>
  );
};

export default Home;
