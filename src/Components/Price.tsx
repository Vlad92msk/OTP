import React from 'react'
import { PriceType } from './Magazine'
import cls from '../Style/Magazine.module.scss'

type PriceTypeFUC = {
    trueVariants: number[]
    propduct: PriceType
    isErrors: {id?: boolean, price: boolean}
}

export const Price: React.FC<PriceTypeFUC> = ({ trueVariants, propduct, isErrors }) => {
    console.log(isErrors)
    return (
        <div className={`${cls.PriceContainer} ${trueVariants.includes(propduct.id) && isErrors.price ? cls.ContainerActive : null}`}>
            <div className={cls.Price_Column}>
                <div className={cls.Price_Column_Name}>{propduct.name}</div>
                <div className={cls.Price_Column_Price}>Стоимость: {propduct.price}</div>
            </div>
            <div className={cls.Price_Column}>
                <span>{propduct.id}</span>
            </div>    
        </div>
    )
}