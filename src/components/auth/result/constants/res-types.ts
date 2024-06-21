interface ResultDataTypes {
    icon: React.ReactNode;
    title: string;
    text: string;
    textBtn: string;
    pathBtn: string;
    testData: string;
}

export interface ResTypes {
    error_login: ResultDataTypes;
    error_register: ResultDataTypes;
    success_register: ResultDataTypes;
    error_user_exist: ResultDataTypes;
    success_change_password: ResultDataTypes;
    error_email_no_exist: ResultDataTypes;
    error_change_password: ResultDataTypes;
    error_check_email: ResultDataTypes;
}
