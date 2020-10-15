import React, { useCallback, useEffect, useMemo, useState } from 'react'
import cls from '../Style/Magazine.module.scss'
import { MyProduct } from './MyProduct'
import { Price } from './Price'
import { Surrender } from './Surrender'

interface Price {
    price: number
    name: string
}

export interface PriceType extends Price  {
    id: number
}

type OntType = {
    arr: Price[]
}

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

export const Magazine: React.FC<OntType> = ({ arr }) => {
    
    //Индексация товаров
    const productsNumeric = useCallback((arr: Price[]) => {
        const a: PriceType[] = []
        arr.map((t, i) => a.push({
            id: i + 1,
            price: t.price,
            name: t.name
        }))
        return a
    }, [])
    const products = useMemo(() => productsNumeric(arr), [])

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
                setTrue([...products.filter(t => t.price <= val).map(t=>t.id)])
                price.includes(val) ?
                setErrors(p => {
                    return {...p, [target]: true }
                }) :
                setErrors(p => {
                    return {...p, [target]: false}
                })
                break
            case 'id': trueVariants.includes(val) ?
                setErrors(p => {
                    return { ...p, [target]: true }
                }) :
                setErrors(p => {
                    return {...p, [target]: false }
                })                
        
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
                {products.map((t, i) =><Price key={i} propduct={t} trueVariants={trueVariants}/>)}
            </div>
            <div className={cls.Column}>
                <div className={cls.Row}>
                    <div className={cls.RowInputs}>
                        <label htmlFor='price' >Введите сумму</label>
                        <input
                            id='price'
                            type='text'
                            value={`${order.price? order.price: ''}`}
                            onChange={(e) => handleChangeOrder(e, 'price')}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') { validate(+e.currentTarget.value, 'price'); setEnterPrice(true) }
                                if (e.key !== 'Enter') {
                                    setErrors(p => {
                                        return { ...p, price: true }
                                    }); setEnterPrice(false)}
                            }}
                        />                        
                        {!isErrors.price && order.price!>0 && <span>Внесите купюры номиналом 50, 100, 200 или 500 рублей</span>}
                        
                    </div>
                    <div className={cls.RowInputs}>
                        <label htmlFor='id' >Выберите товар</label>
                        <input
                            id='id'
                            type='text'
                            disabled={isErrors.price && enterPrice ? false : true }
                            value={`${order.id? order.id: ''}`}
                            onChange={(e) => { handleChangeOrder(e, 'id'); trueVariants.includes(+e.target.value) && setErrors(p => { return { ...p, id: true } }); setResult(false)}}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') { validate(+e.currentTarget.value, 'id'); mySurrender(); setResult(true)}
                                if (e.key !== 'Enter') setErrors(p => {
                                    return {...p, id: false}
                                })                                
                            }}
                        />                        
                        {!isErrors.id && order.id && <span> Вы можете выбрать товары под номером: {trueVariants.map(t=>t).join(', ')}</span>}
                    </div>
                </div>
                {isErrors.id && result && <Surrender surrender={surrender}/>}
                {isErrors.id && result && products.filter((t) => t.id === order.id).map((t, i) => <MyProduct product={t} key={i}/>)}
            </div>
        </div>
    )
}
