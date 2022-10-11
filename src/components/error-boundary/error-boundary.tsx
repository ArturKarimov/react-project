import React from "react";
import err from "./error-boundary.module.scss";

interface Props {
    children?: React.ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.log("Произошла ошибка", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <section className={err.wrapper}>
                    <p className="text text_type_main-large p-10">Что-то пошло не так :(</p>
                    <p className="text text_type_main-medium">
                        В приложении произошла ошибка. Пожалуйста, перезагрузите страницу или повторите попытку позже.
                    </p>
                </section>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;