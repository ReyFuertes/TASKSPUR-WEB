import { CardStatus } from "../../models/card.model";

export const getCardStatus = () => {
  let cardStatus: any[] = [];
  let keys;

  keys = Object.keys(CardStatus);
  keys = keys.slice(keys.length / 2);

  keys.forEach(element => {
    cardStatus.push({ value: CardStatus[element], label: element });
  });
  return cardStatus;
}