import React from 'react';
import { Block, Photo, Text } from '../elements';
import no_photo from "../../assets/images/no-photo.png";
import { StyleSheet } from 'react-native';

const promotionCard = (props) => {
  const { item, onDetailsClicked } = props;

  return (
    <Block
      color="white"
      onPress={() => onDetailsClicked(item.id)}
      button
      size={140}
      flex={false}
      row
      border
    >
      {item.imagem !== null && (
        <Photo image={item.imagem} style={{ flex: 1, maxWidth: 140 }} />
      )}
      {item.imagem === null && (
        <Photo image={no_photo} style={{ flex: 1, maxWidth: 140 }} />
      )}
      <Block padding={[15, 10, 0]}>
        <Text gray bold size={18}>
          {item.titulo}
        </Text>
        <Block style={styles.end}>
          <Text secondary size={15} bold>
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
    </Block>
  );
}

export default promotionCard;

const styles = StyleSheet.create({
  end: {
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});