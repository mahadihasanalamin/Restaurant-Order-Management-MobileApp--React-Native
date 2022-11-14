import React, {FC, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';

interface Item {
  name: string,
  image: string,
}

interface Props {
  header: string,
  price: number,
  items: Item[],
  selectionType?: string;
}

const AddOnImage: FC<Props> = (props) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [opacity, setopacity] = useState<number>(1);

 
  
  const ItemList = () => {
    return props.items.map(item => {
      return (
        <View
          style={[
            Styles.container,
            selectedItem != item.name ? {opacity: opacity} : null,
          ]}>
          <TouchableOpacity
            style={[
              Styles.item,
              selectedItem == item.name
                ? {borderWidth: 1, borderColor: '#E5251A'}
                : null,
            ]}
            onPress={() => [setSelectedItem(item.name), setopacity(0.3)]}>
            <Image
              source={require('../../../../assets/images/tomato.png')}
              style={Styles.image}
            />
          </TouchableOpacity>
          <Text
            style={[
              Styles.itemName,
              selectedItem == item.name ? {fontWeight: 'bold'} : null,
            ]}>
            {item.name}
          </Text>
        </View>
      );
    })
  }

   const Selection = (name: string) => {
    if (selectedItems.includes(name)) {
      setSelectedItems(selectedItems.filter(item=>{return item!=name}));
    } else {
      setSelectedItems(selectedItems => [...selectedItems, name]);
    }
        
   };

  const ItemList1 = () => {
    return props.items.map(item => {
      return (
        <View style={Styles.container}>
          <TouchableOpacity
            style={[
              Styles.item,
              selectedItems.includes(item.name)
                ? {borderWidth: 1, borderColor: '#E5251A'}
                : null,
            ]}
            onPress={() => Selection(item.name)}>
            <Image
              source={require('../../../../assets/images/tomato.png')}
              style={Styles.image}
            />
          </TouchableOpacity>
          <Text
            style={[
              Styles.itemName,
              selectedItems.map(itm => {
                itm == item.name;
              })
                ? {fontWeight: 'bold'}
                : null,
            ]}>
            {item.name}
          </Text>
        </View>
      );
    })
  }
  return (
    <View>
      <View style={Styles.titleView}>
        <Text
          style={[Styles.title, {color: '#2A2630', marginRight: scale(196)}]}>
          {props.header}
        </Text>
        <Text style={[Styles.title, {color: '#E5251A'}]}>{props.price}kr</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

        <View style={Styles.items}>
          {props.selectionType=='Single'?ItemList():ItemList1()}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddOnImage;

const Styles = ScaledSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '800',
  },

  titleView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '22@s',
  },
  image: {
    height: '100@s',
    width: '130@s',
    resizeMode: 'contain',
  },

  item: {
    backgroundColor: 'white',
    height: '100@s',
    width: '130@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  itemName: {
    fontSize: 14,
    color: '#2A2630',
    textAlign: 'center',
    marginTop: '12@s',
  },

  itemNameView: {
    // alignContent: 'center',
    // alignSelf: 'center',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    marginEnd: 60,
  },

  items: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '30@s'
  },
});
