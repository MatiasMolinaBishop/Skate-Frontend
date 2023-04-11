import ReactDom from 'react-dom'
import '../components/CSS/Modal.css'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left:'50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000
}

const Modal = ({open, children, onClose}) => {

    if(!open){return  null}

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
                <div className = 'modal-content-flex'>
                    <button className='close-modal' onClick={onClose}>X</button>
                    <div className='modal-content'>
                    {children}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal