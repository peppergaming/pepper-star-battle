import {createContext, useContext, useState} from "react";
import {
    GenericModal,
    ModalWrapper,
    ModalWrapperProps,
} from "@/components/Modal";
import {IObjectKeys} from "@/config/constants";

/** Components **/

export const MODAL_TYPES = {
    GENERIC_MODAL: "GENERIC_MODAL",
};

export const MODAL_COMPONENTS = {
    [MODAL_TYPES.GENERIC_MODAL]: GenericModal,
};

/** Context **/

export interface BaseModalProps {
    title?: string;
    content?: string;
    type?: string;
}

export interface ExtendedModalProps extends BaseModalProps, IObjectKeys {
}

export interface ModalContextInterface {
    isModalVisible: boolean;
    showModal: (
        modalType: string,
        modalProps: ExtendedModalProps,
        wrapperProps?: Partial<ModalWrapperProps>
    ) => void;
    hideModal: () => void;
    setBackground: (imageUrl: string | null) => void;
}

export const ModalContext = createContext<ModalContextInterface>({
    isModalVisible: false,
    showModal: () => {
    },
    hideModal: () => {
    },
    setBackground: () => {
    },
});

export const useModalContext = () => useContext(ModalContext);

/** Provider **/

interface ModalProviderProps {
    children?: any;
}

export const ModalProvider = ({children}: ModalProviderProps) => {
    const defaultProps: BaseModalProps = {title: "", content: ""};
    const defaultWrapperProps: Partial<ModalWrapperProps> = {
        ModalHeader: "default",
        ModalFooter: "default",
    };

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>(MODAL_TYPES.GENERIC_MODAL);
    const [modalProps, setModalProps] = useState<BaseModalProps | null>(
        defaultProps
    );
    const [wrapperProps, setWrapperProps] = useState<any>(defaultWrapperProps);
    const [currentBackgroundUrl, setCurrentBackgroundUrl] = useState<string | null>(null);

    const setBackground = (imageUrl: string | null) => {
        setCurrentBackgroundUrl(imageUrl);
    };
    const showModal = (
        modalType = MODAL_TYPES.GENERIC_MODAL,
        modalProps = defaultProps,
        wrapperProps = defaultWrapperProps
    ) => {
        // const { modalProps, optionalProps, wrapperProps } = props;
        setModalType(modalType);
        setModalProps({...defaultProps, ...modalProps});
        if (wrapperProps) {
            setWrapperProps(wrapperProps);
        }
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setModalType(MODAL_TYPES.GENERIC_MODAL);
        setModalProps(defaultProps);
        setWrapperProps(defaultWrapperProps);
    };

    const contextProvider = {
        isModalVisible,
        showModal,
        hideModal,
        setBackground,
    };

    const renderComponent = () => {
        const TargetModal: any = MODAL_COMPONENTS[modalType];
        if (!isModalVisible || !modalType || !TargetModal) {
            return null;
        }
        return (
            <ModalWrapper {...wrapperProps} backgroundImageURL={currentBackgroundUrl}>
                <TargetModal {...modalProps} />
            </ModalWrapper>
        );
    };

    return (
        <ModalContext.Provider value={contextProvider}>
            {renderComponent()}
            {children}
        </ModalContext.Provider>
    );
};
