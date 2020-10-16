import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getData } from '../Store/actions/magazineActions';
import { AppStateType } from '../Store/reducers/rootReducers';
import cls from '../Style/Magazine.module.scss'
import { MyProduct } from './MyProduct'
import { Price } from './Price'
import { Surrender } from './Surrender'

type OrderType = {
    price: number | null,
    id: number | null,
}

export type SurrenderType = {
    ten: number,
    five: number,
    two: number,
    one: number
}

type OntType = {}

export const Magazine: React.FC<OntType> = () => {
    const dispatch = useDispatch();
    const openTest = () => dispatch(getData());
    const products = useSelector((state: AppStateType) => state.magazine.products)
    const loading = useSelector((state: AppStateType) => state.magazine.load)
    useEffect(() => {openTest() }, [])
    
    //Заказ пользователя
    const [order, setOrder] = useState<OrderType>({
        price: null,
        id: null,
    })

    const [isErrors, setErrors] = useState({
        price: false,
        id: false,
    })

    //Возможные результаты исходя из внесенной суммы
    const [trueVariants, setTrue] = useState<number[]>([])

    const validate = (val: number, target: keyof OrderType) => {
        const price = [50, 100, 200, 500]   
        switch (target) {
            case 'price':
                setTrue([...products.filter(t => t.price <= val).map(t => t.id)])
                setErrors(p => {
                    return { ...p, [target]: price.includes(val) }
                })
                break;
            case 'id': 
                setErrors(p => {
                    return { ...p, [target]: trueVariants.includes(val) }
                }) 
                break;
            default:
                break;
        }
    }

    const handleChangeOrder = useCallback((e: React.ChangeEvent<HTMLInputElement>, target: keyof OrderType) => {
        e.persist();
        const val = +e.target.value
        setOrder((prev) => {
            return {
                ...prev,
                [target]: val ? val: null
            }
        });
    }, [])

    //Сдача
    const [surrender, setSurrender] = useState({
        ten: 0,
        five: 0,
        two: 0,
        one: 0
    })

    //Рассчет сдачи
    const mySurrender = ()=> {
        if (order.id) {
            const myPrice = products.find(t => t.id === order.id!)?.price // стоимость заказа
            const ss = order.price! - myPrice! // сдача

            //Скорее всего это не самое удачное решение... 
            const ten = Math.floor(ss / 10)
            const five = Math.floor((ss - ten * 10) / 5)
            const two = Math.floor((ss - ten * 10 - five * 5) / 2)
            const one = Math.floor((ss - ten * 10 - five * 5 - two * 2) / 1)

            setSurrender(p => {
                return {...p, ten, five, two, one,}
            })            
        }
    }
    

    const [result, setResult] = useState(false)
    const [enterPrice, setEnterPrice]= useState(false)

    return (
        <div className={cls.Container}>
            <div className={cls.Column}>
                {
                    loading ? <span className={cls.loader}/>:
                    products.map((t, i) => <Price key={i} propduct={t} trueVariants={trueVariants} isErrors={isErrors} />)
                }
            </div>
            <div className={cls.Column}>
                <div className={cls.Row}>
                    <div className={cls.Title}>Совершение покупки</div>
                    <hr className={cls.Hr} />
                    <div className={cls.SurrenderContainer}>
                        <div className={`${cls.Row} ${cls.SurrenderRow}`}>
                            <label htmlFor='price' >Введите сумму</label>
                            <input
                                id='price'
                                type='text'
                                value={`${order.price? order.price: ''}`}
                                onChange={(e) => handleChangeOrder(e, 'price')}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        validate(+e.currentTarget.value, 'price');
                                        setEnterPrice(true)
                                    }
                                    if (e.key !== 'Enter') {
                                        setErrors(p => {
                                            return { ...p, price: true }
                                        });
                                        setEnterPrice(false)
                                    }
                                }}
                            />                        
                            {!isErrors.price && order.price! > 0 && <span>Внесите купюры номиналом 50, 100, 200 или 500 рублей</span>}                            
                        </div>
                        <div className={`${cls.Row} ${cls.SurrenderRow} ${cls.RowInputs}`}>
                            <label htmlFor='id' >Выберите товар</label>
                            <input
                                id='id'
                                type='text'
                                disabled={isErrors.price && enterPrice ? false : true }
                                value={`${order.id? order.id: ''}`}
                                onChange={(e) => {
                                    handleChangeOrder(e, 'id');
                                    trueVariants.includes(+e.target.value) && setErrors(p => { return { ...p, id: true } });
                                    setResult(false)
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        validate(+e.currentTarget.value, 'id');
                                        mySurrender();
                                        setResult(true)
                                    }
                                    if (e.key !== 'Enter') setErrors(p => {
                                        return {...p, id: false}
                                    })                                
                                }}
                            />                        
                            {!isErrors.id && order.id && <span> Выберите товары под номером: {trueVariants.map(t=>t).join(', ')}</span>}
                        </div>                        
                    </div>

                </div>
                {isErrors.id && result && <Surrender surrender={surrender}/>}
                {isErrors.id && result && products.filter((t) => t.id === order.id).map((t, i) => <MyProduct product={t} key={i}/>)}
            </div>
        </div>
    )
}
