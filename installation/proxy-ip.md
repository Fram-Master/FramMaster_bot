# 代理IP选购配置

[← 返回安装教程](README.md) | [← 返回主页](../README.md)


## 1. 代理作用

代理服务器可以隐藏您的真实IP地址，主要用于：

1. **突破IP限制** - 绕过水龙头等服务的IP限制
2. **隐藏身份** - 防止项目方追踪真实IP
3. **账号保护** - 为社交账号提供稳定网络环境

---

## 2. 代理格式

支持以下格式：

- **基本格式**：`IP:端口:用户名:密码`
- **指定协议**：`IP:端口:用户名:密码:协议类型`
- **域名格式**：`域名:端口:用户名:密码`

**参数说明**：
- **IP/域名**：代理服务器地址
- **端口**：服务端口号
- **用户名/密码**：认证信息
- **协议类型**：支持 `http`、`socks5`（默认http）

**示例：**

| 代理类型 | 格式示例 | 说明 |
|---------|---------|------|
| 基本HTTP | `123.45.67.89:8080:user:pass` | 默认HTTP协议 |
| 指定HTTP | `123.45.67.89:8080:user:pass:http` | 明确指定HTTP |
| SOCKS5 | `123.45.67.89:1080:user:pass:socks5` | 高匿名代理 |
| 域名格式 | `proxy.example.com:8080:user:pass` | 支持域名 |
| 域名+协议 | `proxy.example.com:8080:user:pass:http` | 域名指定协议 |

---

## 3. 代理选购指南

### 基本原则
- **选择正规服务商**：避免免费代理，选择有口碑的付费服务
- **先测试后购买**：首次购买少量测试，确认稳定后再扩容

### 代理类型选择

#### 静态IP代理
- **特点**：IP固定不变，稳定性高
- **适用场景**：
  - 社交账号管理（Twitter、Discord等）
  - 需要长期稳定IP的操作
- **优缺点**：稳定但成本较高

#### 动态IP代理
- **特点**：IP定期变化，灵活性强
- **适用场景**：
  - 水龙头领取测试币
  - 批量操作和数据抓取
- **优缺点**：反检测能力强但稳定性一般

### 安全注意事项
- 选择信誉良好的服务商
- 定期更换代理密码
- 避免在代理上处理敏感信息

### 下面是我们正在使用的代理：

