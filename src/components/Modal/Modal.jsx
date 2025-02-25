import "./Modal.css";

const  Modal = ({active, setActive, children}) => {
    return (
        <div className={active ? "modal__container active" : "modal__container"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export {Modal}