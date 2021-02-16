
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { theme } from '../constants';
import { Block, Button, Photo, Text } from '../elements';
import no_photo from "../../assets/images/no-photo.png";

const myPromotionCard = (props) => {
  const { item, deletePromotionClicked, onDetailsClicked, onClickEdit } = props;

  return (
    <Block
      margin={[theme.sizes.base, theme.sizes.padding]}
      onPress={() => onDetailsClicked(item.id)}
      button
      size={115}
      flex={false}
      row
      card
      shadow
      color={theme.colors.white}
    >
      {item.imagem === null ? (
        <Photo
          style={styles.radius}
          height={100}
          size={28}
          image={no_photo}
        />
      ) : (
        <Photo
          style={styles.radius}
          height={100}
          size={28}
          image={item.imagem}
        />
      )}
      <Block padding={[15, 10, 0]}>
        <Text gray bold size={14}>
          {item.titulo}
        </Text>
        <Block style={styles.end}>
          <Text secondary size={12} bold>
            {"R$ "}
            {item.preco}
          </Text>
          <Block padding={[5, 0, 0]} flex={false}>
            <Text gray3 bold>
              {item.localizacao}
            </Text>
          </Block>
        </Block>
      </Block>
      <Block column flex={false} padding={theme.sizes.base / 2}>
        <Button onPress={() => deletePromotionClicked(item.id)} style>
          <AntDesign name={"close"} size={18} color={theme.colors.gray3} />
        </Button>
        <Block bottom>
          <Button style onPress={() => onClickEdit(item.id)}>
            <AntDesign name={"edit"} size={18} color={theme.colors.gray3} />
          </Button>
        </Block>
      </Block>
    </Block>
  );
}

export default myPromotionCard;

const styles = StyleSheet.create({
  radius: {
    borderBottomStartRadius: theme.sizes.radius * 2,
    borderTopStartRadius: theme.sizes.radius * 2,
  },
  end: {
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});