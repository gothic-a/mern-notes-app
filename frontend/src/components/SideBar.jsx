import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Tag from "./Tag"
import Modal from './Modal'
import TagsEditor from './TagsEditor'

import { toggleModal } from '../actions/modalActions'

const SideBar = () => {
    const tagsList = useRef(null)
    const sideBar = useRef(null)

    const dispatch = useDispatch()
    const { isOpen: isOpenSidebar } = useSelector(state => state.sidebar)

    const removeHideScroll = (e) => {
        if(e.propertyName === 'width') {
            if(isOpenSidebar) {
                tagsList.current.classList.remove('hide-scroll')
            }
        }
    }    
    
    useEffect(() => {
        if(!isOpenSidebar) tagsList.current.classList.add('hide-scroll')
    }, [isOpenSidebar])

    return (
        <>
            <div  
                ref={sideBar} 
                className={isOpenSidebar ? `side-bar` : 'side-bar hidden'}
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

                    <div 
                        className="tags__change"
                        onClick={() => dispatch(toggleModal())}
                    >
                        <div className="tags__item">
                            <div className="tags__item-icon">
                                <i className="fas fa-pen"></i>
                            </div>
                            <span className="tags__item-text">Change tags</span>
                        </div>
                    </div>
                </div>
            </div>
            {
               <Modal title="change tags">
                   <TagsEditor />
               </Modal>
            }
        </>
    )
}

export default SideBar