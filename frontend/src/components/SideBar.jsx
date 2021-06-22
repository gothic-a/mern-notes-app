import { useEffect, useRef } from 'react'
import { useSelector } from "react-redux"

import Tag from "./Tag"

const SideBar = () => {
    const tagsList = useRef(null)
    const sideBar = useRef(null)
    const { isOpen } = useSelector(state => state.sidebar)

    const removeHideScroll = (e) => {
        if(e.propertyName === 'width') {
            if(isOpen) {
                tagsList.current.classList.remove('hide-scroll')
            }
        }
    }    
    
    useEffect(() => {
        if(!isOpen) tagsList.current.classList.add('hide-scroll')
    }, [isOpen])

    return (
        <div  
            ref={sideBar} 
            className={isOpen ? `side-bar` : 'side-bar hidden'}
            onTransitionEnd={removeHideScroll}
        >

            <div className="tags">
                <ul 
                    ref={tagsList} 
                    className={"tags__list"}
                >
                    <Tag>All</Tag>
                    <Tag>Majakovskiy</Tag>
                    <Tag>Nina kraviz</Tag>
                    <Tag>Shopping cart</Tag>
                    <Tag>Buys</Tag>
                    <Tag>Chekhov</Tag>
                    <Tag>Dante</Tag>
                    <Tag>Shopping cart</Tag>
                </ul>

                <div className="tags__change">
                    <div className="tags__item">
                        <div className="tags__item-icon">
                            <i className="fas fa-pen"></i>
                        </div>
                        <span className="tags__item-text">Change tags</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar