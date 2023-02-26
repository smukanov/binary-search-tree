import React, { useEffect, useRef, useState } from 'react';
import { BinarySearchTree } from './classes/BinarySearchTree';
import CustomTree from './components/CustomTree';
import { getRandomNumber } from './helpers';

function App() {
  const treeRef = useRef<BinarySearchTree | null>(null)
  const [lastNumber, setLastNumber] = useState<number | null>(null)
  // используем для ререндера
  const [_, setCurrentTime] = useState(new Date().getTime())

  const handleOnSpaceKeyPress = () => {
    const randomNumber = getRandomNumber(-100, 100)
    if (treeRef.current === null){
      const newTree = new BinarySearchTree()
      newTree.insert(randomNumber)
      treeRef.current = newTree
    }
    else {
      treeRef.current.insert(randomNumber)
    }
    
    setLastNumber(randomNumber)
    setCurrentTime(new Date().getTime())
  }

  useEffect(() => {
    const KEY_PRESS = 'keypress'
    const keyPressListener = (event: KeyboardEvent) => {
      const SPACE_KEY = ' '
      if (event.key === SPACE_KEY){
        handleOnSpaceKeyPress()
      }
    }

    document.addEventListener(KEY_PRESS, keyPressListener)

    return () => {
      document.removeEventListener(KEY_PRESS, keyPressListener)
    }
  }, [])

  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <div style={{fontSize: 20, color: 'red', width: 400}}>
        Нажмите пробел, чтобы сгенерировать случайное число от -100 до 100 и добавить его в бинарное дерево поиска
      </div>
      {treeRef.current && (
        <CustomTree 
          data={treeRef.current.convertToChildren()}
          newChildValue={lastNumber!}/>
      )}
    </div>
  );
}

export default App;
