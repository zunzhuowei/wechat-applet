/**
 *  接口环境
 */
const env = {
    /**
     * 本地接口地址
     */
    local_host: "http://127.0.0.1:5566",

    /**
     * 测试接口地址
     */
    test_host: "http://127.0.0.1:5566",

};

/**
 *
 * @type {{host: string, uri: {phone_login: string, register_check_code: string, phone_register: string}}}
 */
var api = {
    /**
     * 接口地址
     */
    host: env.local_host,

    /**
     *  uri 地址
     */
    uri: {
        /**
         * 获取验证码接口
         */
        register_check_code: "/api/member/phone/register/check/code",

        /**
         * 手机号码注册接口
         */
        phone_register: "/api/member/phone/register",

        /**
         * 手机号码登录接口
         */
        phone_login: "/api/member/phone/login",
    },
};


module.exports = {
    api: api,

};