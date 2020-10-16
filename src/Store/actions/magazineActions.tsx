import { BaseThunkType, InferActionTypes } from "../reducers/rootReducers";

interface Price {
    price: number
    name: string
}

export interface PriceType extends Price  {
    id: number
}

//_______________________________________________________
export type Magazine_ActionTypes = InferActionTypes<typeof actions>;
export type ThunkType = BaseThunkType<Magazine_ActionTypes>;

export const actions = {
    addDataAction: (products: PriceType[]) =>
    ({
      type: "MAGAZINE_GET_DATA",
      products,
        } as const),
    loading: () => ({
        type: 'MAGAZINE_LOIDING'
    } as const),
};


export function getData(): ThunkType {
    return async (dispatch) => {
      try {
            dispatch(actions.loading())
           const p = new Promise<Price[]>((resolve, reject) => {
                setTimeout(() => {
                    const tovar:Price[] = [
                        {
                            price: 100,
                            name: 'Товар 1'
                        },
                        {
                        price: 50,
                        name: 'Товар 2'
                        },
                        {
                            price: 250,
                            name: 'Товар 3'
                        },
                        {
                            price: 92,
                            name: 'Товар 4'
                        },
                    ]
                    resolve(tovar)
                }, 1000);
            })

          p.then((data) => data)

          const serverData = await p

          const data:PriceType[] = serverData.map((item, i) => {
            return  {...item, id: i + 1}
          })

          dispatch(actions.addDataAction(data));
          dispatch(actions.loading())
      } catch (e) {
        console.log(e);
      }
    };
  }