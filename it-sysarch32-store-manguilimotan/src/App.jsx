import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage'; // Corrected import statement

function App() {
  const [fruitList, setFruitList] = useState([]);
  const [newFruit, setNewFruit] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [fileUpload, setFileUpload] = useState(null);

  const fruitCollectionRef = collection(db, "fruits");

  useEffect(() => {
    const getFruitList = async () => {
      try {
        const data = await getDocs(fruitCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id,
        }));
        setFruitList(filteredData);
      } catch(err) {
        console.error(err);
      }
    };

    getFruitList();
  }, [fruitCollectionRef]);

  const deleteFruit = async (id) => {
    try {
      const fruitDoc = doc(db, "fruits", id);
      await deleteDoc(fruitDoc);
      setFruitList(prevFruitList => prevFruitList.filter(fruit => fruit.id !== id));
    } catch(err) {
      console.error(err);
    }
  };

  const updateFruitName = async (id) => {
    try {
      const fruitDoc = doc(db, "fruits", id);
      await updateDoc(fruitDoc, { name: updatedName });
    } catch(err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectfiles/${fileUpload.name}`); // Corrected string interpolation
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch(err) {
      console.error(err);
    }
  };

  const onSubmitFruit = async () => {
    try {
      await addDoc(fruitCollectionRef, {
        name: newFruit, 
        userId: auth?.currentUser?.uid,
      });
      setNewFruit('');
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className='App'>
      <Auth/>
      <div>
        <input 
          placeholder='Add Fruits' 
          value={newFruit} 
          onChange={(e) => setNewFruit(e.target.value)}
        />
        <button onClick={onSubmitFruit}>Enter a Fruit</button>
      </div>
      <div>
        {fruitList.map((fruit) => (
          <div key={fruit.id}>
            <h1>{fruit.name}</h1>
            <input 
              placeholder='Update fruit'
              value={updatedName} 
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <button onClick={() => deleteFruit(fruit.id)}>Delete Fruit</button>
            <button onClick={() => updateFruitName(fruit.id)}>Update Fruit's Name</button>
          </div>
        ))}
      </div>   
      <div>
        <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}></input> {/* Removed unnecessary space */}
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
