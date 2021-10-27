export const isEmail = (email) => {
    var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var result = emailRegex.test(email) ? '' : '이메일 이상해'

    return result;
}

export const isPassword = (password) => {
    var result = password.length > 5 ? '' : '비밀번호는 6자리 이상';

    return result;
}

export const moneyLimit = (money) => {
    var result = parseInt(money) <= 1000000 ? '' : '100만원 이하만 입력가능함';

    return result; 
}

export const isEmpty = (value) => {
    var result = '';
    
    Object.entries(value).map(([key, value]) => {
        if(result == ''){
            result = value ? '' : key + ' 공백 ㄴㄴ'
        }
       return;
    });

    return result; 
}

export const isText = () => {

}