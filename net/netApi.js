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
    test_host: "http://192.168.8.43:5566",

    /**
     *  api 前缀
     */
    api_prefix: "/api",

};

/**
 *
 * @type {{host: string, uri: {phone_login: string, register_check_code: string, phone_register: string}}}
 */
var api = {
    /**
     * 接口地址
     */
    host: env.test_host,

    /**
     *  uri 地址
     */
    uri: {
        /**
         * 获取验证码接口
         */
        register_check_code: env.api_prefix + "/member/phone/register/check/code",

        /**
         * 手机号码注册接口
         */
        phone_register: env.api_prefix + "/member/phone/register",

        /**
         * 手机号码登录接口
         */
        phone_login: env.api_prefix + "/member/phone/login",

        /**
         * 获取壹帐号个人用户信息接口
         */
        get_members_infos: env.api_prefix + "/get/members/infos",
    },
};


module.exports = {
    api: api,

};