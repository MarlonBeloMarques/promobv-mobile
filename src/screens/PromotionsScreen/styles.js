import { theme } from "../../constants";
import styled from "styled-components/native";

export const Post = styled.TouchableOpacity`
  height: 120px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray3};
`;
export const Name = styled.Text`
  color: #333;
  font-weight: bold;
  font-size: 18;
  padding: 15px;
`;
export const PostImage = styled.Image`
  width: 40%;
`;
export const Localization = styled.Text`
  line-height: 18px;
  padding-left: 15px;
  color: ${theme.colors.gray3};
  border-color: red;
  font-weight: bold;
`; 
export const Price = styled.Text`
  line-height: 18px;
  padding-left: 15px;
  padding-bottom: 10px;
  color: ${theme.colors.secondary};
  font-size: 15;
  font-weight: bold;
`; 