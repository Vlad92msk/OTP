import React from 'react'
import { PriceType } from './Magazine'
import cls from '../Style/Magazine.module.scss'

type MyPropductType = {
    product: PriceType
}

export const MyProduct: React.FC<MyPropductType> = ({product}) => {
    return (
        <div className={cls.Row} style={{ padding: '10px' }}>
            <div className={cls.Title}>Ваш заказ</div>
            <hr className={cls.Hr} />
            <div className={cls.SurrenderContainer}>
                <div className={`${cls.Row} ${cls.SurrenderRow}`} style={{width: '50%'}}>
                    <div>Ваш товар:</div>
                    <div>{product.name}</div>
                </div>
                <div className={`${cls.Row} ${cls.SurrenderRow}`} style={{width: '50%'}}>
                    <div>Сумма:</div>
                    <div>{product.price}</div>
                </div>
                <div className={`${cls.Row} ${cls.SurrenderRow}`} style={{width: '50%'}}>
                    <div>Номер:</div>
                    <div>{product.id}</div>                        
                </div>
            </div>
        </div>
    )
}