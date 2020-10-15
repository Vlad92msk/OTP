import React from 'react'
import { PriceType } from './Magazine'
import cls from '../Style/Magazine.module.scss'

type MyPropductType = {
    product: PriceType
}

export const MyProduct: React.FC<MyPropductType> = ({product}) => {
    return (
        <div className={cls.Row}>
            <div className={`${cls.Row} ${cls.Purchase}`}>
                <div>Ваш товар:</div>
                <div>{product.name}</div>
            </div>
            <div className={`${cls.Row} ${cls.Purchase}`}>
                <div>Сумма:</div>
                <div>{product.price}</div>
            </div>
            <div className={`${cls.Row} ${cls.Purchase}`}>
                <div>Номер:</div>
                <div>{product.id}</div>                        
            </div>
        </div>
    )
}