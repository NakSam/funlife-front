export const isEmail = (email) => {
    var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var result = emailRegex.test(email) ? '' : '이메일이 올바르지않습니다'

    return result;
}

export const isPassword = (password) => {
    var result = password.length > 5 ? '' : '비밀번호 6자리 이상';

    return result;
}

export const moneyLimit = (money) => {
    var result = parseInt(money) <= 1000000 ? '' : '100만원 이하만 입력가능합니다';

    return result; 
}

export const isEmptyList = (value) => {
    var result = '';
    
    Object.entries(value).map(([key, value]) => {
        if(result == ''){
            result = value ? '' : key + ' 값을 입력해주세요'
        }
       return;
    });
    console.log(result);

    return result; 
}

export const isEmpty = (value) => {
    var result = value ? '' : '값을 입력해주세요';

    return result; 
}