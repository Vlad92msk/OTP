import { Magazine_ActionTypes, PriceType } from "../actions/magazineActions";

const initialState = {
    load: false,
    products: [] as PriceType[]
};

type InitialStateType = typeof initialState;

//InitialStateType после скобочек будет говорить о том, какой объект должна вернуть функция, но иногда это может быть избыточно
export default function magazine(
  state = initialState,
  action: Magazine_ActionTypes
): InitialStateType {
  switch (action.type) {
    case "MAGAZINE_GET_DATA":
      return {
          ...state,
          products: [...action.products]
          };
          case "MAGAZINE_LOIDING":
      return {
          ...state,
          load: !state.load
      };

    default:
      return state;
  }
}
