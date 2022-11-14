import React, {FC} from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';

interface Props {
  onChangeText: (text: string) => void;
  onPressSort: () => void;
}
const Search: FC<Props> = props => {
  return (
    <View>
      <View style={[Styles.wrapper, Styles.lineStyle]}>
        <Image
          source={require('../../../assets/icons/search.png')}
          style={Styles.image}
        />
        <TextInput
          style={Styles.textInput}
          placeholder="Search Here"
          onChangeText={props.onChangeText}
        />
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={props.onPressSort}>
          <Image
            source={require('../../../assets/icons/sort.png')}
            style={Styles.sort}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;

const Styles = ScaledSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  lineStyle: {
    borderBottomWidth: '0.5@s',
    borderColor: '#F0F5F9',
    marginVertical: '7@s',
    width: '315@s',
    alignSelf: 'center',
  },
  textInput: {
    height: scale(40),
    width: scale(270),
    color: '#F0F5F9',
  },
  image: {
    height: scale(18),
    width: scale(18),
    marginRight: scale(14),
    alignSelf: 'center',
  },

  sort: {
    height: scale(14),
    width: scale(14),
  },
});
