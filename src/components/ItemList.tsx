import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { addItem, deleteItem } from '../features/itemList/itemSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../App/store';
import {RootState} from '../App/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemList = () => {
  const dispatch = useDispatch();
  // const items = useSelector((state: RootState) => state.item.items);
  const [text, setText] = React.useState('');
  const [items, setItems] = useState('');

  useEffect(() => {
    // Mengambil data dari AsyncStorage saat komponen dimuat
    const fetchItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('items');
        if (jsonValue !== null) {
          setItems(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Error fetching items from AsyncStorage:', e);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = async () => {
    // Menambah item di state lokal
    const newItem = { id: Math.random().toString(), name: text };
    setItems(prevItems => [...prevItems, newItem]);

    // Menyimpan data ke AsyncStorage
    try {
      const jsonValue = JSON.stringify([...items, newItem]);
      await AsyncStorage.setItems('items', jsonValue);
    } catch (e) {
      console.error('Error saving items to AsyncStorage:', e);
    }
    setText('');
  };

  const handleDeleteItem = async (id) => {
    // Menghapus item dari state lokal
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);

    // Menyimpan data ke AsyncStorage
    try {
      const jsonValue = JSON.stringify(updatedItems);
      await AsyncStorage.setItem('items', jsonValue);
    } catch (e) {
      console.error('Error saving items to AsyncStorage:', e);
    }
  };


  return (
    <Provider store={store}>
      <View style={{ flex: 1, padding: 20 }}>
        <TextInput
          placeholder="Enter item name"
          value={text}
          onChangeText={(text) => setText(text)}
          style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }}
        />
        <Button title="Add Item" onPress={handleAddItem} />
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <Text>{item.name}</Text>
              <Button title="Delete" onPress={() => handleDeleteItem(item.id)} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Provider>
  );
};

export default ItemList;