- Webshare: [官方网站](https://www.webshare.io/?referral_code=lnui3v852b41) (静态IP，养Twitter、Discord 账号等操作时使用)

- Dataimpulse: [官方网站](https://dataimpulse.com/?aff=189126) (动态IP，领水时使用)

#### Webshare 购买教程 (静态IP)

![Webshare 首页](../docs/assets/images/tutorials/webshare-homepage.png)

*Webshare 官方网站首页*

1. **注册账号**：
   - 访问：[https://www.webshare.io](https://www.webshare.io/?referral_code=lnui3v852b41)
   - 注册账号（支持Google登录）
    
    ![Webshare 注册页面](../docs/assets/images/tutorials/webshare-register.png)

    *Webshare 注册页面*
2. **购买套餐**：
   - 点击左侧"Proxy Server"选择合适套餐
    
    ![Webshare 套餐选择](../docs/assets/images/tutorials/webshare-pricing.png)

    ![Webshare 套餐选择2](../docs/assets/images/tutorials/webshare-pricing2.png)

    *Webshare 代理套餐选择页面*
3.  **获取代理列表**：
    - 购买成功后，通常在“My Proxies”或“Proxy List”页面可以找到您的代理列表。
    - 导出或复制代理信息，格式通常为 `IP:端口:用户名:密码` 或 `IP:端口:用户名:密码:协议类型`。
    - 请确保选择支持 HTTP/SOCKS5 协议的代理。
    
    ![Webshare 代理列表](../docs/assets/images/tutorials/webshare-proxy-list.png)

    ![Webshare 代理列表2](../docs/assets/images/tutorials/webshare-proxy-list2.png)

    ![Webshare 代理列表3](../docs/assets/images/tutorials/webshare-proxy-list3.png)

    *Webshare 代理列表页面*

#### 海外代理 购买教程 (动态IP)

![海外代理首页](../docs/assets/images/tutorials/haiwaidaili-homepage.png)

*海外代理官方网站首页*

1.  **访问官网并注册**：
    - 打开海外代理官方网站：[https://www.haiwaidaili.net](https://www.haiwaidaili.net/register?Invitation_code=12333)
    - 注册并登录您的账号。
    
    ![海外代理注册](../docs/assets/images/tutorials/haiwaidaili-register.png)

    *海外代理注册页面*
2.  **选择动态IP套餐并购买**：
    - 点击左侧的定价，选择价格合适的套餐，点击立即购买按提示付款。（初次建议购买测试套餐，后续再根据用量进行购买）
    
    ![海外代理套餐选择](../docs/assets/images/tutorials/haiwaidaili-pricing.png)

    *海外代理套餐选择页面*
3.  **配置和获取代理**：
    - 初次使用请先在个人中心 - 子帐户管理 页面创建一个子帐户：[子帐户管理-链接](https://www.haiwaidaili.net/auth_user.html)
    
        ![子帐户管理](../docs/assets/images/tutorials/haiwaidaili-auth_user.png)
        ![子帐户管理2](../docs/assets/images/tutorials/haiwaidaili-auth_user2.png)
        *子帐户管理页面*

    - 随后到 API提取 - 帐户认证获取 - 帐户认证获取页面。
    - 选择 对应的子账号 然后按下图 配置选择好 接入点、IP类型、代理协议、国家地区、SESSION、生成格式， 输入自己需要的代理数量。
    - 设置完毕后，先点击生成案例，再点击下载代理。
    - **❕❕❕注意：生成格式必须设置为 hostname:port:username:password**

    ![海外代理获取配置](../docs/assets/images/tutorials/haiwaidaili-config.png)

    *海外代理配置获取页面*

---

## 4. 如何导入代理

1. 打开“代理管理”页面，点击“导入代理”按钮。
2. 在弹出的输入框中，每行输入一个代理，格式如上所述。
3. 支持批量粘贴，每行一个代理。
4. 点击“确定”完成导入，系统会自动校验格式并提示成功或失败。

    ![代理管理配置](../docs/assets/images/screenshots/proxy_setting.png)

    ![代理管理配置2](../docs/assets/images/screenshots/proxy_setting2.png)

    *代理管理页面*

5. **测试代理连接**：
   在代理管理页面，选择代理后点击"测试连接"按钮。正常情况下会显示代理的IP地址和响应时间。如果测试失败，请按照常见问题的Q2的方法逐步排查。

    ![代理测试功能](../docs/assets/images/screenshots/proxy-test.png)

    *代理连接测试功能*

**注意事项**：
- 确保代理格式正确
- 支持批量操作和编辑

---

## 5. 常见问题

**Q1：导入时报“代理格式不正确”怎么办？**  
A：请检查代理格式是否为 `IP:端口:用户名:密码` 或 `IP:端口:用户名:密码:协议类型`，IP和端口必须为数字，协议类型仅支持 http/socks/socks5。

**Q2：代理连接失败怎么办？**
A：按以下步骤排查：
1. **检查格式**：确认格式为 `IP:端口:用户名:密码`
2. **国内代理**：关闭VPN后重新测试
3. **境外代理**：开启VPN后重新测试
4. **仍然失败**：更换其他代理

**Q3：如何批量删除代理？**  
A：在代理列表中勾选需要删除的代理，点击“删除选中”即可。

**Q4：支持哪些协议？**  
A：目前支持 `http`、`socks5` 两种协议，建议根据实际需求选择。

**Q5：代理信息会保存在哪里？**  
A：代理信息会保存在本地（`localStorage`），重启软件后依然可用。

**Q6：MAC 使用小火箭（Shadowrocket）无法连接代理是怎么回事？**  
A：关闭小火箭的代理连接后再进行尝试，如果仍然失败请按照Q2进行排查。

**Q7：如何测试代理是否正常工作？**  
A：在代理管理页面，选择代理后点击"测试连接"按钮。正常情况下会显示代理的IP地址和响应时间。如果测试失败，请按照Q2的方法逐步排查。

![代理测试功能](../docs/assets/images/screenshots/proxy-test.png)
*代理连接测试功能*

**Q8：运行脚本报错429？**
A：IP被封禁，建议更换代理重试

---

如有其他问题，请联系技术支持。