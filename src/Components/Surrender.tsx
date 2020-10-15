import React from 'react'
import cls from '../Style/Magazine.module.scss'
import { SurrenderType } from './Magazine'

type SurrenderTypeFunc = {
    surrender: SurrenderType
}

export const Surrender: React.FC<SurrenderTypeFunc> = ({surrender}) => {
    return (
        <div className={cls.Row} style={{padding: '10px'}}>
            <div className={cls.Title}>Ваша сдача</div>
            <hr className={cls.Hr}/>
            <div className={cls.SurrenderContainer}>
                <div className={`${cls.Row} ${cls.SurrenderRow}`} style={{width: '50%'}}>
                    <div>10 руб</div>
                    <div>{surrender.ten}</div>
                </div>
                <div className={`${cls.Row} ${cls.SurrenderRow}`} style={{width: '50%'}}>
                    <div>5 руб</div>
                    <div>{surrender.five}</div>
                </div>
                <div className={`${cls.Row} ${cls.SurrenderRow}`} style={{width: '50%'}}>
                    <div>2 руб</div>
                    <div>{surrender.two}</div>
                </div>
                <div className={`${cls.Row} ${cls.SurrenderRow}`} style={{width: '50%'}}>
                    <div>1 руб</div>
                    <div>{surrender.one}</div>
                </div>
            </div>
        </div>
    )
}