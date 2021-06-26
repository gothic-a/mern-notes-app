import { useEffect, useRef} from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleModal } from "../actions/modalActions"

const Modal = ({ children, title}) => {

    const modal = useRef(null)

    const dispatch = useDispatch()
    const { isOpen } = useSelector(state => state.modal)

    useEffect(() => {
        document.body.style.overflowY =  isOpen ? 'hidden' : 'auto'
        if(isOpen) modal.current.classList.add('modal_visible') 
    }, [isOpen])

    const closeClickHandler = (e) => {
        e.stopPropagation()
        if(isOpen && e.target.dataset.type === 'close-modal') {
            modal.current.classList.remove('modal_visible')
            dispatch(toggleModal('close'))
        }
    }
 
    return (
        <div 
            className={"modal"}
            ref={modal}
        >
            <div 
                className="modal__overlay"
                onClick={closeClickHandler}
                data-type="close-modal"
            >
                <div className="window">
                    <div className="window__header">
                        <h2 className="window__header-title">{title}</h2>
                        <i 
                            className="fal fa-times window__header-icon"
                            onClick={closeClickHandler}
                            data-type="close-modal"
                        ></i>
                    </div>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal