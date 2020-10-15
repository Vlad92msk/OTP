import React from 'react'
import cls from '../Style/Magazine.module.scss'
import { SurrenderType } from './Magazine'

type SurrenderTypeFunc = {
    surrender: SurrenderType
}

export const Surrender: React.FC<SurrenderTypeFunc> = ({surrender}) => {
    return (
        <div className={cls.Row}>
                    <div>Сдача</div>
                    <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', padding: '10px'}}>
                        <div style={{width: '50%', display: 'flex', justifyContent: 'space-around'}}>
                            <div>10 руб</div>
                            <div>{surrender.ten}</div>
                        </div>
                        <div style={{width: '50%', display: 'flex', justifyContent: 'space-around'}}>
                            <div>5 руб</div>
                            <div>{surrender.five}</div>
                        </div>
                        <div style={{width: '50%', display: 'flex', justifyContent: 'space-around'}}>
                            <div>2 руб</div>
                            <div>{surrender.two}</div>
                        </div>
                        <div style={{width: '50%', display: 'flex', justifyContent: 'space-around'}}>
                            <div>1 руб</div>
                            <div>{surrender.one}</div>
                        </div>
                    </div>
                </div>
    )
}