import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({
    children,
    container = document.body,
}: PropsWithChildren<{ container?: Element | DocumentFragment }>) =>
    createPortal(children, container);
