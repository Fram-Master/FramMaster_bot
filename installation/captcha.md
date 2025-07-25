# 打码配置

[← 返回安装教程](README.md) | [← 返回主页](../README.md)

## 支持的验证码平台

FarmMaster 支持以下验证码解决方案：

### 在线打码平台
- 🔥 **YESCAPTCHA** - 支持验证码多，价格偏贵
- 💡 **NOCAPTCHA** - 技术更新快，基本满足所有打码需求，价格贵
- ⚡ **SOLVIUM** - 仅满足部分验证码平台，价格最便宜
- 🎯 **CAPSOLVER** - 基本上涵盖日常所需，价格较为合适

### 本地打码
- 🖥️ **本地打码** - 部署在本地，仅支持CF相关打码，需要一定技术能力，优势是无需付费

## 在线打码配置

### 1. 平台注册

#### YESCAPTCHA
- 🌐 **注册链接**: [通过我们的邀请链接注册](https://yescaptcha.com/i/vxsO6f)

#### NOCAPTCHA
- 🌐 **官方链接**: [通过我们的邀请链接注册](https://www.nocaptcha.io/register?c=lmjIt1)

#### SOLVIUM  
- 🌐 **官方链接**: [无邀请链接，需自行前往Tg注册](https://docs.solvium.io/getting-started)

#### CAPSOLVER
- 🌐 **官方链接**: [通过我们的邀请链接注册](https://dashboard.capsolver.com/passport/register?inviteCode=JuJdBhc4W6cC)


### 2. 获取 API KEY

注册完成后，按以下步骤获取 API KEY：

1. **登录账户**
   - 使用注册的账号登录平台

2. **找到 API KEY**
   - 进入用户中心或设置页面
   - 找到 "API Key"、"密钥" 等选项
   - 复制您的专属 API KEY

3. **充值余额**
   - 在使用前需要先充值账户余额
   - 各平台支持的充值方式不一，如有疑问请联系平台客服

### 3. 软件配置

#### 配置步骤
1. **打开软件设置**
   - 启动 FarmMaster 软件
   - 点击 `设置` 按钮

2. **进入验证码配置**
   - 在设置界面找到 `验证码平台设置`
   - 点击进入验证码配置页面

3. **选择平台并填写 KEY**
   - 选择您注册的平台（YESCAPTCHA/NOCAPTCHA/SOLVIUM/CAPSOLVER）
   - 在对应的平台配置区域填写您的 API KEY

4. **保存配置**
   - 确认配置无误后，点击 `保存` 按钮
   - 配置将立即生效


## 本地打码配置

### 本地打码优势
- ✅ **多方式部署**: 可在本机、局域网、云服务器平台部署
- ✅ **速度最快**: 目前测试为最快1-2秒则可以完成 Token 返回
- ✅ **零成本**: 无需付费，节省成本

### 配置步骤
1. **部署本地打码**
   - 🌐 **仓库链接**: [Github](https://github.com/0xsongsu/cf-clearance-scraper)
   - 按照仓库的教程安装本地打码服务
   - 将本地打码服务的 API 填入设置中，并且保存，格式为`http://localhost:3000/`或`http://宿主机IP:3000/`

### 注意事项
- 本地打码建议安装在局域网，单独找一个新的设备进行安装
- 本地打码需要一定的技术能力，客服仅能提供部分使用支持，技术小白请自行解决安装问题
