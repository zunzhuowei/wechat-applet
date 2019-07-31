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
 *  使用的接口地址
 * @type {string}
 */
var host = env.test_host;

/**
 *
 * @type {{host: string, uri: {phone_login: string, register_check_code: string, phone_register: string}}}
 */
var api = {
    /**
     * 获取验证码接口
     */
    register_check_code: host + env.api_prefix + "/member/phone/register/check/code",

    /**
     * 手机号码注册接口
     */
    phone_register: host + env.api_prefix + "/member/phone/register",

    /**
     * 手机号码登录接口
     */
    phone_login: host + env.api_prefix + "/member/phone/login",

    /**
     * 获取壹帐号个人用户信息接口
     */
    get_members_infos: host + env.api_prefix + "/get/members/infos",

    /**
     * 获取每个角色对应权限的 api 接口列表
     */
    get_role_permissions_apis: host + env.api_prefix + "/get/role/permissions/apis",

    /**
     * 授权角色
     */
    authorized_role: host + env.api_prefix + "/authorized/role",

    /**
     * 修改成员角色
     */
    modify_membership_roles: host + env.api_prefix + "/modify/membership/roles",

    /**
     * 删除成员角色
     */
    del_membership_roles: host + env.api_prefix + "/del/membership/roles",

    /**
     * 游戏商绑定游戏到壹账户中
     */
    binding_game_2_one_account: host + env.api_prefix + "/binding/game/2/one/account",

    /**
     * 编辑游戏商绑定的游戏信息
     */
    edit_game_4_one_account: host + env.api_prefix + "/edit/game/4/one/account",

    /**
     * 删除游戏商绑定的游戏
     */
    del_game_4_one_account: host + env.api_prefix + "/del/game/4/one/account",

    /**
     * 查询游戏商绑定的游戏
     */
    get_game_4_one_account: host + env.api_prefix + "/get/game/4/one/account",

    /**
     * 手机号登出壹账号
     */
    member_phone_logout: host + env.api_prefix + "/member/phone/logout",

    /**
     * 根据旧密码，重新设置手机登录密码
     */
    reset_phone_login_password_by_old: host + env.api_prefix + "/reset/phone/login/password/by/old",

    /**
     * 发送验证码到注册时绑定的邮箱，重新设置手机登录密码
     */
    send_reset_password_check_code: host + env.api_prefix + "/send/reset/password/check/code",

    /**
     * 根据注册时绑定的邮箱，重新设置手机登录密码
     */
    reset_phone_login_password_by_email: host + env.api_prefix + "/reset/phone/login/password/by/email",

    /**
     * 修改游戏商账号启用/禁用状态
     */
    modify_game_partner_account_status: host + env.api_prefix + "/modify/game/partner/account/status",

    /**
     * 游戏商启用/禁用某款游戏
     */
    enable_or_disable_game: host + env.api_prefix + "/enable/or/disable/game",

};


module.exports = {
    api: api,
    host: host,
};