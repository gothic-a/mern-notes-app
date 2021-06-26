import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Tag from "./Tag"
import Modal from './Modal'
import TagsEditor from './TagsEditor'
import SideBarItem from './SideBarItem'
import NoteEditor from './NoteEditor'

import { toggleModal } from '../actions/modalActions'
import { getTags } from '../actions/tagsActions'

const SideBar = () => {
    const tagsListEl = useRef(null)
    const sideBar = useRef(null)

    const dispatch = useDispatch()
    const { isOpen: isOpenSidebar } = useSelector(state => state.sidebar)
    const { isOpen: isOpenModal, modalContent } = useSelector(state => state.modal)
    const { tagsList } = useSelector(state => state.tags)

    console.log(modalContent)

    const removeHideScroll = (e) => {
        if(e.propertyName === 'width') {
            if(isOpenSidebar) {
                tagsListEl.current.classList.remove('hide-scroll')
            }
        }
    }   
    
    useEffect(() => {
        dispatch(getTags())
    }, [dispatch])
    
    useEffect(() => {
        if(!isOpenSidebar) tagsListEl.current.classList.add('hide-scroll')
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
                        ref={tagsListEl} 
                        className={"tags__list"}
                    >
                        <SideBarItem 
                            text='All'
                        >
                            {
                                <i className="fas fa-tag"></i>
                            }
                        </SideBarItem>
                        {
                            tagsList.length ? (
                                tagsList.map(t => (
                                    <SideBarItem 
                                        text={t.name}
                                        key={t._id}
                                    >
                                        {
                                            <i className="fas fa-tag"></i>
                                        }
                                    </SideBarItem>
                                ))
                            ) : null
                        }
                    </ul>
                </div>
                <div className="sidebar__controls">
                    <SideBarItem 
                        text="Add Note"
                        onClickHandler={() => dispatch(toggleModal('open', 'note editor'))}
                    >
                        {
                            <i className="far fa-plus"></i>
                        }
                    </SideBarItem>
                    <SideBarItem 
                        text="Change Tags"
                        onClickHandler={() => dispatch(toggleModal('open', 'change tags'))}
                    >
                        {
                            <i className="fas fa-pen"></i>
                        }
                    </SideBarItem>
                </div>
                
            </div>
            {
               <Modal title={modalContent}>
                   {
                        modalContent === 'change tags' 
                            ? <TagsEditor />
                            : <NoteEditor variant="create" />

                   }
                   
               </Modal>
            }
        </>
    )
}

export default SideBar